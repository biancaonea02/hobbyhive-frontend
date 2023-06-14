/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styles } from "../../styles/login";
import { updateUser } from "../../services/user-service";

function ModalEdit({
  handleClose,
  user,
  setUser,
  setSnackbarMessage,
  setSnackbarSeverity,
  handleOpenSnackbar,
}) {
  const [values, setValues] = useState({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleUsernameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, username: newValue });
  };

  const handleFirstNameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, firstName: newValue });
  };

  const handleLastNameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, lastName: newValue });
  };

  const handleSubmit = async () => {
    const updated = await updateUser(
      user?.id,
      values.username,
      values.firstName,
      values.lastName
    );
    if (updated) {
      setUser(updated);
      handleClose();
      setSnackbarMessage("Account successfully updated!");
      setSnackbarSeverity("success");
      handleOpenSnackbar();
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
    >
      <Box sx={{ backgroundColor: "#fff", padding: "50px" }}>
        <Typography sx={{ fontSize: "25px" }}>
          Update your information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "7%" }}>
          <TextField
            margin="normal"
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={values.username}
            onChange={handleUsernameInputChange}
          />
          <TextField
            margin="normal"
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleFirstNameInputChange}
          />
          <TextField
            margin="normal"
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            value={values.lastName}
            onChange={handleLastNameInputChange}
          />
          <Button
            type="submit"
            sx={{
              background: "#3DBC57",
              color: "#fff",
              textTransform: "none",
              fontSize: "15px",
              mt: "10%",
              mb: 2,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalEdit;
