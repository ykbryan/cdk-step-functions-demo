import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';

export class CdkStepsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const functionOne = new lambda.Function(this, 'LambdaFunctionOne', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionOne'),
    });
    const taskEventOne = new sfn.Task(this, 'stepFunctionOne', {
      task: new tasks.InvokeFunction(functionOne),
    });
    const functionTwo = new lambda.Function(this, 'LambdaFunctionTwo', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('./lambdas/functionTwo'),
    });
    const taskEventTwo = new sfn.Task(this, 'stepFunctionTwo', {
      task: new tasks.InvokeFunction(functionTwo),
    });
    const parallel = new sfn.Parallel(this, 'taskParallelTasks', {});

    const definition = parallel.branch(taskEventOne).branch(taskEventTwo);

    new sfn.StateMachine(this, 'StateMachine', {
      definition: definition,
      timeout: cdk.Duration.minutes(3),
    });

    // const functionTwo = new lambda.Function(this, 'StepFunctionTwo', {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: 'index.handler',
    //   code: new lambda.AssetCode('./lambdas/functionTwo'),
    // });
    // const functionThree = new lambda.Function(this, 'StepFunctionThree', {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: 'index.handler',
    //   code: new lambda.AssetCode('./lambdas/functionTwo'),
    // });
  }
}
