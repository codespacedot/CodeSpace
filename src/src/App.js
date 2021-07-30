import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import home from "./pages/home";
import Academics from "./pages/academics";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/academics" component={Academics} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
