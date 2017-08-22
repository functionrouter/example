# Demo Front End - Overview

The demo front end consists of the following:

* index.html - Very simple Bootstrap 3 page you can load into a browser from disk
* util/ - Contains a utility that can take the MOCK_DATA.json the back end uses and generate a MOCK_IDS.js file to be used by the front end
* MOCK_IDs.js - Contains a simple JSON array of IDs that matches data in the back end
* locaiton.js - The geolocation logic
* traditional.js - The left side UI logic
* functionrouter.js - The right side UI logic

## What It Should Look like

![Completed Pipeline](/docs/example.jpg)

## How it Works
Press the "Scan" button to load up a randomly selected ID out of the MOCK_IDs.js file and into the UI.  This is done for you automatically upon page startup so there is always an ID to work with.

Press the Traditional button to trigger a traditional API call directly to an endpoint.  By default, the endpoint is set to a deployment in Mumbai but if you press the gear icon next to the Traditional button you can enter any endpoint you'd like.

The first time you press the Traditional button there is some network routing overhead and Lambda container warming penalties to be paid.  Subsequent presses will be faster and all presses will also be dependent on your final mile network speed.

Press the Function Router button to trigger a call to the Cloud Function Router that will pass all the required information to return an OpenWhisk EE URL and auth token.  Using the EE URL and auth token, the EE in question is called.

The first time you press the Function Router Button there is some network routing overhead, lookup call overhead, and function installation overhead to the point where it will likely be slower than the first press of the Traditional button.  Once those penalties are paid, though, subsequent presses will be much faster and faster than the Traditional button.

If you click the gear next to the Function Router button, you can override the default Cloud Function Router parameters and even override the lookup return values for subsequent calls to the function.  This can be useful if you have an EE running on your LAN but have difficulty setting up port forwarding to the local EE.  You can preload the function on the EE manually and still use the demo UI to interrogate it, showing how big a deal the latency can be.

## Working Around Certificates
Currently OpenWhisk ships with a self-signed certificate and requires HTTPS, which by default the code in functionrouter.js will not work correctly because every browser in the world will by default require signed certificates.

To work around this, the URL for the function on the EE in question should be entered in the browser you will use to conduct the demo.  Something like (your IP address will vary):

https://<IP address>/api/v1/namespaces/guest/actions/modern-dev-inventory?blocking=true

Your browser will detect the self-signed certificate and give you the familiar warning.  If you accept the risks and add the exception, the underlying code will now work correctly.