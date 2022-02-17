import React from "react";

import Vision from "../index";

import { create } from "react-test-renderer";
import { cleanup, render } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

// matches snapshot
it("matches snapshot", () => {
  const component = create(<Vision />);

  expect(component.toJSON()).toMatchSnapshot();
});

// renders with correct props
it("renders with the correct props", () => {
    const { getByTestId } = render(<Vision vision="Energia Powered" />)
    expect(getByTestId("vision-text")).toHaveTextContent("Energia Powered")
})
