import React from "react";
import PostDatailCardLoad from "./PostDatailCardLoad";
import CommentsLoader from "./CommentsLoader";

const PostPageLoad = () => {
  return (
    <div className="grid gap-2 grid-cols-1  md:grid-cols-2">
      <PostDatailCardLoad />
      <CommentsLoader />
    </div>
  );
};

export default PostPageLoad;
