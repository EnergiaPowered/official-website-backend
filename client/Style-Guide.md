# Project Style Guide

- To set the background image of the header properly:

  - First, we should look on the example structure

    ```
    HomePage (The container component)
    - HomePage
        - index.js
        - index.css
        - components
        - Header
            - index.js
            - style.css
            - tests
        - tests

    ```

  - Then,

    1. Make the container component and give it `page-component` class like that in [`/src/pages/HomePage/index.js`](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/index.js) and give it the appropriate background image like that in [`front/src/pages/HomePage/index.css`](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/index.css)

    2. Make the header component and give it `header-section` class like that in [`/src/pages/HomePage/components/Header/index.js`](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/components/Header/index.js)

    3. Make the sub header component and give it the class `bg-section` like that in [`/src/pages/HomePage/components/Supervisor/index.js`](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/components/Supervisor/index.js)
    4. Make the other components and give it `bg-section` and control the spaces as u like

- To set the font size of each component properly:

  1. Every main section should have the structure:

     - The title of the section should be `h2` tag with the classes `section-title text-center`
     - The rest of the content

  2. Give the root tag in the component the class `component-font` like that in [`/src/pages/HomePage/components/Supervisor/index.js`](https://github.com/EnergiaPowered/official-website/blob/master/front/src/pages/HomePage/components/Supervisor/index.js)
