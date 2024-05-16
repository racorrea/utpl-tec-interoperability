#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HelloWorldLambdaStack } from '../lib/api-cdk-stack';

const app = new cdk.App();

const environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

console.log(`Environment: ${environment.account} - ${environment.region}`);

new HelloWorldLambdaStack(app, 'HelloWorldLambdaStack', {
  env: environment,
  stackName: 'HelloWorldLambdaStack',
});