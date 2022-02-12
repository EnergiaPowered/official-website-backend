import React from "react";
import ReactDOM from "react-dom";

import Structure from "../index";

import { create } from "react-test-renderer";
import { act } from "react-dom/test-utils";

import { cleanup, render, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

// matches snapshot
it("matches snapshot", () => {
  const component = create(<Structure />);

  expect(component.toJSON()).toMatchSnapshot();
});

// image zoom on click
it("state changes on click", () => {
  const { getByTestId } = render(<Structure />);

  expect(
    getByTestId("structure-image").dataset.teststate === "true"
  ).toBeFalsy();

  fireEvent.click(getByTestId("structure-image"));

  expect(
    getByTestId("structure-image").dataset.teststate === "true"
  ).toBeTruthy();
});
