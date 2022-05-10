# Energia Powered Official Website

The source code of the frontend of `Energia Powered` student activity's website. The website built to provide some of organization's services and represent information about it with simplicity in mind. Also it provides an opportunity for students to collaborate and contribute to enhance their programming and train to contribute to open source community.

![EP Logo](logo.png)

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Structure](#structure)
1. [Tools](#tools)
1. [Contribution](#contribution)
1. [License](#license)

## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone this repo `$ git clone https://github.com/EnergiaPowered/official-website.git` or using `ssh`.

2. `$ cd official-website`.

3. Run `$ npm install` to install dependencies and packages in the root.

## Usage

1. Add your `API_BASE_URL` for the backend REST-API in `/src/globals/config.js`.

1. Run `$ npm start` to start serving the app, then go to `http://localhost:3000` to view the UI and start using the backend.

## Structure

The folder structure of the application. The app is modular, every module encapsulates its own components and services. Each module contains `components` folder which has the presentational components and also pages, also the module contains the `services` folder if it's dynamic which has all the services that integrate with the `API`.

- assets - here are all the images or any assets we may need
- components - here are all presentational components that has no business logic
  - ExampleComponent (e.g: Footer)
    - index.js
    - style.css
    - tests
- containers - here are all components that has business logic
  - ExampleComponent
    - index.js
    - style.css
    - tests
- pages - here are all the components that represents the react routes
  - HomePage
    - index.js
    - index.css
    - components
      - Header
        - index.js
        - style.css
        - tests
    - tests

**Notes:**

- Routing is already setup - Go to `/src/globals/routes.js` file and add your routes
- Add the Homepage Sections at `/src/pages/HomePage/index.js`

## Tools

1. [Fontawesome](https://scotch.io/tutorials/using-font-awesome-5-with-react) - [Footer Component Demo](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/Footer)

2. [React-multi-carousel](https://www.npmjs.com/package/react-multi-carousel) - [Partners Component Demo](https://github.com/EnergiaPowered/official-website/blob/master/front/src/components/HomePage/Partners/Partners.js)

3. [Bootstrap 4.3](https://getbootstrap.com/)

4. [react-testing-library](https://github.com/testing-library/react-testing-library)

5. [Jest](https://jestjs.io/docs/en/getting-started)

6. [React-helmet](https://github.com/nfl/react-helmet) - [HomePage component demo](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/index.js)

7. [React-image-enlarger](https://github.com/bmcmahen/react-image-enlarger) - [Structure component demo](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/AboutPage/components/Structure/index.js)

8. [React-page-progress](https://github.com/nomangul/react-page-progress/) - [Demo](https://github.com/EnergiaPowered/official-website/blob/master/front/src/App.js)

9. [JSDoc](https://jsdoc.app/)

## Contribution

Follow the guides mentioned in the [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
