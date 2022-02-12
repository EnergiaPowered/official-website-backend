import React from 'react';
import Home from '../index';

import { create } from "react-test-renderer";

// because it's static component and doesn't change often
it('matches snapshot', () => {
  const component = create(<Home />);

  expect(component.toJSON()).toMatchSnapshot()
});
