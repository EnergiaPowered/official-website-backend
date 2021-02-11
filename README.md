# Energia Powered Official Website

The source code of `Energia Powered` student activity website's backend. The website built to provide some of organization's services and represent information about it with simplicity in mind. Also it provides an opportunity for students to collaborate and contribute to enhance their programming and train to contribute to open source community.

![EP Logo](logo.png)

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Structure](#structure)
1. [Contribution](#contribution)
1. [License](#license)

## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone this repo `$ git clone https://github.com/EnergiaPowered/official-website-backend.git` or using `ssh`.

2. `$ cd official-website-backend`.

3. Run `$ npm install` to install dependencies and packages in the root.

## Usage

1. Create a `.env` file at the root of the project

   1. Copy the content of `.env-example` in to the `.env` file you did created.
   1. Register for a DB URI in mongo atlas of any other service and add the `URI string` as the value of `DB_URI` variable.
   1. Set the values of `PRIVATE_KEY` and `CIPHER_PASSWORD` to any random strings you want.
   1. Set the vaues of `EMAIL` and `PASSWORD` to your email and password.

1. Run `$ npm run dev-start` to start serving the app (back), then go to `https://localhost:4000` and start using GET requests on the following endpoints:

   1. /blogs
   1. /committees
   1. /contactInfo
   1. /crew
   1. /events
   1. /message

## Structure

The folder structure of the application.

```
.
├───.env-example
├───.gitignore
├───CONTRIBUTING.md
├───index.js
├───LICENSE
├───logo.png
├───mongo.js
├───package-lock.json
├───package.json
├───README.md
├───TODOS.txt
│
├───bin
│   ├───EmailTemplate.html
│   ├───mailer.js
│   └───unverified.js
│
├───config
│   ├───custom-environment-variables.json
│   └───default-example.json
│
├───middleware
│   ├───admin.js
│   └───auth.js
│
├───models
│   ├───Blog.js
│   ├───Committee.js
│   ├───Event.js
│   ├───Info.js
│   ├───Member.js
│   ├───Message.js
│   └───User.js
│
└───routes
    ├───blogs.js
    ├───committees.js
    ├───contactInfo.js
    ├───crew.js
    ├───events.js
    ├───login.js
    ├───message.js
    ├───users.js
    └───verify.js
```

## Contribution

Follow the guides mentioned in the [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
