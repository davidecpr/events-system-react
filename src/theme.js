import { createMuiTheme } from '@material-ui/core/styles'

const config = {
  themeName: 'Events System Theme',
  palette: {
    primary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
      contrastText: '#fff'
    }
  }
}

const theme = createMuiTheme(config)
export default theme
