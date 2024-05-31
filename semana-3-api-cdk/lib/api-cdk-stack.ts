import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class HelloWorldLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define una función Lambda
    const helloWorldLambda = new Function(this, 'HelloWorldLambda', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset('lambda'),
    });

    const databaseLambda = new Function(this, 'LambdaDatabase', {
      functionName: 'LambdaDatabase',
      runtime: Runtime.NODEJS_16_X,
      handler: 'data.handler',
      code: Code.fromAsset('lambda'),
    });

    const reponseLambda = new Function(this, 'LambdaResponse', {
      functionName: 'LambdaResponse',
      runtime: Runtime.NODEJS_16_X,
      handler: 'response.handler',
      code: Code.fromAsset('lambda'),
    })

    const bankingLambda = new Function(this, 'LambdaBanking', {
      functionName: 'LambdaBanking',
      runtime: Runtime.NODEJS_16_X,
      handler: 'banking.handler',
      code: Code.fromAsset('lambda'),
    })

    databaseLambda.grantInvoke(reponseLambda);

    // Crea una API Gateway
    const api = new LambdaRestApi(this, 'HelloWorldEndpoint', {
      handler: helloWorldLambda,
      proxy: false,
    });

    // Crea un recurso
    const resource = api.root.addResource('hello-world');
    const resourceLambdaResponse = api.root.addResource('trx');
    const resourceLambdaBanking = api.root.addResource('bank');
    const resourceLambdaBankingTrx = resourceLambdaBanking.addResource('transactions');

    // Crea un método y le asigna la función Lambda
    resource.addMethod('GET', new LambdaIntegration(helloWorldLambda));

    resourceLambdaResponse.addMethod('GET', new LambdaIntegration(reponseLambda));

    resourceLambdaBankingTrx.addMethod('GET', new LambdaIntegration(bankingLambda));

  }
}
