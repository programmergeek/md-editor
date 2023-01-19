import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#A555EC",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: {
          textTransform: "capitalize",
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: purple[50],
          ":hover": {
            backgroundColor: purple[50],
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        centerRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          ":hover": {
            color: purple[500],
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
});
