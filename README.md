# Invest 42

### Final team project

## Project Description

Invest-42 is an all in one system providing invetsment companies a single coherent hub for
high-profile client management.

The application allows trade managers to operate on client investment
profiles based on instuctions, follow the stock market prices and read news on the companies they trade with.
#
## Getting started

Following these instrcutions you will be able to run this project on your local machine.

### Prerequisities

The technologies below must be installed in order to run this application:

Front End:

1. Typescript
2. Angular 7
3. Angular-CLI
4. Material Angular
5. Material Angular CDK

Back End:

1. MySQL/MariaDB client'
2. NodeJS
3. NPM
4. NestJS

### Installation

To run the project:

Backend: 

1. Go to 'Invest42/server'
2. Run 'npm install'
3. Run 'npm run start'

Front End:

1. Go to 'Invest42/client'
2. Run 'npm install'
3. Run 'nom run start'

DB Dummy data:

1. Go to 'Invest42/server'
2. Run 'npm run setup-admins'
3. Run 'npm run setup-compaines'
4. Run './update-prices.sh'
#
### Development Requirements

Your Web application should use the following technologies, frameworks and development techniques:

o Use Angular 7 and preferably Visual Studio Code

* Create beautiful and responsive UI

* Implement responsive UI using Bootstrap 3 or 4, or Materialize or don’t use a framework at all

* You may change the standard theme and modify it to apply own web design and visual styles

o Use modules to split your application logic

 Core, Shared and Feature modules

o Create several different pipes and use them

o Create several different directives and use them

o Create several modules and use them in the routing

o Use guards to prevent the user to access the routes

o All of the data should be loaded from a web server using services

* You can either use Firebase, Kinvey or any other back-end service.

* Or you can use your own server written in Node.js (NestJS) or any other technology

o Unit test a few components

o Your project should pass the default TS linting configuration without any errors

o You can use Angular CLI

* Or Webpack, SystemJS and any other module loader/bundler

o Your application should compile, work and produce an adequate result

o Use GitHub and take advantage of the branches for writing your features.

o Documentation of the project and project architecture (as .md file, including screenshots)

o Use lazy loading for the routing

o Decide on the strategy used

#
### Optional Requirements

o Write integration tests

o Use reactive forms

o Originality of the implementation (uniqueness)

o Host your application in the web (any public hosting provider of your choice)


### Optional Requirements (company specific)

o Run your application as Glue Desktop application.

o Create a hidden service application which generates and publishes the prices for each instrument. The hidden service should utilize private stream channels to push only relevant data to its subscribers.

o Your application should receive the prices for the instruments by subscribing to the hidden service’s glue stream.
#
## Authors

| #        | First name | Last name  |       
| -------- | --------- 	| ---------- |
| 1.	   | Georgi  	| Levov      |
| 2.	   | Hristo  	| Mirchev 	 |


[https://my.telerikacademy.com/Users/GeorgeLevov](https://my.telerikacademy.com/Users/GeorgeLevov)

[https://my.telerikacademy.com/Users/iceekk](https://my.telerikacademy.com/Users/iceekk)


### Link to project Repository:

[https://gitlab.com/Iceekk/invest-42](https://gitlab.com/Iceekk/invest-42)
#
## License
 
This project is licensed under the MIT License - see the LICENSE.md file for details