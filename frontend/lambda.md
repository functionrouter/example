# Example - Configure and use the front end with the Lambda function

In this step, you will edit the configuration of the example front end application so that it can make calls to both the Traditional back end and the Function Router back end.  When complete, you will be able to "race" them and see the latency differences between the two approaches.

## Configuring Your Front End - Traditional

If you load the front end index.html into a browser, it should look something like this:

**insert pic**

Allow the application to access your location, as this will be an important input to the Function Router lookup later.  If you click on the gear next to the Traditional button, the screen will expand and give you a text box in which to put your the URL you noted when you deployed the traditional back end:

**insert pic 2**

## Configuring Your Front End - Function Router
If you click on the gear next to the Function Router button, the screen will expand and give you a set of text boxes in which you can put configurations from your Function Router Console as follows:

**insert pic**

* CFR - The URL for the Function Router API, defaulted for you.
* App ID - The app ID noted from when you registered your client application.
* App Key - The key noted from when you registered your client application.
* Service ID - The service ID noted from when you registered your function.
* Function ID - The function ID noted from when you registered your function.
* Longitude - The value of the longitude the client application determined when you loaded the page.
* Latitude - The value of the latitude the client application determined when you loaded the page.
* EE URL - This is where the application will put the Execution Endpoint URL returned from the lookup.  For testing purposes, you can alter this as needed.
* EE AuthToken - his is where the application will put the Execution Endpoint Authentication Token returned from the lookup for the OpenWhisk use case.  For testing purposes, you can alter this as needed.

Enter the correct values from the App ID, App Key, Service ID, and Function ID fields and leave the EE URL and EE AuthToken fields blank.

## Using Your Front End
If you click on the Scan button it will randomly select an ID from the `MOCK_IDs.json` file in the `frontend` folder to approximate a product scan.  If you then press the Traditional button, the application will use the traditional URL to make a call to the service you deployed earlier.  The first time you press it, there will be an extra performance penalty as the network route to the traditional back end is found and the container running the backing Lambda function warms up.  Subsequent presses should be faster. Performance will vary greatly depending upon where you are in the world and your Internet connection speed.

**insert pic**

If you click on the Function Router button, the first time the lookup call will be made back to the EveryEdge Function Router, which will then determine the best location for the function to execute, install the function in that location, and return the Execution Endpoint URL.  The front end application will then take that information and make the first call to the Execution Endpoint.  There is significant overhead in this first call given all those steps that take place behind the scenes, to the point where it will likely be much slower than the first call to the traditional back end.

However, subsequent calls will be faster than the traditional back end once the location advantage is realized.  Press the Scan button followed by presses of the Traditional and Function Router buttons so that you can "race" the different approaches.  Beyond that first press, the Function Router method should be an order of magnitude faster than the Traditional method.