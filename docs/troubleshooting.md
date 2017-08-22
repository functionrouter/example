# Example - Troubleshooting

The best way to troubleshoot issues with this example is to put your browser into developer mode and look at the networking tab.  That will capture interactions between the front end UI and the back end APIs.

By far the most common issue is when pressing the "Function Router" button after performing the lookup, nothing happens and there is a certificate error of some kind in that networking tab.  This occurs when the workaround for dealing with the OpenWhisk self-signed certificate is skipped.

Another common error is when the Execution Endpoint API call returns a `502 - Bad Gateway` error.  This occurs when an Execution Endpoint goes down and doesn't come up again properly.  The best course of action for this issue is to simply `vagrant destroy` the Exeuction Endpoint, to re-create, and re-register it so that the system is working with a clean evironment.