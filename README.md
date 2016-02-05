# Ratangular

This project is the [AngularJS](http://angularjs.org/) web app version of RaTA-DNS Dashboard (https://github.com/niclabs/ratadns-dashboard.git) built over angular-seed project (https://github.com/angular/angular-seed.git).



## Getting Started

To get you started you can simply clone the  repository and install the dependencies:

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize it. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone repo

Clone the  repository:

```
git clone https://github.com/gisellef/ratangular.git
cd ratangular
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Directory Layout

```
app/                        --> all of the source files for the application
  app.css                   --> default stylesheet
  views/                    --> all the views for every directive in the app
    event-type-filter.html  --> template for filter event-type-filter
    geo-map.html            --> template for directive geo-map
    serv-data-barcharts.html--> template for directive serv-data-barcharts
    sse-barcharts-html      --> template for directive sse-barcharts
  app.js                --> main app module, controllers, directives and filters definitions
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```


