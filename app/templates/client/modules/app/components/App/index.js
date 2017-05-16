import React from "react";
import { Switch, Route } from "react-router-dom";
import { themr } from "react-css-themr";

import logo from "./logo.png";

import appTheme from "./theme.scss";

export function App({ theme }) {
  return (
    <div className={theme.app}>
      <div className={theme.header}>
        <img src={logo} className={theme.logo} alt="logo" />
        <h4>Welcome!</h4>
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <h5 style={{ margin: 40 }}>
      Home
    </h5>
  );
}

function NotFound() {
  return (
    <h5 style={{ margin: 40 }}>
      Route not found
    </h5>
  );
}

export default themr("", appTheme)(App);
