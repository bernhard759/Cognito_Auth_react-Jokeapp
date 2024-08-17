import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { authenticate } from "../services/authenticate";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [userSession, setUserSession] = useState(null); // Store the CognitoUser instance
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle New Password Submission
  const handleNewPasswordSubmit = (data) => {
    if (userSession) {
      userSession.completeNewPasswordChallenge(
        data.newPassword,
        {},
        {
          onSuccess: (session) => {
            console.log("Password changed successfully", session);
            navigate("/dashboard"); // Navigate to the dashboard
          },
          onFailure: (err) => {
            console.error("Failed to set new password", err);
            setErrorMessage(
              err.message || "Failed to set new password. Please try again."
            );
          },
        }
      );
    }
  };

  // Submit
  const onSubmit = (data) => {
    setErrorMessage(""); // Reset error message before submission

    authenticate(data.email, data.password)
      .then((response) => {
        console.log("Logged in!", response);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.message === "newPasswordRequired") {
          setNewPasswordRequired(true);
          setUserSession(err.user); // Store the CognitoUser instance for later use
          reset(); // Reset the form for new password input
        } else {
          console.error("Failed to login", err);
          setErrorMessage(err.message || "Failed to login. Please try again.");
        }
      });
  };

  // Markup
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(
        newPasswordRequired ? handleNewPasswordSubmit : onSubmit
      )}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h4" align="center">
        {newPasswordRequired ? "Set New Password" : "Login"}
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {newPasswordRequired ? (
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          {...register("newPassword", { required: "New Password is required" })}
          error={!!errors.newPassword}
          helperText={errors.newPassword ? errors.newPassword.message : ""}
        />
      ) : (
        <>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </>
      )}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        {newPasswordRequired ? "Set Password" : "Login"}
      </Button>
    </Box>
  );
};

export default Login;
