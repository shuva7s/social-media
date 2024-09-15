"use client";

import { useState, TransitionStartFunction } from "react";
import Image from "next/image";
import { updateLikeStatus } from "@/lib/actions/post.actions";
import { Types } from "mongoose";
import { Button } from "../ui/button";

interface LikeProps {
  isliked: boolean;
  postId: string;
}

const Like = ({ isliked, postId }: LikeProps) => {
  const [liked, setLiked] = useState(isliked);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleLike = async () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    setIsProcessing(true);

    try {
      // Call the server action instead of an API route
      const response = await updateLikeStatus(postId, newLikeStatus);

      if (!response.success) {
        setLiked(!newLikeStatus);
      }
    } catch (error) {
      console.error("Failed to update like status", error);
      setLiked(!newLikeStatus);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLike}
      disabled={isProcessing}
      className={`${isProcessing ? "opacity-50" : ""}`}
    >
      {liked ? (
        <Image
          src="/heartFilled.svg"
          width={24}
          height={24}
          alt="liked"
          className="opacity-80"
        />
      ) : (
        <Image
          src="/heartStroke.svg"
          width={24}
          height={24}
          alt="not liked"
          className="opacity-55 inv"
        />
      )}
    </Button>
  );
};

export default Like;
