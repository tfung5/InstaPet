import React, { Component } from "react";
import Comment from "./Comment";
import { connect } from "react-redux";

class PostComments extends Component {
  constructor(props) {
    super(props);
  }

  displayViewAllComments = () => {
    if (this.props.comments.length === 0) {
      return <div className="postCommentsNone" />;
    }
    if (this.props.comments.length >= 3) {
      return <i>View all {this.props.comments.length} comments</i>;
    }
  };

  render() {
    return (
      <div className="postComments">
        {this.displayViewAllComments()}
        {this.props.comments.map(comment => {
          return (
            <Comment userName={comment.userName} content={comment.content} />
          );
        })}
        <i>12 minutes ago</i>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComments);
