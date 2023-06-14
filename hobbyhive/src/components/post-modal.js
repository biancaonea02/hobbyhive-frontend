/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import InstagramPost from "./post";

export default function PostModal({ post, handleClose }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClose}
    >
      <InstagramPost post={post} modal={true} />
    </Box>
  );
}
