# Official Social Spaces Website

## Installing Dependencies

In order to test/build the socwebsite, there are a number of dependencies
that you'll need to install. These dependencies are listed in the package.json
file. To install these dependencies, after cloning the respository, you should
execute the `setup.sh` script in the root directory of the repo. You can do
this like so...

`./setup.sh`

Once this script finishes running, you should now see a new `node_modules`
directory appear in the root of the repo. This houses the installed
dependencies. You're now good-to-go for testing/building the socwebsite!

## Building Website

In order to build the website for deployment, you'll first want to make
sure that you've run the `setup.sh` script (you should see a `node_modules`
directory in the root of the repo). After this is done, to build the
website, you can simply run the `build.sh` script. You can do this like
so...

`./build.sh`

Once this script finishes running, you should now see a new `build`
directory appear in the root of the repo. This directory houses our 
built website!

## Launching Website

In order to launch the website, you'll first want to make sure that you've
built the website. You can do this using the `build.sh` script. After having
built the website, we can finally deploy it! Our website is hosted on a 
website hosting provider called cPanel. To launch the website and have it
be visible on the internet, we can simply use the `launch.sh` script. You
can do this like so...

`./launch.sh`

This script may take several minutes to run. Once this script finishes running, 
you should now be able to see the website by visiting https://social.cs.illinois.edu 
or https://social.cs.uiuc.edu from your browser.

