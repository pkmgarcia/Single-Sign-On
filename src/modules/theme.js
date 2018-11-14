import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#81d3f9',
      light: '#b5ffff',
      dark: '#4ba2c6'
    },
    secondary: {
      main: '#ffca28',
      light: '#fffd61',
      dark: '#c79a00'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default createMuiTheme(theme);