# Example - Deploy an OpenWhisk Execution Endpoint

In production, an Execution Endpoint might be a router, switch, or some other fancy Linux box with another main purpose that has idle CPUs.  For this example, a virtual machine deployed either on AWS or VirtualBox will act as a stand-in.

First, [follow the instructions for installing Vagrant](https://www.vagrantup.com/docs/installation/).

Next, for your convenience, two different Vagrantfile variations have been modified from the OpenWhisk trunk and provided as part of this example:

* [AWS](./aws/Readme.md) (Preferred)
* [VirtualBox](./virtualbox/Readme.md) (Be sure the resulting VM is routable from the public Internet)

