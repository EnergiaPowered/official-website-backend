import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import { renderer, create } from "react-test-renderer";
import BlogList from "./../BlogList";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BlogList />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot 1", () => {
    const bloglist = create(<BlogList />).toJSON();
    expect(bloglist).toMatchSnapshot();
});
/*
it("renders correctly with props", () => {
    const blogList = <BlogList setIsBlogOpened="true" setClickedBlog="" />;
    const { getByTestId } = render(blogList);
    expect(getByTestId("bloglist")).toHaveTextContent("true", "");
});
it("matches snapshot 2", () => {
    const bloglist = create(
        <BlogList setIsBlogOpened="true" setClickedBlog="" />
    ).toJSON;
    expect(bloglist).toMatchSnapshot();
});
//for the date
/*
const date = "21 JAN 2015";
const format = "DD MMM YYYY";
it("render valueToDate utility with empty value", () => {
    expect(valueToDate("", format)).toEqual(null);
});
it("check value is instanceof moment", () => {
    expect(valueToDate(date, format) instanceof moment).toBeTruthy();
});
*/
