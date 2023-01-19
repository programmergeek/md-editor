import {
  Avatar,
  Box,
  Grid,
  IconButton,
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

export const UtilityBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                marginTop: 1,
                marginLeft: 4,
              }}
            >
              <FiSearch style={{ marginBottom: 5 }} />
              <TextField
                id="standard-basic"
                label="search"
                variant="standard"
              />
            </Box>
          </Grid>
          <Grid item display={"flex"} justifyContent={"end"} xs={8}>
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
                marginRight: 4,
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
              right: 14,
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
