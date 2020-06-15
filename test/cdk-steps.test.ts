import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkSteps from '../lib/cdk-steps-stack';
import { handler } from '../lambdas/functionOne/index';

test('Check for resources only', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkSteps.CdkStepsStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource('AWS::EC2::VPC'));
  expectCDK(stack).to(haveResource('AWS::ECS::Cluster'));
  expectCDK(stack).to(haveResource('AWS::Lambda::Function'));
  expectCDK(stack).to(
    haveResource('AWS::ElasticLoadBalancingV2::LoadBalancer')
  );
});

test('Check lambda', async () => {
  const result = await handler({}, {});
  const body = {
    message: 'hello world',
  };
  expect(result).toEqual({
    statusCode: 200,
    headers: {},
    body: JSON.stringify(body),
  });
});
