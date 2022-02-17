import React from "react";
import Navbar from "./../index";

import { BrowserRouter as Router } from "react-router-dom";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

// test if the navbar have the "Scrolled" class on scroll
it("navbar don't have 'bg-dark' when not scrolled", () => {
  let { getByTestId } = render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(getByTestId("navbar")).not.toHaveClass(
    "bg-dark navbar fixed-top navbar-expand-sm"
  );

  // attach the scroll event to the document to test the effect
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.add("bg-dark");
  });

  // fire the scroll event
  fireEvent.scroll(window);

  expect(getByTestId("navbar")).toHaveClass(
    "bg-dark navbar fixed-top navbar-expand-sm"
  );
});

// ensure that links with parameters not to be shown in the navbar
it("links with parameters not to be shown in the navbar", () => {
  let { getAllByTestId } = render(
    <Router>
      <Navbar />
    </Router>
  );

  getAllByTestId("navlinks").forEach(link => {
    expect(link).toHaveTextContent(/(Home|About|Blogs|Events|Crew|Contact us|Sign Up|Log In)/i);
  });
});

// the side menu opens on click the toggler button
it("toggle side menu", () => {
  const { getByTestId } = render(
    <Router>
      <Navbar />
    </Router>
  );

  // the menu is closed by default
  expect(getByTestId("side-menu").style.right).toBe("-90%");

  // the menu is opened on click the toggler
  fireEvent.click(getByTestId("toggler"));

  expect(getByTestId("side-menu").style.right).toBe("0px");

  // the menu is closed after clicking the closer button
  fireEvent.click(getByTestId("closer"));

  expect(getByTestId("side-menu").style.right).toBe("-90%");

  // the side menu doesn't close by clicking the menu
  fireEvent.click(getByTestId("side-menu"));

  expect(getByTestId("side-menu").style.right).toBe("0px");

  // the side menu is closed by clicking a menu list
  fireEvent.click(getByTestId("menu-list"));

  expect(getByTestId("side-menu").style.right).toBe("-90%");

  // the menu list closed by clicking the window
  fireEvent.click(window);

  expect(getByTestId("side-menu").style.right).toBe("-90%");
});
