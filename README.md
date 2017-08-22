# Example - Overview

Welcome to the Function Router example application!

In this step-by-step tutorial, you'll create and configure a very simple application that demonstrates the basic capabilities of the Function Router and the latency improvements its use can bring.  The example approximates a retail inventory scanner that enables a user to "scan" different product IDs and then compare the performance of a traditional, hard-coded API back end to that of a Function Router lookup for an Execution Endpoint that is physically closer to the client application.

Before you begin, make sure you understand the [Function Router Concepts](docs/concepts.md)

The initial steps are as follows:

* [Deploy the "traditional" back end](backend/traditional/README.md)
* [Deploy an OpenWhisk Execution Endpoint](backend/openwhisk/vagrant/README.md)
* [Register your OpenWhisk Execution Endpoint and Location](docs/openwhisk.md)
* [Register the OpenWhisk function](docs/functionreg.md)
* [Register the Client](docs/client.md)
* [Configure and use the front end with the OpenWisk function](frontend/README.md)

When completed, your output will look something like this:

![Example Screen](/docs/example.jpg)
