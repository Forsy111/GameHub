import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
       ©2024 20215. Все права защищены.{" "}
      <Link to="/" color="inherit">
        GameHub
      </Link>
    </Typography>
  );
};

export default Copyright;
