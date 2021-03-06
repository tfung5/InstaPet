import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUserThunk } from "../../actions/userActions";
import { modifyAuth } from "../../actions/authActions";
import "./EditProfile.css";
import { Form, Label, Input } from "reactstrap";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.viewUserObject.id,
      displayName: this.props.viewUserObject.displayName,
      userName: this.props.viewUserObject.userName,
      email: this.props.viewUserObject.email,
      profilePicture: this.props.viewUserObject.profilePicture,
      bio: this.props.viewUserObject.bio
    };

    this.initial = this.state;
  }

  componentDidMount = () => {
    // set values to empty strings to avoid errors in case props recived are null

    if (this.state.bio === null) {
      this.setState({ bio: "" });
    }

    if (this.state.profilePicture === null) {
      this.setState({ profilePicture: "" });
    }
  };

  // EVENT HANDLERS
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    // this is only if the user deletes the initial properties and leaves fields blank
    // Its okay if save changes is clicked and nothing actually changed
    e.preventDefault();
    if (this.state.userName === "") {
      alert("Username CANNOT be empty");
    } else {
      // send changed user data
      let changedUser = {
        // NOT changed but need it for Link
        userName: this.state.userName,

        id: this.props.viewUserObject.id,
        displayName: this.state.displayName,
        //  email: this.state.email,
        profilePicture: this.state.profilePicture,
        bio: this.state.bio
      };

      // send to edit User to update User AND the database
      this.props.editUser(changedUser);

      // send to only update Auth
      this.props.editAuth(changedUser);
    }
  };

  componentDidUpdate = () => {
    // if null set to empty string to avoid warning and unwatned errors

    if (this.state.bio === null) {
      this.setState({ bio: "" });
    }

    if (this.state.profilePicture === null) {
      this.setState({ profilePicture: "" });
    }
  };

  render() {
    return (
      <div className="editUser">
        <Form className="editUserForm">
          <Label>Name</Label>
          <Input
            type="text"
            value={this.state.displayName}
            name="displayName"
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Label>Profile Picture</Label>
          <Input
            type="text"
            value={this.state.profilePicture}
            name="profilePicture"
            placeholder="URL of Profile Picture"
            onChange={this.handleChange}
          />
          <Label>Bio</Label>
          <Input
            type="textarea"
            className="editProfileTextarea"
            value={this.state.bio}
            name="bio"
            placeholder="Bio"
            onChange={this.handleChange}
          />
          <Input
            className="editProfileSubmit"
            type="submit"
            onClick={this.handleSubmit}
            value="Save Changes"
          />
        </Form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  name: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  profilePicture: PropTypes.string,
  bio: PropTypes.string,
  phone: PropTypes.string
};

// CONNECT TO REDUX

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: changedUser => dispatch(editUserThunk(changedUser)),
    editAuth: changedUser => dispatch(modifyAuth(changedUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
