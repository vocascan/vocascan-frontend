import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F1F3FA"
    },
    secondary: {
      main: "#313A46"
    },
    third: {
      main: "#242424",
    },
    action: {
      main: "#727CF5"
    },
    shadow: {
      main: "#b4bed6",
      background: "hsl(0, 0%, 0%, 0.4)",
    },
    error: {
      main: "#FF586E",
      hover: "#dd4b5e"
    },
    success: {
      main: "#0ACF97"
    },
    font: {
      light: "#ffffff",
      middle: "#8790A3",
      dark: "#000000"
    },
    
  }
});

export default theme