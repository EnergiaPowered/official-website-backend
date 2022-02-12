import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../components/page/index';

import { create } from "react-test-renderer";

// because it's static component and doesn't change often
it('matches snapshot', () => {
  const component = create(
    <Router>
      <About />
    </Router>
  );

  expect(component.toJSON()).toMatchSnapshot()
});
