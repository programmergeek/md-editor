import { Grid } from "@mui/material";
import React from "react";
import { SideNavbar } from "./Navigation";
import { UtilityBar } from "./UtilityBar/UtilityBar";

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
        <Grid item xs={0} sm={0.75} lg={0.5} xl={0.4}>
          <SideNavbar />
        </Grid>
        <Grid item direction={"column"} xs={12} sm={11.25} lg={11.5} xl={11.6}>
          <Grid item>
            {
              //Inseart utility bar here.
            }
            <UtilityBar />
          </Grid>
          <Grid item xs>
            {/** page content goes here */}
            {props.children}
          </Grid>
          <Grid item xs={1} sm={0.001}>
            {
              // insert bottom navbar here
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
