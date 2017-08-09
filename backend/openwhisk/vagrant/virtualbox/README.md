# Example - OpenWhisk VirtualBox Installation

The Vagrantfile` here will deploy an Execution Endpoint running OpenWhisk on VirtualBox.

## Deploy Your EE
The `Vagrantfile` deploys OpenWhisk into a single VirtualBox VM.  

To launch the EE, simply use:
```bash
vagrant up
```
Sample output is provided in the `vagrant-out.txt` file in this folder.  The deployment should take 10-12 minutes and be sure to **note the namespace and auth key set at the end**, as those will be needed later.

To verify your installation, SSH into the newly created EE:
```bash
vagrant ssh
```

and use the OpenWhisk CLI installed there to show that the EE has no functions on it ("actions" in OpenWhisk terms):
```bash
$ wsk action list
actions
```
