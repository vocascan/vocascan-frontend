import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#F1F3FA" },
    secondary: { main: "#313A46" },
    error: { main: "#FF586E" },
    success: { main: "0ACF97" },
    text: {
      primary: "#000000",
      secondary: "#8790A3"
    },
    info: {
      main: "#727CF5"
    }
  }
});

export default theme