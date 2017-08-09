# Demo Back End - Modern

This directory contains the code for the simple inventory demo back end for the modern use case, including mock data.  The steps below assume you have already deployed an EE and have the IP address, namespace, and auth token for it.

## Manual Function Deployment
This section describes how to manually deploy the demo function to the newly created EE.

Start by [following the setup instructions for the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/) then:
```bash
npm install
```
will load additional dependencies this project requires.  Next, install the Serverless OpenWhisk Plugin:
```bash
npm install serverless-openwhisk
```

Finally, in your home directory, create a `.wskprops` file that looks something like this:
```bash
APIHOST=<IP address of your EE>
NAMESPACE=<namespace noted from your deployed EE>
AUTH=<auth key noted from your deployed EE>
```

Now run:

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Compiling Functions...
Serverless: Compiling API Gateway definitions...
Serverless: Compiling Rules...
Serverless: Compiling Triggers & Feeds...
Serverless: Deploying Functions...
Serverless: Deployment successful!

Service Information
platform:	35.164.54.112
namespace:	guest
service:	modern

actions:
modern-dev-inventory

triggers:
**no triggers deployed**

rules:
**no rules deployed**

endpoints (api-gw):
**failed to fetch routes**
endpoints (web actions):
**no web actions deployed**
```

## Manual Function Execution - Serverless CLI
You can retrieve an item by taking one of the IDs in the `MOCK_DATA.json` file and using it to build a serverless cli command, for example:
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

## Manual Function Execution - CURL
You can retrieve an item by taking one of the IDs in the `MOCK_DATA.json` file and using it to build a curl command (where <auth token>, <IP address>, and <namespace> are the values you put in the `.wskprops` file):
```bash
curl -u <auth token> https://<ip address>/api/v1/namespaces/<namespace>/actions/modern-dev-inventory?blocking=true -X POST -H "Content-Type: application/json" -d '{"id":"760799506-4"}' -k
```
which should yield:
```bash
{
  "duration": 9,
  "name": "modern-dev-inventory",
  "subject": "guest",
  "activationId": "75a259ff374b434092bbd4984aafaea7",
  "publish": false,
  "annotations": [{
    "key": "limits",
    "value": {
      "timeout": 60000,
      "memory": 256,
      "logs": 10
    }
  }, {
    "key": "path",
    "value": "guest/modern-dev-inventory"
  }],
  "version": "0.0.1",
  "response": {
    "result": {
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
    },
    "success": true,
    "status": "success"
  },
  "end": 1499828392723,
  "logs": [],
  "start": 1499828392714,
  "namespace": "guest"
}
```

## Automated Function Deployment
TBD, dependent on the CFR functioning

## Automated Function Execution
TBD, dependent on the CFR functioning

## Unit Test
This folder contains an `inventory.test.js` that will unit test the `mockdata.js` as part of the larger build and jest tests.

## Integration Test
**NEEDS WORK** This folder also contains a `test/inventoryPost.js` that can perform endpoint testing against the deployed function through mocha.  Before you can run tests, you need to set the `OW_IP_ADDRESS`, `OW_NAMESPACE`, and `OW_AUTH_TOKEN` environment variables to the value of the IP address, namespace, and auth token of the OpenWhisk EE in question.  Using values from the example above:

```bash
export OW_IP_ADDRESS=34.212.77.96
export OW_NAMESPACE=guest
export OW_AUTH_TOKEN=23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
```

Now to run the tests:

```bash
npm test
```

The results should be similar to:
```bash
> modern-demo@1.0.0 test /Users/petercjo/branches/demo/serverless/demo/backend/modern
> mocha



  conducts a random request against an endpoint
    ✓ execute request (454ms)


  1 passing (462ms)
```
Note that the tests are written in such a way that the format of the `MOCK_DATA.json` file can change, but as long as it has an <id> field it'll validate that all fields from the response are also in the local version of the file.
