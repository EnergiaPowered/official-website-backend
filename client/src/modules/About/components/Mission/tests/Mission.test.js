import React from "react";

import Mission from "../index";

import { create } from "react-test-renderer";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

// matches snapshot
it("matches snapshot", () => {
  const component = create(<Mission />);

  expect(component.toJSON()).toMatchSnapshot();
});
