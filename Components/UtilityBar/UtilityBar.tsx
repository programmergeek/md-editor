import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import * as colours from "@mui/material/colors";
import { FiSearch } from "react-icons/fi";
import React from "react";

export const UtilityBar: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: 75,
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item sx={{ paddingTop: "20px" }}></Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};
