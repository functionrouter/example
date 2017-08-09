# Example - Deploy the "traditional" back end

In this step, you'll deploy the example back end for the "traditional" use case, which consists of a simple Lambda function and API Gateway front end that reads a local mock data file.  That last part is not a realistic comparison and a future version will use a database, but for now more realistic latency will be approximated by deploying the back end in a distant AWS data center.

## Setup
First, [follow the setup instructions for the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/), then:
```bash
npm install
```
will load additional dependencies this project requires.

## Deploying

Simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Creating Stack...
Serverless: Checking Stack create progress........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (1.68 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress.......................................
Serverless: Stack update finished...
Service Information
service: legacy
stage: demo
region: ap-southeast-2
api keys:
  None
endpoints:
  GET - https://e7b06eoaa3.execute-api.ap-southeast-2.amazonaws.com/demo/inventory/{id}
functions:
  get: legacy-demo-get
```

**TAKE NOTE OF THE ENDPOINT URL AS YOU WILL BE USING IT LATER WHEN CONFIGURING THE FRONT END APPLICATION.**

This will deploy the traditional back end to the AWS Mumbai data center by default, which might not be the best choice for you to demonstrate poor latency if you are not physically located in the western hemisphere or western Europe. You can override this default as follows:

```bash
serverless deploy -r <region specifier such as 'us-west-2'>
```

## Verifying the Deployment with the Serverless CLI
Alternatively, you can retrieve an item by taking one of the IDs in the `MOCK_DATA.json` file and using it to build a curl command:

```bash
serverless invoke -f inventory -d '{"id": "760799506-4"}'
```
	
Example Result (prettified):
```json
{
	"msrp": "$92.97",
	"tagline": "Stand-alone multi-state firmware",
	"company": "Stamm-Sawayn",
	"id": "760799506-4",
	"origin_address": "4 Acker Crossing",
	"contact_firstname": "Aline",
	"box_size": "S",
	"origin_state": "Pennsylvania",
	"stock_qty": 84,
	"origin_city": "Pittsburgh",
	"contact_lastname": "Oblein",
	"contact_email": "aobleink@wikia.com",
	"prod_name": "Cinnamon - Stick"
}
```

## Verifying the Deployment with CURL
Alternatively, you can retrieve an item by taking one of the IDs in the `MOCK_DATA.json` file and using it to build a curl command:

curl https://XXXXXXX.execute-api.ap-southeast-2.amazonaws.com/demo/inventory/<id>
Example Result (prettified):
```json
{
	"msrp": "$92.97",
	"tagline": "Stand-alone multi-state firmware",
	"company": "Stamm-Sawayn",
	"id": "760799506-4",
	"origin_address": "4 Acker Crossing",
	"contact_firstname": "Aline",
	"box_size": "S",
	"origin_state": "Pennsylvania",
	"stock_qty": 84,
	"origin_city": "Pittsburgh",
	"contact_lastname": "Oblein",
	"contact_email": "aobleink@wikia.com",
	"prod_name": "Cinnamon - Stick"
}
```

