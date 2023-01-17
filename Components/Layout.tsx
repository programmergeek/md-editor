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
      <Grid container xs={1}>
        <Grid item xs></Grid>
        {
          //Insert navigation bar here.
        }
      </Grid>
      <Grid container xs={12}>
        <Grid item xs>
          {
            //Inseart utility bar here.
          }
        </Grid>
        <Grid item xs>
          {props.children}
        </Grid>
      </Grid>
    </>
  );
};
