import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserEmpty } from "@fortawesome/free-regular-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navBar">
        <div className="navBarItems">
          <div className="navBarLogo navBarItem">
            <Link to="/">
              <img
                className="logo"
                src={require("../../img/logo.png")}
                alt="logo"
              />
            </Link>
          </div>

          <div className="navBarIcons navBarItem">
            <Link to={"/profile/" + this.props.auth.user.userName}>
              <FontAwesomeIcon
                className="navBarIcon navBarIconProfile"
                icon={faUserEmpty}
              />
            </Link>
            <FontAwesomeIcon
              className="navBarIcon navBarIconLogout"
              icon={faDoorOpen}
              onClick={this.logout}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
