/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import { InputBase } from "@mui/material";

export default function CommentUser({ comment }) {
  return (
    <>
      <CardOverflow
        sx={{ display: "flex", alignItems: "center", p: "var(--Card-padding)" }}
      >
        <Avatar
          sx={{ width: 40, height: 40, mr: 2 }}
          alt="Avatar"
          src="avatar.png"
        />
        <InputBase
          sx={{
            flex: 1,
            mr: 2,
            border: 1,
            borderColor: "grey.500",
            borderRadius: 5,
            padding: 0.5,
            "&::placeholder": {
              paddingLeft: "0.5rem",
            },
          }}
          inputProps={{ style: { paddingLeft: "0.5rem" } }}
          placeholder="Write a comment..."
          value={comment}
        />
      </CardOverflow>
    </>
  );
}
