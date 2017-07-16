# CraftWorks-Frontend application
Web application for handicraft products based on AngularJS. Backend can be found [here](https://github.com/pulakchakraborty/Internal-CraftWorks-Backend)

## Prerequisites

Both for the front end and the back end check:

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)


## Getting Started

To get you started you can simply clone the [Internal-CraftWorks-Frontend](https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend) repository and install all its dependencies:

### Prerequisites

You need git to clone the [Internal-CraftWorks-Frontend](https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend)  repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test [Internal-CraftWorks-Frontend](https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend) . You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone CraftWorks Project

Clone the [Internal-CraftWorks-Frontend](https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend)  repository using [git](http://git-scm.com/):

```
git clone https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend
cd Internal-CraftWorks-Frontend
```

If you just want to start a new project without the [Internal-CraftWorks-Frontend](https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend)  commit history then you can do:

```bash
git clone --depth=1 https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

In case you would like to try the application without a server you can use the branch <severless>

```bash
git clone -b serverless --depth=1 https://github.com/pulakchakraborty/Internal-CraftWorks-Frontend <your-project-name>
```

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Bundle for the Application

This project use [webpack](https://github.com/webpack/webpack) version 1 for creating a bundle of the application and its dependencies

We have pre-configured `npm` to automatically run `webpack` so we can simply do:

```
npm run build
```

Behind the scenes this will call `webpack --config webpack.config.js `.  After, you should find that you have one new folder in your project.

* `dist` - contains all the files of your application and their dependencies.

### Run the Application

Note: Before running make sure that both the frontend and backend repositories are under a common root folder and named as it is. Otherwise the image uploads will not work. So the directory structure would be the following

```
/CraftWorks Webapp
    /Internal-CraftWorks-Frontend
    /Internal-CraftWorks-Backend
```

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

We have configured the project to run a development server which would continuously look for changes in the code.  The simplest way to start
this server is:

```
npm run dev
```

Now browse to the app at `http://localhost:8000/index.html`.
