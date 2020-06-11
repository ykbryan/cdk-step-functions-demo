import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkStepsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const functionOne = new lambda.Function(this, 'StepFunctionOne', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler', // links to a file inside the code artifact below
      code: new lambda.AssetCode('./lambdas/functionOne'),
    });
  }
}
