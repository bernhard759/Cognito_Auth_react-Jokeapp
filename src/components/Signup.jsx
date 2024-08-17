import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import UserPool from "../userpool";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle verification code submission
  const handleVerificationSubmit = (data) => {
    if (cognitoUser) {
      cognitoUser.confirmRegistration(
        data.confirmationCode,
        true,
        (err, result) => {
          if (err) {
            console.error("Failed to verify email", err);
            setErrorMessage(
              err.message || "Failed to verify email. Please try again."
            );
          } else {
            console.log("Email verified successfully", result);
            navigate("/dashboard"); // Navigate to the dashboard after successful verification
          }
        }
      );
    }
  };

  // Handle signup submission
  const onSubmit = (data) => {
    setErrorMessage(""); // Reset error message before submission

    UserPool.signUp(data.email, data.password, [], null, (err, result) => {
      if (err) {
        console.error("Failed to sign up", err);
        setErrorMessage(err.message || "Failed to sign up. Please try again.");
      } else {
        console.log("Signup successful", result);
        setCognitoUser(
          new CognitoUser({ Username: data.email, Pool: UserPool })
        );
        setConfirmationCodeSent(true);
        reset(); // Reset the form for confirmation code input
      }
    });
  };

  // Markup
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(
        confirmationCodeSent ? handleVerificationSubmit : onSubmit
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
        {confirmationCodeSent ? "Verify Email" : "Sign Up"}
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {confirmationCodeSent ? (
        <TextField
          label="Verification Code"
          variant="outlined"
          fullWidth
          {...register("confirmationCode", {
            required: "Verification code is required",
          })}
          error={!!errors.confirmationCode}
          helperText={
            errors.confirmationCode ? errors.confirmationCode.message : ""
          }
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
        {confirmationCodeSent ? "Verify Email" : "Sign Up"}
      </Button>
    </Box>
  );
};

export default Signup;
