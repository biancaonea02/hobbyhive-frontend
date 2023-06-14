/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import { Button, InputBase } from "@mui/material";
import { addComment } from "../services/comment-service";
import SnackbarMessage from "./snackbar";

export default function Comment({ postId, userId }) {
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCommentInputChange = (event) => {
    const newValue = event.target.value;
    setComment(newValue);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const addCommentHandler = () => {
    if (comment !== "") {
      addComment(postId, userId, comment)
        .then(() => {
          setComment("");
          setSnackbarSeverity("success");
          setSnackbarMessage("Comment added successfully!");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarSeverity("error");
          setSnackbarMessage("Something went wrong. Please try again.");
          setSnackbarOpen(true);
        });
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a comment.");
      setSnackbarOpen(true);
    }
  };
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
          onChange={handleCommentInputChange}
        />
        <Button
          variant="contained"
          disableElevation
          color="primary"
          sx={{
            minWidth: "40px",
            height: "24px",
            fontSize: "0.8rem",
            color: "#fff",
            backgroundColor: "#3DBC57",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3DBC57",
            },
          }}
          onClick={() => addCommentHandler()}
        >
          Post
        </Button>
      </CardOverflow>
      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </>
  );
}
