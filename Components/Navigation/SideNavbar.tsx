import { Box, Button, Grid, IconButton } from "@mui/material";
import * as colours from "@mui/material/colors";
import { HiOutlineFolder } from "react-icons/hi";
import { CiGrid42 } from "react-icons/ci";
import { BsGear, BsMarkdown } from "react-icons/bs";
import React from "react";

export const SideNavbar: React.FC = () => {
  return (
    <Box
      sx={{
        borderRight: `1px solid ${colours.grey[400]}`,
        minHeight: "100vh",
        display: "grid",
        justifyContent: "center",
        paddingTop: 2,
      }}
    >
      <Grid container spacing={7} direction={"column"}>
        <Grid item>
          {/**
           * - Logo goes here.
           * - It takes you to the home page on click
           * - it is slightly larger than the other nav elements
           */}
          <BsMarkdown fontSize={"45"} />
        </Grid>
        <Grid
          item
          container
          spacing={3}
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
            <IconButton>
              <CiGrid42 height={35} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <HiOutlineFolder height={35} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <BsGear height={35} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
