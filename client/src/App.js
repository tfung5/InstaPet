import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Profile from "./components/profile/Profile";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log("componentDidMount");
    console.log(localStorage.getItem("JWT"));
  };

  componentWillReceiveProps = async nextProps => {
    console.log("componentWillReceiveProps");
    if (nextProps.user.user.token) {
      await localStorage.setItem("JWT", nextProps.user.user.token);
    }
    console.log(localStorage.getItem("JWT"));
  };

  displayContent = () => {
    // If logged in
    if (this.props.user.user.auth) {
      return (
        <div className="content">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={Profile} />
        </div>
      );
    }
    // If not logged in
    else {
      return (
        <div className="content">
          <Route path="/" component={SignUp} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </div>
      );
    }
  };

  render() {
    return (
      <Router>
        <div className="app">{this.displayContent()}</div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
