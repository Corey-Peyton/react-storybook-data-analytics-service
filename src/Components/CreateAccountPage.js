
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Divider, FormControl, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Link as RouterLink, withRouter} from 'react-router-dom';

import {XS_SCREEN} from '../Theme/constants';
import LoginFooter from './Footers/LoginFooter';

const useStyles = makeStyles((theme) => ({
  bodyText: {
    marginTop: theme.spacing(3),
  },
  container: {
    margin: theme.spacing(0, 1),
  },
  helperText: {
    marginTop: theme.spacing(0.5),
    marginLeft: [theme.spacing(1.75), '!important'],
  },
  loginDivider: {
    marginTop: theme.spacing(3),
  },
  loginHeader: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
  },
  loginInput: {
    marginTop: theme.spacing(3),
  },
  loginInputLabel: {
    backgroundColor: 'white',
    paddingRight: theme.spacing(0.5),
  },
  loginLogo: {
    height: '24px',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
    },
  },
  loginPasswordLabel: {
    '&.MuiFormLabel-root': {
      marginTop: theme.spacing(-0.75),
    },
  },
  loginTextfield: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    width: '100%',
  },
  loginWrapper: {
    display: 'table',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: '#f5f5f5',
    [theme.breakpoints.down('xs')]: {
      'display': 'flex',
      'justifyContent': 'flex-start',
      'background': theme.palette.common.white,
    },
  },
  loginContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  loginPaper: {
    marginTop: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    width: '560px',
    boxSizing: 'border-box',
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(0),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      boxShadow: 'none',
    },
  },
  loginBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function CreateAccountPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    confPassword: '',
    showPassword: false,
    showConfPassword: false,
    checked: false,
    fNameErr: '',
    lNameErr: '',
    emailErr: '',
    pWordErr: '',
    pWordConfErr: '',
    screen1: true,
    windowWidth: window.innerWidth,
  });

  const isXsScreen = state.windowWidth < XS_SCREEN;

  const handleChange = (prop) => (event) => {
    setState({...state, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setState({...state, showPassword: !state.showPassword});
  };

  const handleClickShowConfPassword = () => {
    setState({...state, showConfPassword: !state.showConfPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    document.title = t('DAaaS - Create account');
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state, t]);

  const validate = () => {
    let isError = false;
    const errors = {
      fNameErr: '',
      lNameErr: '',
      emailErr: '',
      pWordErr: '',
      pWordConfErr: '',
    };
    if (state.fName === '') {
      isError = true;
      errors.fNameErr = t('Enter first name.');
    }
    if (state.lName === '') {
      isError = true;
      errors.lNameErr = t('Enter last name.');
    }
    if (state.email === '') {
      isError = true;
      errors.emailErr = t('Enter an email.');
    }
    if (state.password === '') {
      isError = true;
      errors.pWordErr = t('Enter a password.');
    } else if (
      !state.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
      )
    ) {
      isError = true;
      errors.pWordErr =
        t('Choose a stronger password. Use 8 or more characters with a mix of letters, numbers and symbols.');
    }
    if (state.confPassword === '') {
      isError = true;
      errors.pWordConfErr = t('Confirm your password.');
    } else if (state.password !== state.confPassword) {
      isError = true;
      errors.pWordConfErr = t('Those passwords didn’t match. Try again.');
    }
    if (isError) {
      setState({
        ...state,
        ...errors,
      });
    }
    return isError;
  };

  const submitForm = () => {
    const err = validate();
    if (!err) {
      setState({...state, screen1: !state.screen1});
      document.getElementById('root').setAttribute('tabindex', -1);
      document.getElementById('root').focus();
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.loginWrapper}
    >
      <Grid item className={classes.loginContent}>
        {state.screen1 ? (
            <Paper className={classes.loginPaper} elevation={3}>
              <div className={classes.container}>
                <img
                  src={process.env.PUBLIC_URL + '/images/sig-blk-en.svg'}
                  alt=""
                  className={classes.loginLogo}
                />
                <span className="screen-reader-text">
                  Government of Canada /{' '}
                  <span lang="fr">Gouvernement du Canada</span>
                </span>
                <Typography variant="h6" className={classes.loginHeader}>
                  {t('Create account')}
                </Typography>
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <TextField
                  id="f-name"
                  label={t('First name')}
                  variant="outlined"
                  value={state.fName}
                  className={classes.loginTextfield}
                  margin="dense"
                  error={Boolean(state.fNameErr)}
                  helperText={state.fNameErr}
                  onChange={handleChange('fName')}
                  autoComplete="given-name"
                />
                <TextField
                  id="l-name"
                  label={t('Last name')}
                  variant="outlined"
                  value={state.lName}
                  className={classes.loginTextfield}
                  margin="dense"
                  error={Boolean(state.lNameErr)}
                  helperText={state.lNameErr}
                  onChange={handleChange('lName')}
                  autoComplete="family-name"
                />
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <TextField
                  id="email"
                  label={t('Email')}
                  variant="outlined"
                  value={state.email}
                  className={classes.loginTextfield}
                  margin="dense"
                  error={Boolean(state.emailErr)}
                  helperText={state.emailErr}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <FormGroup>
                  <FormControl
                    variant="outlined"
                    className={classes.loginTextfield}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      className={classes.loginPasswordLabel + ' ' + classes.loginInputLabel}
                      error={Boolean(state.pWordErr)}
                    >
                      {t('Password')}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={state.showPassword ? 'text' : 'password'}
                      value={state.password}
                      onChange={handleChange('password')}
                      autoComplete="new-password"
                      margin="dense"
                      error={Boolean(state.pWordErr)}
                      inputProps={{
                        'aria-describedby': `${
                          state.pWordErr
                            ? 'passwordHelperErr'
                            : 'passwordHelper'
                        }`,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={t('toggle password visibility')}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    {state.pWordErr && (
                      <Typography
                        id="passwordHelperErr"
                        className={classes.helperText}
                        component="span"
                        variant="caption"
                        color="error"
                      >
                        {state.pWordErr}
                      </Typography>
                    )}
                    {!state.pWordErr && (
                      <Typography
                        id="passwordHelper"
                        className={classes.helperText}
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {t('Use 8 or more characters with a mix of letter, numbers and symbols.')}
                      </Typography>
                    )}
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className={classes.loginTextfield}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password-2"
                      className={classes.loginPasswordLabel + ' ' + classes.loginInputLabel}
                      error={Boolean(state.pWordConfErr)}
                    >
                      {t('Confirm password')}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-2"
                      type={state.showConfPassword ? 'text' : 'password'}
                      value={state.confPassword}
                      onChange={handleChange('confPassword')}
                      autoComplete="new-password"
                      margin="dense"
                      error={Boolean(state.pWordConfErr)}
                      inputProps={
                        state.pWordConfErr
                          ? {
                            'aria-describedby': 'passwordConfHelperErr',
                          }
                          : {}
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={t('toggle password visibility')}
                            onClick={handleClickShowConfPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {state.showConfPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    {state.pWordConfErr && (
                      <Typography
                        id="passwordConfHelperErr"
                        className={classes.helperText}
                        component="span"
                        variant="caption"
                        color="error"
                      >
                        {state.pWordConfErr}
                      </Typography>
                    )}
                  </FormControl>
                </FormGroup>
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <Grid justify="space-between" container>
                  <Grid item className={classes.loginInput}>
                    <Typography className={classes.loginLink}>
                      <Button
                        component={RouterLink}
                        to="/sign-in"
                        color="primary"
                        className="btn-edge-start"
                      >
                        {t('Sign in instead')}
                      </Button>
                    </Typography>
                  </Grid>
                  <Grid item className={classes.loginInput}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      {t('Next')}
                    </Button>
                  </Grid>
                </Grid>
              </div>
              {isXsScreen && <Divider className={classes.loginDivider} />}
            </Paper>
          ) : (
            <Paper className={classes.loginPaper} elevation={3}>
              <div className={classes.container}>
                <img
                  src={process.env.PUBLIC_URL + '/images/sig-blk-en.svg'}
                  alt=""
                  className={classes.loginLogo}
                />
                <span className="screen-reader-text">
                  Government of Canada /{' '}
                  <span lang="fr">Gouvernement du Canada</span>
                </span>
                <Typography
                  variant="h6"
                  component="h1"
                  className={classes.loginHeader}
                >
                  {t('Email sent')}
                </Typography>
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <Typography variant="body2" className={classes.bodyText}>
                  {t('An email was sent to peter.parker@gmail.com. Check your email to verify that your account was created.')}
                </Typography>
              </div>
              <Divider className={classes.loginDivider} />
              <div className={classes.container}>
                <Grid justify="space-between" container>
                  <Grid item className={classes.loginInput}>
                    <Typography className={classes.loginLink}>
                      <Button
                        component={RouterLink}
                        to="/sign-in"
                        color="primary"
                        className="btn-edge-start"
                      >
                        {t('Sign in instead')}
                      </Button>
                    </Typography>
                  </Grid>
                  <Grid item className={classes.loginInput}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to="/sign-in"
                    >
                      {t('Done')}
                    </Button>
                  </Grid>
                </Grid>
              </div>
              {isXsScreen && <Divider className={classes.loginDivider} />}
            </Paper>
          )}
        <LoginFooter />
      </Grid>
    </Grid>
  );
}

export default withRouter(CreateAccountPage);
