import React, { Suspense } from "react";

import routes from "./globals/routes";

import "./index.css";

// routing components
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import PageProgress from "react-page-progress";

import NotFound from "modules/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <PageProgress color={"#1d4db6"} height={5} />
        <Suspense fallback={<div></div>}>
          <Switch>
            {routes &&
              routes.length > 0 &&
              routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    exact // we should either use exact or Switch component (using both doesn't look clean)
                    path={route.path}
                    component={route.component}
                  />
                );
              })}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
