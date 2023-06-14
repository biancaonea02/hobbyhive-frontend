/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
} from "@mui/material";
import { styles } from "../styles/login";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  authenticationSuccess,
  authenticationFailure,
  registerUser,
} from "../services/authentication-service";
import ConsentComponent from "./consent-component";

const SignUpForm = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [consentChecked, setConsentChecked] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleLinkClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, username: newValue });
  };

  const handlePasswordInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, password: newValue });
  };

  const handleFirstNameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, firstName: newValue });
  };

  const handleLastNameInputChange = (event) => {
    const newValue = event.target.value;
    setValues({ ...values, lastName: newValue });
  };

  const handleCheckboxChange = (event) => {
    setConsentChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      values.username &&
      values.password &&
      values.firstName &&
      values.lastName &&
      consentChecked
    ) {
      setValid(true);

      props
        .registerUser(
          values.username,
          values.firstName,
          values.lastName,
          values.password
        )
        .then((response) => {
          setMessage("Your account was sucessfully created!");
          setTimeout(() => {
            dispatch(
              authenticationSuccess(
                response.userId,
                response.accessToken,
                response.refreshToken,
                response.data.authorities[0].authority
              )
            );
            navigate("/feed");
          }, 3000);
        })
        .catch(() => {
          setValid(false);
          setMessage("There was an error. Please try again");
        });
    } else {
      if (!consentChecked) {
        setMessage("Please agree to the terms and conditions.");
      } else {
        setMessage("Please enter your details.");
      }
    }
    setSubmitted(true);
  };

  return (
    <Box sx={styles.loginPage}>
      <Box sx={styles.loginRight}>
        <Typography variant="h5" component="p" sx={styles.logo}>
          Hobby Hive
        </Typography>
        <Typography variant="h5" component="p" sx={styles.logoText}>
          Hobby Hive helps you connect and share with the people in your life.
        </Typography>
      </Box>
      <Box sx={styles.loginLeft}>
        <Box sx={styles.loginHeader}>
          <Typography variant="h2" sx={styles.loginHeaderText}>
            Sign Up to Hobby Hive
          </Typography>
        </Box>
        {submitted && valid && (
          <Typography sx={styles.loginSuccessMessage}>{message}</Typography>
        )}
        {submitted && !valid && (
          <Typography sx={styles.loginErrorMessage}>{message}</Typography>
        )}
        <Box component="form" sx={styles.loginForm} onSubmit={handleSubmit}>
          <Box style={styles.loginContainerOne}>
            <Box style={styles.loginContainerTwo}>
              <TextField
                margin="normal"
                name="firstName"
                label="First Name"
                id="firstName"
                autoComplete="firstName"
                value={values.firstName}
                onChange={handleFirstNameInputChange}
              />
              <TextField
                margin="normal"
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="lastName"
                value={values.lastName}
                onChange={handleLastNameInputChange}
              />
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handlePasswordInputChange}
              />
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15%",
              }}
            >
              <Checkbox
                checked={consentChecked}
                onChange={handleCheckboxChange}
              />

              <Typography variant="body2">
                By ticking this box, you accept the{" "}
                <Link onClick={handleLinkClick}>terms and conditions</Link>.
              </Typography>
              <ConsentComponent
                openModal={openModal}
                handleCloseModal={handleCloseModal}
              />
            </div>
            <Button
              type="submit"
              sx={styles.loginSubmitButton}
              onClick={handleSubmit}
            >
              Create your account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(SignUpForm);
