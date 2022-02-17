import React from "react";
import ReactDOM from "react-dom";
import HeaderForBlogs from "./../HeaderForBlogs";
import { cleanup } from "@testing-library/react";
import { create } from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

afterEach(cleanup);
it("renders without crashing", () => {
    const section = document.createElement("section");
    ReactDOM.render(<HeaderForBlogs />, section);
    ReactDOM.unmountComponentAtNode(section);
});

it("matches snapshot", () => {
    const header = create(<HeaderForBlogs />).toJSON();
    expect(header).toMatchSnapshot();
});
Enzyme.configure({ adapter: new Adapter() });

it("check default title", () => {
    const header = mount(<HeaderForBlogs />);
    expect(header.find("h1").text()).toEqual("Blogs");
    expect(header.toJSON).toMatchSnapshot();
});
