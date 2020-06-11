import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';

export class CdkStepsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // functionOne
    const functionOne = new lambda.Function(this, 'LambdaFunctionOne', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionOne'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventOne = new sfn.Task(this, 'stepFunctionOne', {
      task: new tasks.InvokeFunction(functionOne),
    });

    // functionTwo
    const functionTwo = new lambda.Function(this, 'LambdaFunctionTwo', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionTwo'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventTwo = new sfn.Task(this, 'stepFunctionTwo', {
      task: new tasks.InvokeFunction(functionTwo),
    });

    // functionThree
    const functionThree = new lambda.Function(this, 'LambdaFunctionThree', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionThree'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventThree = new sfn.Task(this, 'stepFunctionThree', {
      task: new tasks.InvokeFunction(functionThree),
    });

    // functionFour
    const functionFour = new lambda.Function(this, 'LambdaFunctionFour', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionFour'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventFour = new sfn.Task(this, 'stepFunctionFour', {
      task: new tasks.InvokeFunction(functionFour),
    });

    // functionFive
    const functionFive = new lambda.Function(this, 'LambdaFunctionFive', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionFive'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventFive = new sfn.Task(this, 'stepFunctionFive', {
      task: new tasks.InvokeFunction(functionFive),
    });

    // functionSix
    const functionSix = new lambda.Function(this, 'LambdaFunctionSix', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionSix'),
      tracing: lambda.Tracing.ACTIVE,
    });
    const taskEventSix = new sfn.Task(this, 'stepFunctionSix', {
      task: new tasks.InvokeFunction(functionSix),
    });

    // States
    const fail = new sfn.Fail(this, 'Fail', {
      cause: 'Unable to ...',
    });

    const choice = new sfn.Choice(this, 'Did this run successfully?')
      .when(
        sfn.Condition.numberEquals('$.statusCode', 200),
        taskEventFour.next(taskEventFive)
      )
      .otherwise(fail)
      .afterwards();

    // step function definition
    const parallel = new sfn.Parallel(this, 'taskParallelTasks', {})
      .branch(taskEventOne)
      .branch(taskEventTwo)
      .addRetry({ maxAttempts: 1 });

    const definition = taskEventThree
      .addRetry({ maxAttempts: 3 })
      .next(choice)
      .next(parallel)
      .next(taskEventSix);

    new sfn.StateMachine(this, 'StateMachine', {
      definition: definition,
      timeout: cdk.Duration.minutes(3),
    });
  }
}
