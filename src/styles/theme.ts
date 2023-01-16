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
  },
});
