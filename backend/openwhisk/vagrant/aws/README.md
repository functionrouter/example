# Example - OpenWhisk VirtualBox Installation

The Vagrantfile` here will deploy an Execution Endpoint running OpenWhisk on AWS.

## Deploy Your EE
The `Vagrantfile` deploys OpenWhisk into a single AWS VM and is dependent on the [AWS Vagrant plug in](https://github.com/mitchellh/vagrant-aws). As such, before you try to use this file, you need to do the following to install Vagrant and the plugin:


```bash
npm i vagrant
vagrant plugin install vagrant-aws
```

And then tell Vagrant about the dummy AWS box:
```bash
vagrant box add dummy https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box
```

Further, the `Vagrantfile` requires the following environment variables be set to drive its behavior:

* ACCESS_KEY_ID - The AWS access key for the account you'd like to deploy OpenWhisk to
* SECRET_ACCESS_KEY - The AWS secret key for the account you'd like to deploy OpenWhisk to
* KEYPAIR_NAME - The name of the keypair from the AWS console used to SSH into the resulting VM
* PRIVATE_KEY_PATH - Full path to the .pem file for the keypair.  ie: "~/.ssh/fred.pem"
* AWS_REGION - Name of AWS region to deploy to.  ie: "us-west-2"
* AWS_AMI - Name of the AMI used to create the VM.  ie: "ami-d94f5aa0"
* AWS_INSTANCE_TYPE - Name of AWS instance type used to create the VM.  ie: "t2.small" >= t2.small please
* AWS_SECURITY_GROUP_ID - ID (not name) of the security group applied to the VM.  ie: "sg-XXXXXXXX"
* AWS_SUBNET_ID - ID of the subnet within the VPC the VM should be created in.  ie: "subnet-XXXXXXX"

Be sure to set up the Security Group in such a way that [all the ports for OpenWhisk are open](https://github.com/apache/incubator-openwhisk-devtools/blob/master/docker-compose/README.md) should
you want to ping the individual services.  **The instance type name MUST be t2.small or greater and t2.medium is preferred!** Otherwise, the Kafka and Controller components become memory starved.  This will be improved at a later date.

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
