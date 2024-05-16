#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HelloWorldLambdaStack } from '../lib/api-cdk-stack';

const app = new cdk.App();

const environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT ?? '756557892660',
  region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
};

console.log(`Environment: ${environment.account} - ${environment.region}`);

new HelloWorldLambdaStack(app, 'HelloWorldLambdaStack', {
  env: environment,
  stackName: 'HelloWorldLambdaStack',
});