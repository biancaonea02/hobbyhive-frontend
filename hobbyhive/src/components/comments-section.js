/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";
import { getCommentsOfPost } from "../services/comment-service";
import CommentUser from "./comment-user";
import Comment from "./comment-input";

export default function CommentsSection({ postId, userId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    void (async () => {
      const comments = await getCommentsOfPost(postId);
      setComments(comments);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {comments?.map((comment) => (
        <CommentUser key={comment.id} comment={comment.content} />
      ))}
      {/* <Comment postId={postId} userId={userId} /> */}
    </Box>
  );
}
