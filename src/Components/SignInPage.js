import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {XS_SCREEN} from '../Theme/constants';
import LoginFooter from './Footers/LoginFooter';


const useStyles = makeStyles((theme) => ({
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
  checkBoxMargins: {
    marginTop: theme.spacing(2),
  },
  loginLogo: {
    height: '24px',
    [theme.breakpoints.down('xs')]: {
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
  loginWrapper: {
    background: theme.palette.grey[100],
    display: 'table',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
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
}));

function SignInPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    email: '',
    password: '',
    emailErr: '',
    pWordErr: '',
    showPassword: false,
    checked: false,
    windowWidth: window.innerWidth,
  });

  const isXsScreen = state.windowWidth < XS_SCREEN;

  const handleChange = (prop) => (event) => {
    setState({...state, [prop]: event.target.value});
  };

  const handleCheckedChange = (event) => {
    setState({...state, checked: event.target.checked});
  };

  const handleClickShowPassword = () => {
    setState({...state, showPassword: !state.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    document.title = t('DAaaS - Login');
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state, t]);

  const validate = () => {
    let isError = false;
    const errors = {
      emailErr: '',
      pWordErr: '',
    };
    if (state.email === '') {
      isError = true;
      errors.emailErr = t('Enter an email.');
    }
    if (state.password === '') {
      isError = true;
      errors.pWordErr = t('Enter a password.');
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
      props.history.push({pathname: '/home'});
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
              {t('Sign in')}
            </Typography>
          </div>
          <Divider className={classes.loginDivider} />
          <div className={classes.container}>
            <TextField
              id="email"
              label={t('Email')}
              error={Boolean(state.emailErr)}
              helperText={state.emailErr}
              value={state.email}
              variant="outlined"
              className={classes.loginTextfield}
              margin="dense"
              onChange={handleChange('email')}
              autoComplete="email"
            />
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
                  autoComplete="current-password"
                  margin="dense"
                  error={Boolean(state.pWordErr)}
                  inputProps={
                    state.pWordErr
                      ? {
                        'aria-describedby': 'passwordHelperErr',
                      }
                      : {}
                  }
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
              </FormControl>
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
            </FormGroup>
            <Grid justify="space-between" alignItems="center" container>
              <Grid item className={classes.checkBoxMargins}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checked}
                      onChange={handleCheckedChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">{t('Keep me signed in')}</Typography>
                  }
                />
              </Grid>
              <Grid item className={classes.checkBoxMargins}>
                <Typography>
                  <Button
                    component={RouterLink}
                    to="/sign-in/verify-identity"
                    color="primary"
                    className="btn-edge-end"
                  >
                    {t('Forgot password?')}
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.checkBoxMargins} />
          <div className={classes.container}>
            <Grid
              justify="space-between"
              alignItems="center"
              container
              className={classes.loginInput}
            >
              <Grid item>
                <Typography>
                  <Button
                    component={RouterLink}
                    to="/sign-in/create-account"
                    color="primary"
                    className="btn-edge-start"
                  >
                    {t('Create account')}
                  </Button>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  {t('Sign in')}
                </Button>
              </Grid>
            </Grid>
          </div>
          {isXsScreen && <Divider className={classes.loginDivider} />}
        </Paper>
        <LoginFooter />
      </Grid>
    </Grid>
  );
}

export default withRouter(SignInPage);
