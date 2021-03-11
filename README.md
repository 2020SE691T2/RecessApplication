# Recess Application
## Code Quality Metrics
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=bugs)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=code_smells)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=ncloc)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=security_rating)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=sqale_index)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=2020SE691T2_RecessApplication&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=2020SE691T2_RecessApplication)

## Overview
This project was started and completed to its current state as part of degree requirements for the MS Software Engineering degree from Drexel University. This project was completed in the SE691 course which covers two terms and lasts approximately six months.

The goal of the project was to create a remote learning tool with class management with a focus on early education and younger children. The application is intentionally minimalistic in features and uses a colorful design in order to appeal to that target audience without overcomplicating the root of what needs to get done: get children to their virtual classroom.

This README describes the site and web app that our users would interact with. To see the API that connects our website to our data, please see this repo: https://github.com/2020SE691T2/RecessAPI

# Table of Contents
- [Overview](#overview)
- [3rd Party Technologies Used](#3rd-party-technologies-used)
- [RecessAPI Dependency](#recessapi-dependency)
- [Installation and Running the Application](#installation-and-running-the-application)
- [Next Steps and Outstanding Work Items](#next-steps-and-outstanding-work-items)
- [Original Contributors](#original-contributors)

## 3rd Party Technologies Used
- Node
- React
- NPM
- React-Bootstrap
- Ladda
- Toastr

## RecessAPI Dependency
Running this application in any meaningful way would require a connection to the RecessAPI project, running locally or from a remote host. To see how to install that project please see the documentation found at it’s repo found here: https://github.com/2020SE691T2/RecessAPI. 

Further, if you aim to run this API from a remote host you will need to modify the environment settings found in the `$/RecessApplication/src/Components/Environment.jsx` file. Specifically you will need to change “'recess-prototype.herokuapp.com'” to whatever your remote host name is.
## Installation and Running the Application
### Requirements
This project requires Node & the Node Package Manager (NPM) which can be found here: https://nodejs.org/. 

You can verify that node and npm are installed on your machine with the following commands run from your terminal:
```
// Check Node version
node -v

// Check NPM version
npm -v
```

### Installation & Starting
Fork or download this repo to your local machine.

```
// Navigate into the root of the project repo
cd RecessApplication

// Install project dependencies and subprojects
npm install

// Start the application
npm start
```

## Next Steps and Outstanding Work Items
Items yet to be completed for the project can be found on this repo’s issue board here: https://github.com/2020SE691T2/RecessApplication/issues. 

Other general recommendations on how to take this project to the next level might include:
- Gradebook
- Messaging
- In-application video chat support instead of relying on Zoom
- Assignment Management

## Original Contributors
- https://github.com/gateship1 
- https://github.com/jonathanmcdaniel
- https://github.com/DylanZeller
- https://github.com/msknobloch2
- https://github.com/coxwm11
- https://github.com/jdurelli
