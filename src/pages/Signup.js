import React from "react";
import LoginStyle from "../styles/LoginStyle";
import {Avatar, Button, Container, Grid, Snackbar, Typography, withStyles} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Field, Form} from 'react-final-form'
import TextFieldWrapper from "../components/Form/TextFieldWrapper";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

@inject('userStore')
@observer
class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alert: {
        message: ''
      }
    }
  }

  onSubmit = async (values) => {
    const {userStore} = this.props

    try {
      await userStore.signup(values)
      this.props.history.push('')
    } catch (e) {
      this.setState({
        showAlert: true,
        alert: {
          message: e.response.data
        }
      })
    }
  }

  validate = values => {
    const error = {};
    if (!values.username) {
      Object.assign(error, {
        username: 'Field is required'
      })
    }

    if (!values.password) {
      Object.assign(error, {
        password: 'Field is required'
      })
    } else if (values.password.length < 4) {
      Object.assign(error, {
        password: 'The minimum password length is 4 characters'
      })
    }

    if (!values.fullName) {
      Object.assign(error, {
        fullName: 'Field is required'
      })
    }

    return error
  }

  render() {
    const {classes} = this.props
    const {showAlert} = this.state

    return (
      <React.Fragment>
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => this.setState({showAlert: false})}>
          <Alert severity="error">
            {this.state.alert.message}
          </Alert>
        </Snackbar>
        <Container maxWidth='sm' component='main'>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrati
            </Typography>
            <Form onSubmit={this.onSubmit} validate={this.validate} mutators={{}}
                  render={({handleSubmit, values, mutators, valid, form}) => {
                    return (
                      <form id='loginForm' onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={4}>
                          <Grid item md={12}>
                            <Field
                              margin='normal'
                              variant={'outlined'}
                              fullWidth
                              name={'username'}
                              component={TextFieldWrapper}
                              type='text'
                              label='Username'
                            />
                          </Grid>
                          <Grid item md={12}>
                            <Field
                              margin='normal'
                              variant={'outlined'}
                              fullWidth
                              name={'password'}
                              component={TextFieldWrapper}
                              type='password'
                              label='Password'
                            />
                          </Grid>
                          <Grid item md={12}>
                            <Field
                              margin='normal'
                              variant={'outlined'}
                              fullWidth
                              name={'fullName'}
                              component={TextFieldWrapper}
                              type='text'
                              label='fullName'
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item md={12}>
                            <Button type={'submit'} variant={'contained'} color={'primary'} className={classes.submit}
                                    fullWidth>
                              Registrati
                            </Button>
                          </Grid>
                          <Grid item md={12}>
                            <Button variant={'outlined'} color={'default'} className={classes.signup}
                                    onClick={() => this.props.history.push('/login')} fullWidth>
                              Accedi
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )
                  }}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }

}

export default withStyles(LoginStyle, {withTheme: true})(withRouter(Signup));