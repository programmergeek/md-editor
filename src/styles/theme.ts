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
          backgroundColor: purple[500],
          color: "#fff",
          fontWeight: 600,
          ":hover": {
            backgroundColor: purple[400],
            color: "#fff",
          },
          ":disabled": {
            backgroundColor: purple[200],
            color: "#fff",
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
