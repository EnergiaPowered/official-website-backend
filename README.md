# Energia Powered Official Website

The source code of `Energia Powered` student activity's website. The website built to provide some of organization's services and represent information about it with simplicity in mind. Also it provides an opportunity for students to collaborate and contribute to enhance their programming and train to contribute to open source community.

![EP Logo](logo.png)

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Structure](#structure)
1. [Contribution](#contribution)
1. [License](#license)

## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone this repo `$ git clone https://github.com/EnergiaPowered/official-website.git` or using `ssh`.

2. `$ cd Official-website`.

3. Run `$ npm install` to install dependencies and packages in the root then install packages in `front/` by running `$ npm run front-install`.

## Usage

1. Create a `.env` file at the root of the project 
    1. Copy the content of `.env-example` in to the `.env` file you did created.
    1. Register for a DB URI in mongo atlas of any other service and add the `URI string` as the value of `DB_URI` variable.

1. Run `$ npm run dev-start` to start serving the app (front & back), then go to `https://localhost:3000` to view the front and start using the back it is started already.

## Structure

The folder structure of the application. The app is modular, every module encapsulates its own components and services. Each module contains `components` folder which has the presentational components and also pages, also the module contains the `services` folder if it's dynamic which has all the services that integrate with the `API`.

```
.
├── CONTRIBUTING.md
├── front
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── assets
│   │   │   ├── About-header.png
│   │   │   ├── Contact-header.png
│   │   │   ├── Events-header.png
│   │   │   ├── Home-header.png
│   │   │   ├── logo.png
│   │   │   ├── placeholder.png
│   │   │   ├── single comm-bg.png
│   │   │   ├── single-comm-header.png
│   │   │   ├── Structure.png
│   │   │   └── supervisor.jpg
│   │   ├── globals
│   │   │   ├── icons_library.js
│   │   │   └── routes.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── About
│   │   │   │   ├── components
│   │   │   │   │   ├── Header
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── style.css
│   │   │   │   │   │   └── tests
│   │   │   │   │   │       ├── Header.test.js
│   │   │   │   │   │       └── __snapshots__
│   │   │   │   │   │           └── Header.test.js.snap
│   │   │   │   │   ├── Mission
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── tests
│   │   │   │   │   │       ├── Mission.test.js
│   │   │   │   │   │       └── __snapshots__
│   │   │   │   │   │           └── Mission.test.js.snap
│   │   │   │   │   ├── page
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── style.css
│   │   │   │   │   ├── Structure
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── tests
│   │   │   │   │   │       ├── __snapshots__
│   │   │   │   │   │       │   └── Structure.test.js.snap
│   │   │   │   │   │       └── Structure.test.js
│   │   │   │   │   └── Vision
│   │   │   │   │       ├── index.js
│   │   │   │   │       └── tests
│   │   │   │   │           ├── __snapshots__
│   │   │   │   │           │   └── Vision.test.js.snap
│   │   │   │   │           └── Vision.test.js
│   │   │   │   └── tests
│   │   │   │       ├── About.test.js
│   │   │   │       └── __snapshots__
│   │   │   │           └── About.test.js.snap
│   │   │   ├── Committees
│   │   │   │   ├── components
│   │   │   │   │   ├── section
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── SingleCommitteePage
│   │   │   │   │       ├── index.js
│   │   │   │   │       ├── style.css
│   │   │   │   │       └── tests
│   │   │   │   │           └── Sin-committee.test.js
│   │   │   │   └── tests
│   │   │   ├── Contact
│   │   │   │   ├── components
│   │   │   │   │   ├── ContactForm
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── style.css
│   │   │   │   │   ├── Header
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── Info
│   │   │   │   │       ├── index.js
│   │   │   │   │       └── style.css
│   │   │   │   ├── index.js
│   │   │   │   ├── services
│   │   │   │   │   ├── contact.service.js
│   │   │   │   │   └── regexp.service.js
│   │   │   │   └── style.css
│   │   │   ├── Home
│   │   │   │   ├── components
│   │   │   │   │   ├── Events
│   │   │   │   │   │   ├── event.js
│   │   │   │   │   │   ├── events.css
│   │   │   │   │   │   └── index.jsx
│   │   │   │   │   ├── Header
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── style.css
│   │   │   │   │   │   └── tests
│   │   │   │   │   │       ├── Header.test.js
│   │   │   │   │   │       └── __snapshots__
│   │   │   │   │   │           └── Header.test.js.snap
│   │   │   │   │   ├── Partners
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── style.css
│   │   │   │   │   │   └── tests
│   │   │   │   │   │       ├── Partners.test.js
│   │   │   │   │   │       └── __snapshots__
│   │   │   │   │   │           └── Partners.test.js.snap
│   │   │   │   │   └── Supervisor
│   │   │   │   │       ├── index.js
│   │   │   │   │       ├── style.css
│   │   │   │   │       └── tests
│   │   │   │   │           ├── __snapshots__
│   │   │   │   │           │   └── Supervisor.test.js.snap
│   │   │   │   │           └── Supervisor.test.js
│   │   │   │   ├── index.js
│   │   │   │   ├── style.css
│   │   │   │   └── tests
│   │   │   │       ├── Home.test.js
│   │   │   │       └── __snapshots__
│   │   │   │           └── Home.test.js.snap
│   │   │   └── NotFound
│   │   │       ├── index.js
│   │   │       └── style.css
│   │   ├── pages
│   │   │   └── EventsPage
│   │   │       ├── components
│   │   │       │   ├── Events
│   │   │       │   │   ├── CardBody.js
│   │   │       │   │   ├── CardButton.js
│   │   │       │   │   ├── CardImage.js
│   │   │       │   │   ├── Event.js
│   │   │       │   │   ├── Events.jsx
│   │   │       │   │   ├── index.css
│   │   │       │   │   └── singleEvent
│   │   │       │   │       ├── components
│   │   │       │   │       │   ├── Form.jsx
│   │   │       │   │       │   └── Input.jsx
│   │   │       │   │       ├── Formx.jsx
│   │   │       │   │       ├── singleEvents.jsx
│   │   │       │   │       └── style.css
│   │   │       │   └── Header
│   │   │       │       ├── Header.jsx
│   │   │       │       └── index.css
│   │   │       ├── index.css
│   │   │       ├── index.js
│   │   │       └── services
│   │   │           ├── fakeEvents.js
│   │   │           └── fakeSingelEvent.js
│   │   ├── serviceWorker.js
│   │   ├── shared
│   │   │   ├── Footer
│   │   │   │   ├── index.js
│   │   │   │   ├── style.css
│   │   │   │   └── tests
│   │   │   │       └── Footer.test.js
│   │   │   ├── Layout
│   │   │   │   ├── index.js
│   │   │   │   ├── style.css
│   │   │   │   └── tests
│   │   │   │       └── Footer.test.js
│   │   │   └── Navbar
│   │   │       ├── index.js
│   │   │       ├── style.css
│   │   │       └── tests
│   │   │           └── Navbar.test.js
│   │   └── static_data
│   │       └── committees.json
│   └── Style-Guide.md
├── index.js
├── LICENSE
├── models
│   ├── Info.js
│   └── Message.js
├── mongo.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── contactInfo.js
│   └── message.js
└── TODOS.txt
```

## Contribution

Follow the guides mentioned in the [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
