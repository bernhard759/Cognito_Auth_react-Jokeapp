import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userpool from "../userpool";
import { logout } from "../services/authenticate";

const Dashboard = () => {
  const navigate = useNavigate();

  // Check user auth
  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Markup
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginBottom: 4 }}
      >
        Logout
      </Button>
      <Typography variant="h5">Here is the joke:</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Why did the bicycle fall over? It was two-tired!
      </Typography>
    </Box>
  );
};

export default Dashboard;
