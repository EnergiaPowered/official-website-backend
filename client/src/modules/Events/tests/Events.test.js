import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Events from "..";
import { cleanup } from "@testing-library/react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <Events />
        </Router>
        , div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
    const events = mount(
        <Router>
            <Events />
        </Router>
    ).find(Events);
    expect(events.toJSON).toMatchSnapshot();
});
Enzyme.configure({ adapter: new Adapter() });

it("check default header", () => {
    const events = mount(
        <Router>
            <Events />
        </Router>
    ).find(Events);
    expect(events.find("h1").text()).toEqual("Events");
});
