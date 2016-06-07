# Egnyte homework

Demo of this app is running at http://egnyte-homework.s3-website-us-west-2.amazonaws.com/.

## Prerequisites

In essence you only need node/npm combo to run this stuff. Examples also use nvm.

Clone the repository:

    $ git clone https://github.com/karolmajta/egnyte-homework.git

Go into repo's root dir:

    $ cd egnyte-homerork

Activate proper node version (skip this if you're not using nvm, you have to have
node and npm on your **PATH** anyways):

    $ nvm use

Install dependencies:

    $ npm install

## Building for production

Just do:

    $ npm run build-all

If everything goes smooth you will see a **dist** directory that contains built
version of application, that is ready to deploy behing any static file server.
You can verify it:

    $ cd dist
    $ python -m SimpleHTTPServer

Now go to **http://localhost:8000** and you should see the app running.

## Building in development

Just do:

    $ npm run develop

This will run a development http server with livereload, as well as start watches
on source files, so that when you save them, the project will rebuild automatically.
Give it a few seconds to boot and build and then go to **http://localhost:8000**
and have fun changing stuff.
