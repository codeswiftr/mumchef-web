import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  spacing: 2,
  paper: {
    width: "100%",
  },
  palette: {
    // primary: {
    //   main: "#556cd6",
    // },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default theme;
