const customTheme = theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    padding: 10
  },
  signup: {
    margin: theme.spacing(1, 0, 2),
    padding: 10
  }
});

export default customTheme;