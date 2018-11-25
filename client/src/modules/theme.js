import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7986cb'
    },
    secondary: {
      main: '#212121'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default createMuiTheme(theme);