import { Box, Button, Grid, IconButton } from "@mui/material";
import * as colours from "@mui/material/colors";
import { HiOutlineFolder } from "react-icons/hi";
import { CiGrid42 } from "react-icons/ci";
import { BsGear, BsMarkdown } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/router";

// TODO:
// - navigate to other pages

export const SideNavbar: React.FC = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        borderRight: `1px solid ${colours.grey[400]}`,
        minHeight: "100vh",
        display: {
          xs: "none",
          sm: "grid",
        },
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
            <IconButton
              sx={{
                color:
                  router.pathname === "/" ? colours.purple[500] : undefined,
                backgroundColor:
                  router.pathname === "/" ? colours.purple[50] : undefined,
                ":hover": {
                  color:
                    router.pathname === "/" ? colours.purple[500] : undefined,
                  backgroundColor:
                    router.pathname === "/" ? colours.purple[50] : undefined,
                },
              }}
              onClick={() => {
                console.log(router.pathname);
              }}
            >
              <CiGrid42 height={35} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                color: /\/post\/*/.test(router.pathname)
                  ? colours.purple[500]
                  : undefined,
                backgroundColor: /\/post\/*/.test(router.pathname)
                  ? colours.purple[50]
                  : undefined,
                ":hover": {
                  color: /\/post\/*/.test(router.pathname)
                    ? colours.purple[500]
                    : undefined,
                  backgroundColor: /\/post\/*/.test(router.pathname)
                    ? colours.purple[50]
                    : undefined,
                },
              }}
            >
              <HiOutlineFolder height={35} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                color:
                  router.pathname === "/settings"
                    ? colours.purple[500]
                    : undefined,
                backgroundColor:
                  router.pathname === "/settings"
                    ? colours.purple[50]
                    : undefined,
                ":hover": {
                  color:
                    router.pathname === "/settings"
                      ? colours.purple[500]
                      : undefined,
                  backgroundColor:
                    router.pathname === "/settings"
                      ? colours.purple[50]
                      : undefined,
                },
              }}
            >
              <BsGear height={35} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
