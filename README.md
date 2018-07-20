# raccoon

<div align = "center">
    <br>
    <img src="./others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./docs/readme/README_PT.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/raccoon.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/raccoon)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/raccoon.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/raccoon)
[![Codacy Badge](https://img.shields.io/codacy/grade/bd29e1bc8b5c4bf6a5a595f3f59dbaaa.svg?style=flat-square)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/raccoon&amp;utm_campaign=Badge_Grade)
[![Dependencies](https://david-dm.org/Fazendaaa/raccoon.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/raccoon/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaaa/raccoon/badge.svg)](https://snyk.io/test/github/Fazendaaa/raccoon)

</div>

## About
Job application to two categories are described as follows:
* [Dev](#dev)
* [Tags](#tags)

All of this work was made in a Linux environment only, using it in Mac or Windows might need some different steps; read carefully the steps about installing and configuring the applications.

# Dev
A Command Line Interface (CLI) application to show info about some projects. This info is processed through data consumed from an Representational State Transfer Application Programming Interface (REST API) that only accepts __GET__ method and it's response is a JSON, unicode, format; this response is an array of logs. This application needs to perform sorting and analysis of those logs, presenting the following:
* Last five tracebacks of all projects;
* Mean and the standard deviation from the requests;
* Error and critical counter, grouped by hour and project.

The API presents the following rules:
* 30 requisitions for minute;
* 1200 logs each requisition or the difference between then.

The application must update the data each minute, assuming the already consumed data. As discussed with the recruiter, I've decided the running time from the app as the starting point for the requests.

## Data
_Host_ and _authorization_ are being inserted in the request header through a __.env__ file, that must be located at the root project folder in the following format:

```bash
HOSTNAME="endpoint-here"
AUTHORIZATION="api-key-here"
```

Since the idea behind this project isn't to have access to this information but how they are utilized though out this application.

The requests are being handle through the following https request:

```https
hostname: "endpoint-here"
authorization: "api-key-here"
```

The API response will be like that:

```typescript
{
    timestamp: number;
    level: INFO | DEBUG | ERROR | CRITICAL (string);
    project: string;
    message: string;
    response_code: number;
    traceback: string (optional);
    request_duration: number (optional); 
}
```

As the API are being consumed through a Node application -- and the all JavaScript (JS) numbers are _floats_ -- I've modified the response style presented here because, to the process, won't matter whether or not the numbers are __float__ or __int__.

## CLI

<div align="center">
    <img src="./others/gif/cli/cli.gif"/>
</div>

# Tags
A series of JS questions. I've implemented some of them in TypeScript (TS) so they could be my proof of concept located at [tags](./src/tags/) folder. And all of the answered questions, which were asked in to this project, can be found at [tags.md](./tags.md) file.

The answers are what the job description asked. Even so I've decided to implement it in Node to allow me testing it as automatically possible; that way I won't be attached to always needing to open my browser to see whether or not it works.

Since the idea is to provide the answers to the questions only, I won't be attaching the website used as dependency, and is configured in the __.env__ file as:

```bash
URL="website-url-here"
```

# Installing
The projects are written in [Node](https://nodejs.org/) and the help of [npm](https://www.npmjs.com/) to work. Once they are installed, just open the project directory and run the following command to install the dependencies:

```bash
npm install
```

If you ran into some errors related to package dependencies and want to know how to handle it, read the [Security](#Security) info.

# How to use it

To run the projects, before all of that, compile the files. Since they are written in TypeScript (TS) and Node runs JS to do so, run the following command:

```bash
npm run build
```

## Dev
To run the Dev project, just:

```bash
npm run dev
```

## Tags
To run the Tags project, just:

```bash
npm run tags
```

### Uglifyied version
To have a uglifyied version just run it:

```bash
npm run uglify
```

# Built with
* [blessed](https://github.com/chjj/blessed)
* [blessed-contrib](https://github.com/yaronn/blessed-contrib)
* [Dotenv](https://github.com/motdotla/dotenv)
* [jsdom](https://github.com/jsdom/jsdom)
* [json2csv](https://github.com/zemirco/json2csv)
* [uglify-js-es6](https://github.com/paulovieira/UglifyJS2)

## Code
Plain and simple [TS](http://typescriptlang.org/) with the [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib) linter standards as base. As there's use of TS in both projects, the  _.tsconfig.json_ file was configured to accept only [ECMA Script 6](http://es6-features.org) format.

I've added also a code review through [Codacy](http://codacy.com/).

Some functions have side-effects, they are tagged with **__** at the end and those whom are callbacks have it at the beginning.

## Testing
Tests are written with [Jest](https://facebook.github.io/jest/) through [ts-jest](https://www.npmjs.com/package/ts-jest) and integrated with [Travis CI](http://travis-ci.org/) and [Codecov](https://codecov.io/).

When running the tests, there's no need of previously building it; the TS files only are needed.

To run all of the tests you will need to set the following environment variables at the __.env__ file:

```bash
MOCK_API="some-mock-api-endpoint"
MOCK_API_ERROR="some-invalid-mock-api-endpoint"
MOCK_KEY="some-mock-api-key-authorization"
```

To help out API mocking, the [mockapi](https://www.mockapi.io/) is used. And [alcula](http://www.alcula.com/calculators/statistics/standard-deviation/) help me out calculating the mocking data for __standard deviation__ and __mean__.

To run all tests just:

```bash
npm test
```

If you ran into some errors related to package dependencies and want to know how to handle it, read the [Security](#Security) info.

# Security
I've added a integration with [Synk](https://snyk.io/) to ensure that all of my dependencies have no bugs or errors reported without fixing it first before Continuos integration (CI) to ensure the Continuos Development (CD).

## Errors/Bugs in Dependencies
When Synk report some errors or bugs that can be fixed, just follow the CLI command to fix them before running -- more info at their [docs](https://github.com/snyk/snyk#cli).

# Contributing
Just talk to me through an _issue_.

# Versioning
There's no versioning system being used here due to the ephemeral nature of this project. 

# Updates
After the interview they gave me some feedback. So, all of the commits after july 18th are updates to it.

The Dev and Tags interviews were not at the same day, so they are only updated after the interview itself.

## Dev
* Reduce the RAM memory consumption;
* Improve calculations.

I've decided to save all the consumed API data each hour; so, that way, the memory consumption would not be that great.

> note: their example was if the application was running for five years ahahahahah

To reduce calculations I've decided to create a new variable storing the last calculated value. This were the way that in first versions of the application was done -- don't actually remember "when" and "why" I changed the approach.

## Tags
Interview still have to be done.

# Authors
* Just [me](https://github.com/Fazendaaa).

# License
Like many Open-Source Software (OSS) the MIT license is used, more about it in  [LICENSE](https://github.com/Fazendaaa/raccoon/blob/master/LICENSE).
