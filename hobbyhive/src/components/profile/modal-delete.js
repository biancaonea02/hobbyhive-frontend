/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { deleteUser } from "../../services/user-service";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authentication-service";

export default function ModalDelete({
  handleClose,
  userId,
  setSnackbarMessage,
  setSnackbarSeverity,
  handleOpenSnackbar,
}) {
  const dispatch = useDispatch();
  const handleDeleteUser = async () => {
    const deleted = await deleteUser(userId);
    if (deleted) {
      handleClose();
      setSnackbarMessage(
        "Account successfully deleted. You are redirected back to login...."
      );
      setSnackbarSeverity("success");
      handleOpenSnackbar();
      setTimeout(() => {
        dispatch(logout());
      }, 5000);
    }
  };

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
      <Box sx={{ backgroundColor: "#fff", padding: "35px" }}>
        <Typography sx={{ fontSize: "25px" }}>
          Are you sure you want to delete your account?
        </Typography>
        <Typography
          sx={{ fontSize: "15px", textAlign: "center", marginTop: "2%" }}
        >
          All your information related to this account will be deleted.
        </Typography>
        <Box sx={{ marginTop: "7%", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleDeleteUser}
            sx={{
              backgroundColor: "green",
              color: "#fff",
              textTransform: "none",
              width: "20%",
              marginRight: "30%",
              marginLeft: "10%",
            }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DF2E38",
              color: "#fff",
              textTransform: "none",
              width: "20%",
            }}
            onClick={handleClose}
          >
            Discard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
