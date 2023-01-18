import { Box, Grid } from "@mui/material";
import * as colours from "@mui/material/colors";
import React from "react";

export const SideNavbar: React.FC = () => {
  return (
    <Box
      sx={{
        borderRight: `1px solid ${colours.grey[400]}`,
        minHeight: "100vh",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3} direction={"column"}>
        <Grid item>
          {/**
           * - Logo goes here.
           * - It takes you to the home page on click
           * - it is slightly larger than the other nav elements
           */}
          <Box
            sx={{ width: 50, height: 50, backgroundColor: colours.green[300] }}
          />
        </Grid>
        <Grid
          item
          container
          spacing={1}
          direction={"column"}
          display="grid"
          justifyContent={"center"}
        >
          {/**
           * - Navigation buttons go here
           * - Nav buttons: Home, Files, Settings
           * - When active, the button have a light purple background and button icons should have a darker purple outline
           * - When they are not active buttons should have a white background and a black icon outline.
           */}
          <Grid item>
            <Box
              sx={{ width: 35, height: 35, backgroundColor: colours.red[500] }}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{ width: 35, height: 35, backgroundColor: colours.red[500] }}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{ width: 35, height: 35, backgroundColor: colours.red[500] }}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{ width: 35, height: 35, backgroundColor: colours.red[500] }}
            />
          </Grid>
          <Grid item>
            <Box
              sx={{ width: 35, height: 35, backgroundColor: colours.red[500] }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
