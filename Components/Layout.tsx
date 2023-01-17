import { Grid } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

// What is the layout component supposed to do?
// 1. Makes sure that the page structure of every page looks the same
// 2. Add content that is going to be on every page, e.g Navbar
export const Layout: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <Grid container>
        {
          //Insert navigation bar here.
        }
      </Grid>
      <Grid container>
        {
          //Inseart utility bar here.
        }
        {props.children}
      </Grid>
    </>
  );
};
