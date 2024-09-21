"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { PostData } from "@/lib/database/models/post.model";
import { getComments } from "@/lib/actions/post.actions";
import CommentCard from "../shared/Cards/CommentCard";

const LoadMoreComments = ({ postIdString }: { postIdString: string }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<PostData[]>([]);
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
        comments.map((post: PostData) => (
          <CommentCard key={post._id} comm={post} />
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
