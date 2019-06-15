import React from "react";
import Comment from "./Comment";

const PostDescription = props => {
  const { likes } = props;
  return (
    <div className="postDescription">
      <p>Liked by ### of people</p>
      <Comment />
    </div>
  );
};

export default PostDescription;
