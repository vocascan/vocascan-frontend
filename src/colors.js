import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#727CF5",
    },
    primaryColour: {
      main: "#F1F3FA"
    },
    secondaryColour: {
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
    border: {
      main: "#8790A3",
    }
    
  }
});

export default theme