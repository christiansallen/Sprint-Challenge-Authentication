import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";

import Register from "./register/Register";
import Login from "./login/Login";
import Jokes from "./jokes/Jokes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/register">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/jokes">Jokes</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <main>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
  logout = e => {
    e.preventDefault();
    localStorage.removeItem("jwt");

    this.props.history.push("/login");
  };
}

export default withRouter(App);
