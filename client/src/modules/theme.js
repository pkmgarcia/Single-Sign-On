import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121'
    },
    secondary: {
      main: '#9fa8da'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default createMuiTheme(theme);