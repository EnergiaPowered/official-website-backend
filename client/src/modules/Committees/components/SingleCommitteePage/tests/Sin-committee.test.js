import React from "react";

import Sin from "../index";

import { cleanup, render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { getCommittees } from "modules/Committees/services/committees.services";

window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
}

afterEach(cleanup);

it("renders the component that matches the props", () => {
  const { getByTestId } = render(
    <Sin
      match={{ params: { id: "committee1" }, isExact: true, path: "", url: "" }}
    />
  );

  getCommittees().then((res) => {
    //   get the item matches the params id: "committee1"
    const data = res.data.find(item => item.title.toLowerCase() === "committee1")
    expect(getByTestId("comm-title")).toHaveTextContent(data.title);

  });

});
