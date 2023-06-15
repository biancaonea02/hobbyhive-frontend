/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  acceptFriendRequest,
  getPendingFriendRequests,
  rejectFriendRequest,
} from "../services/friends-service";
import SnackbarMessage from "./snackbar";
import { getLoggedInUser } from "../services/user-service";

const FriendRequest = ({ id, senderId, setFriendRequests }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [user, setUser] = useState(Object);

  useMemo(() => {
    void (async () => {
      const user = await getLoggedInUser(senderId);
      setUser(user);
      console.log(user);
    })();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const acceptRequestHandler = async () => {
    acceptFriendRequest(id)
      .then(async () => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Request accepted successfully!");
        setSnackbarOpen(true);
        setTimeout(async () => {
          const friendRequests = await getPendingFriendRequests();
          setFriendRequests(friendRequests);
        }, 3000);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Something went wrong. Please try again.");
        setSnackbarOpen(true);
      });
  };

  const rejectRequestHandler = async () => {
    rejectFriendRequest(id)
      .then(async () => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Request rejected successfully!");
        setSnackbarOpen(true);
        setTimeout(async () => {
          const friendRequests = await getPendingFriendRequests();
          setFriendRequests(friendRequests);
        }, 3000);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Something went wrong. Please try again.");
        setSnackbarOpen(true);
      });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#F0FFF0"
      p={2}
      borderRadius={4}
      mb={2}
    >
      <Avatar alt={`${user?.firstName} ${user?.lastNme}`} sx={{ mr: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {`${user?.firstName} ${user?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${user?.firstName} wants to be your friend.`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", backgroundColor: "#3DBC57" }}
            onClick={() => acceptRequestHandler()}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#3DBC57",
              borderColor: "#3DBC57",
            }}
            onClick={() => rejectRequestHandler()}
          >
            Decline
          </Button>
        </Box>
      </Box>
      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default FriendRequest;
