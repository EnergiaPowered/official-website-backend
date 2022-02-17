import React from "react";
import Header from "../index";

import { create } from "react-test-renderer";

// because it's static component and doesn't change often
it("matches snapshot", () => {
  const component = create(<Header />);

  expect(component.toJSON()).toMatchSnapshot();
});
