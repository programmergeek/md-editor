import { Box, Grid, IconButton, TextField } from "@mui/material";
import * as colours from "@mui/material/colors";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
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
              sx={{
                borderRadius: 999,
                marginTop: 1.7,
                marginRight: 2,
                ":hover": {
                  backgroundColor: colours.purple[50],
                  color: colours.purple[500],
                },
              }}
            >
              <IoAdd fontSize={30} />
            </IconButton>
            <Box
              sx={{
                backgroundColor: colours.blue[500],
                borderRadius: 999,
                width: 40,
                height: 40,
                marginTop: 2,
                marginRight: 4,
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
