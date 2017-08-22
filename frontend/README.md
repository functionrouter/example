# Example - Configure and use the front end

The example front end consists of the following:

* index.html - Very simple Bootstrap 3 page you can load into a browser from disk
* util/ - Contains a utility that can take the MOCK_DATA.json the back end uses and generate a MOCK_IDS.js file to be used by the front end
* MOCK_IDs.js - Contains a simple JSON array of IDs that matches data in the back end
* locaiton.js - The geolocation logic
* traditional.js - The left side UI logic
* functionrouter.js - The right side UI logic

In this final section, the front end will be configured and used.

## Initial Front End Load
Load the index.html file in your favorite browser and you should see something like this:

![Initial Load](/img/initload.jpg)

Allow location access, which will be referred to later.

## Configuring and testing the Traditional Endpoint
On the left side of the UI, click on the gear next to the "Traditional" button to reveal the configuration for this section of the example.

![Traditional Configuration](/img/traditional.jpg)

In the resulting text box, enter the endpoint noted when deploying the Traditional back end, something like `https://d37wf50so7.execute-api.ap-south-1.amazonaws.com/demo/inventory/`

Click on the gear again to collapse the configuration and press the "Traditional" button.  The result should be something similar to:

![Traditional Test](/img/traditionaltest.jpg)

The first time the "Traditional" button is clicked, the response time will be substantially slower than subsequent presses.  This is because of overhead like establishing the network route to the Traditional back end and the warming of the Lambda function behind API Gateway.  Press the "Scan" button to generate another random product ID and then press the "Traditional" button to find new product data.

## Configuring the Function Router
On the right side of the UI, click on the gear next to the "Function Router" button to reveal the configuration for this section of the example.

![Traditional Configuration](/img/functionrouter.jpg)

There, enter the Service ID noted when registering the service and the generated token when registering the client.  Note that the longitude and latitude are already populated based on allowing the Javascript location access and the 'Function' text box refers to the function inside the service.  Both the 'EE URL' and 'EE Token' should be left blank as they will be filled in by performing the lookup in the next step.

## Performing the Lookup
With the fields entered in the previous step, push the "Function Router" button to initiate a lookup, which should cause the 'EE URL' and 'EE Token' fiends to be populated:

![Lookup](/img/lookup.jpg)

Note that the lookup will likely take several seconds the first time it occurs since the function is being installed on the Execution Endpoint for the first time.  Further, no data should be present yet in the output fields of the right side of the UI.

## Working Around Certificates
Currently OpenWhisk ships with a self-signed certificate and requires HTTPS, which by default the code in functionrouter.js will not work correctly because every browser in the world will by default require signed certificates.

To work around this, the URL for the function on the EE in question should be entered in the browser you will use to conduct the demo.  Something like (your IP address will vary):

https://<IP address>/api/v1/namespaces/guest/actions/modern-dev-inventory?blocking=true

In the example shown above, this URL is `https://13.58.18.245/api/v1/namespaces/guest/actions/modern-dev-inventory?blocking=true`

Your browser will detect the self-signed certificate and give you the familiar warning.  If you accept the risks and add the exception, the underlying code will now work correctly.

## Racing Traditional vs Function Router
Click the gear next to the "Function Router" button to collapse the configuration.  Now the two methods of obtaining data can be raced against each other.

Press the "Scan" button to generate a new product ID.  Then press the "Traditional" button followed by the "Function Router" button.  The results should be similar to:

![Final](/img/final.jpg)