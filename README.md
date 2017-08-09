# Example - Overview

Welcome to the Function Router example application!

In this step-by-step tutorial, you'll create and configure a very simple application that demonstrates the basic capabilities of the Function Router and the latency improvements its use can bring.  The example approximates a retail inventory scanner that enables a user to "scan" different product IDs and then compare the performance of a traditional, hard-coded API back end to that of a Function Router lookup for an Execution Endpoint that is physically closer to the client application.

Before you begin, make sure you understand the [Function Router Concepts](concepts.md)

The initial steps are as follows:

* [Deploy the "traditional" back end](backend/traditional/README.md)
* [Register your Lambda credentials](lambda.md)
* [Register a Lambda location](lambdalocation.md)
* [Register the Lambda function](backend/lambda/README.md)
* [Register your client application](client.md)
* [Configure and use the front end with the Lambda function](frontend/lambda.md)

Completing the steps above will demonstrate use of the Function Router with AWS Lambda, but IBM OpenWhisk is also supported by adding the following:

* [Deploy an OpenWhisk Execution Endpoint](backend/openwhisk/vagrant/README.md)
* [Register your OpenWhisk Execution Endpoint and Location](openwhisk.md)
* [Register the OpenWhisk function](backend/openwhisk/README.md)
* [Configure and use the front end with the OpenWisk function](frontend/OpenWhisk.md)

In either case, when completed, your output will look something like this:

![Example Screen](/example.jpg)
