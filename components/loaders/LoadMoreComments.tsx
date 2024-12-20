"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { getComments } from "@/lib/actions/post.actions";
import CommentCard from "../shared/Cards/CommentCard";

const LoadMoreComments = ({
  postIdString,
  postCreatorUsername,
}: {
  postIdString: string;
  postCreatorUsername: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  async function handleLoadmore() {
    setLoading(true);
    getComments(postIdString, page).then((res) => {
      setComments((prevData) => [...prevData, ...res.comments]);
      setHasMore(res.hasMore);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    });
  }

  return (
    <>
      {comments.length > 0 &&
        comments.map((post: any) => (
          <CommentCard
            key={post._id}
            comm={post}
            postCreatorUsername={postCreatorUsername}
          />
        ))}
      {hasMore && (
        <Button
          //   variant="outline"
          className="w-full"
          onClick={handleLoadmore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more comments"}
        </Button>
      )}
    </>
  );
};

export default LoadMoreComments;
