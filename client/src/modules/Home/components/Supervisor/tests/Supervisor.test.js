import React from 'react';
import Supervisor from '../index';

import { create } from "react-test-renderer";

// because it's static component and doesn't change often
it('matches snapshot', () => {
  const component = create(<Supervisor />);

  expect(component.toJSON()).toMatchSnapshot()
});
