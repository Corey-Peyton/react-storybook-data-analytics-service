import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {
  Button,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {XS_SCREEN} from '../../Theme/constants';
import CenteredFooter from '../Footers/CenteredFooter';

// import ReactDOM from 'react-dom';

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
    paddingRight: '6px',
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
      '&>.MuiGrid-item': {
        width: '100%',
      },
    },
  },
  loginContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  loginBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function ForgotPassword(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    screen1: true,
    screen2: false,
    screen3: false,
    email: '',
    password: '',
    pWordLabelWidth: 0,
    confPassword: '',
    pWordConfLabelWidth: 0,
    emailErr: '',
    pWordErr: '',
    pWordConfErr: '',
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
    document.title = t('DAaaS - Verify identity');
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state, state.screen3, t]);

  const validateEmail = () => {
    let isError = false;
    const errors = {
      emailErr: '',
    };
    if (state.email === '') {
      isError = true;
      errors.emailErr = t('Enter an email.');
    }

    if (isError) {
      setState({
        ...state,
        ...errors,
      });
    }
    return isError;
  };

  const validatePasswords = () => {
    let isError = false;
    const errors = {
      pWordErr: '',
      pWordConfErr: '',
    };
    if (state.password === '') {
      isError = true;
      errors.pWordErr = t('Enter a password.');
    } else if (
      !state.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
      )
    ) {
      isError = true;
      errors.pWordErr = t(
          'Choose a stronger password. Use 8 or more characters with a mix of letters, numbers and symbols.',
      );
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

  const submitEmail = () => {
    const err = validateEmail();
    if (!err) {
      setState({...state, screen1: !state.screen1, screen2: !state.screen2});
      document.getElementById('root').setAttribute('tabindex', -1);
      document.getElementById('root').focus();
    }
  };

  const checkedEmail = () => {
    setState({...state, screen2: !state.screen2, screen3: !state.screen3});
    document.getElementById('root').focus();
  };

  const submitPasswords = () => {
    const err = validatePasswords();
    if (!err) {
      props.history.push({pathname: '/home'});
      document.getElementById('root').removeAttribute('tabindex');
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
              <Typography
                variant="h6"
                component="h1"
                className={classes.loginHeader}
              >
                {t('Verify identity')}
              </Typography>
            </div>
            <Divider className={classes.loginDivider} />
            <div className={classes.container}>
              <TextField
                id="email"
                label={t('Email')}
                variant="outlined"
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
              <Grid justify="space-between" alignItems="center" container>
                <Grid item className={classes.loginInput}>
                  <Typography>
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
                    onClick={() => submitEmail()}
                  >
                    {t('Next')}
                  </Button>
                </Grid>
              </Grid>
            </div>
            {isXsScreen && <Divider className={classes.loginDivider} />}
          </Paper>
        ) : state.screen2 ? (
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
                id="email-sent-header"
              >
                {t('Email sent')}
              </Typography>
            </div>
            <Divider className={classes.loginDivider} />
            <div className={classes.container}>
              <Typography variant="body2" className={classes.bodyText}>
                {t(
                    'An email was sent to peter.parker@gmail.com. Check your email to change your password.',
                )}
              </Typography>
            </div>
            <Divider className={classes.loginDivider} />
            <div className={classes.container + ' ' + classes.loginBtns}>
              <Typography className={classes.loginInput}>
                <Button
                  component={RouterLink}
                  to="/sign-in"
                  color="primary"
                  className="btn-edge-start"
                >
                  {t('Sign in instead')}
                </Button>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.loginInput}
                onClick={() => checkedEmail()}
              >
                {t('Done')}
              </Button>
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
                {t('Change password')}
              </Typography>
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
                    className={
                      classes.loginPasswordLabel + ' ' + classes.loginInputLabel
                    }
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
                        state.pWordErr ? 'passwordHelperErr' : 'passwordHelper'
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
                {!state.pWordErr && (
                  <Typography
                    id="passwordHelper"
                    className={classes.helperText}
                    component="span"
                    variant="caption"
                    color="textSecondary"
                  >
                    {t(
                        'Use 8 or more characters with a mix of letter, numbers and symbols.',
                    )}
                  </Typography>
                )}
                <FormControl
                  variant="outlined"
                  className={classes.loginTextfield}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password-2"
                    className={
                      classes.loginPasswordLabel + ' ' + classes.loginInputLabel
                    }
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
                      state.pWordConfErr ?
                        {
                          'aria-describedby': 'passwordConfHelperErr',
                        } :
                        {}
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
                </FormControl>
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
              </FormGroup>
            </div>
            <Divider className={classes.loginDivider} />
            <div className={classes.container + ' ' + classes.loginBtns}>
              <Typography className={classes.loginInput}>
                <Button
                  component={RouterLink}
                  to="/sign-in"
                  color="primary"
                  className="btn-edge-start"
                >
                  {t('Sign in instead')}
                </Button>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={submitPasswords}
                className={classes.loginInput}
              >
                {t('Done')}
              </Button>
            </div>
            {isXsScreen && <Divider className={classes.loginDivider} />}
          </Paper>
        )}
        <CenteredFooter />
      </Grid>
    </Grid>
  );
}

export default withRouter(ForgotPassword);
