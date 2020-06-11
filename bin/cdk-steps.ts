#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStepsStack } from '../lib/cdk-steps-stack';

const app = new cdk.App();
new CdkStepsStack(app, 'CdkStepsStack');
