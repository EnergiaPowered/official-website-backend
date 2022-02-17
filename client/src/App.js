import React from "react";

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
        <PageProgress color={"skyblue"} height={5} />
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
            })
          }
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
