import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455a64'
    },
    textPrimary: {
      main: '#fafafa'
    },
    secondary: {
      main: '#ffb74d'
    },
    textSecondary: {
      main: '#000000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default createMuiTheme(theme);