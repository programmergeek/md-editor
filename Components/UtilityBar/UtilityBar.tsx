import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import * as colours from "@mui/material/colors";
import { FiSearch } from "react-icons/fi";
import { IoAdd, IoLogOutOutline } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import React, { useState } from "react";

// TODO:
// - Search:
//  - Search field has been created but it is not connected to any backend logic to search for posts:
//    - It should send the search term to the backend and navigate the user to search results page to display the results.
//  - Search fields needs to wrapped in a form.
//
// - Utility Buttons:
//  - The `new post` buttons need to navigate the user to the new post post page.
//  - The `settings` button should navigate the user to the settings page
//  - The `logout` button should delete the user session, e.i remove any user authentication data from the global state/context

export const UtilityBar: React.FC = () => {
  // store the state of the anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); // boolean value to determine if the menu is open

  // When the user avatar icon button is clicked it will be set as an anchor for the menu
  // When the anchor is set it will allow the menu to appear directly below it
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  // when the user either clicks off the menu or selects one of the options, the achor element will be
  // set to null which will hide the menu.
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: 75,
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item container>
          <Grid item xs={5} md={3} xl={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                marginTop: 2.5,
                marginLeft: {
                  xs: 1,
                  sm: 4,
                },
                width: "100%",
              }}
            >
              <InputBase
                id="standard-basic"
                placeholder="Search"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#eaeaea",
                  borderRadius: 2,
                  paddingTop: 0.5,
                  paddingBottom: 0.5,
                  paddingLeft: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            display={"flex"}
            justifyContent={"end"}
            xs={7}
            md={9}
            xl={10}
          >
            <IconButton
              size="small"
              sx={{
                borderRadius: 999,
                marginTop: 2.5,
                marginRight: 2,
                width: 45,
                height: 45,
                ":hover": {
                  backgroundColor: colours.purple[50],
                  color: colours.purple[500],
                },
              }}
            >
              <IoAdd fontSize={30} />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 999,
                marginRight: {
                  xs: 1,
                  sm: 4,
                },
                marginTop: 2,
                color: "#fff",
                ":hover": {
                  color: "#fff",
                },
              }}
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: colours.deepPurple[100],
                }}
              >
                M
              </Avatar>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <ListItemIcon>
            <IoAdd />
          </ListItemIcon>
          New Post
        </MenuItem>
        <MenuItem sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <ListItemIcon>
            <BsGear />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <ListItemIcon>
            <IoLogOutOutline />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
