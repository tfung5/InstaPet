import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount = () => {
    // If the user is already logged in and navigates to the Login page, they will be redirected to the homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  static getDerivedStateFromProps = nextProps => {
    // Upon successful login, redirect the user to the homepage
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/");
    }

    // If there are errors in the form fields, set them to the errors object in the state
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else {
      return null;
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    // Since the redirect is handled within our component, the history does not need to be passed. 'withRouter' is NOT necessary for this.
    // The redirect is handled in getDerivedStateFromProps when the component hears that the user is authenticated.
    this.props.loginUser(user);
  };

  render() {
    const { errors } = this.state; // Equivalent to const errors = this.state.errors. This just makes the code easier to read; can write errors.email instead of this.state.errors.email

    return (
      <div className="background">
        <div className="box">
          <img
            src={require("../../img/phone.png")}
            className="phoneImage"
            alt="phoneImg"
          />
          <div className="formContainer">
            <h1 className="title">Instapet</h1>
            <Form className="form" onSubmit={this.handleSubmit}>
              <FormGroup className="formBox">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="formBoxInput"
                  onChange={this.handleChange}
                />
                <FormText className="formBoxError">{errors.email}</FormText>
              </FormGroup>
              <FormGroup className="formBox">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="formBoxInput"
                  onChange={this.handleChange}
                />
                <FormText className="formBoxError">{errors.password}</FormText>
              </FormGroup>
              <Button
                type="submit"
                className="submit"
                onClick={this.handleSubmit}
              >
                Log In
              </Button>
            </Form>
            <div className="signupbox">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
