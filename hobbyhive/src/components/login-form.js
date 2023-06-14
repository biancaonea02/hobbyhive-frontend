/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { styles } from "../styles/login";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  authenticationSuccess,
  authenticationFailure,
  authenticateUser,
} from "../services/authentication-service";
import Cookies from "js-cookie";

const LoginForm = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.username && values.password) {
      setValid(true);

      props
        .authenticateUser(values.username, values.password)
        .then((response) => {
          dispatch(
            authenticationSuccess(
              response.userId,
              response.accessToken,
              response.refreshToken,
              response.authorities[0].authority
            )
          );
          if (response.authorities[0].authority === "ROLE_USER") {
            navigate("/feed");
          } else {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          dispatch(authenticationFailure(error.message));
          setValid(false);
          setMessage("Username or password may be incorrect.");
        });
    } else {
      setMessage("Please enter your details.");
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
            Log In to Hobby Hive
          </Typography>
        </Box>
        {submitted && !valid && (
          <Typography sx={styles.loginErrorMessage}>{message}</Typography>
        )}
        <Box component="form" sx={styles.loginForm} onSubmit={handleSubmit}>
          <Box style={styles.loginContainerOne}>
            <Box style={styles.loginContainerTwo}>
              <TextField
                data-cy="username"
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
                data-cy="password"
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
            <Box style={styles.loginForgotPasswordContainer}>
              <Link
                href="/"
                variant="body2"
                style={styles.loginForgotPasswordText}
              >
                {"Forgot password?"}
              </Link>
            </Box>
            <Button
              data-cy="login-button"
              type="submit"
              sx={styles.loginSubmitButton}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Box style={styles.loginCreateAccountBox}>
              <Link
                href="/sign-up"
                variant="body2"
                style={styles.loginCreateAccountText}
              >
                {"Do not have an account? Create one now!"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const mapDispatchToProps = {
  authenticateUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
