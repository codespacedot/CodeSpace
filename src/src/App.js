import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import home from "./pages/home";
import Year from "./pages/year";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/academics" component={Year} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
