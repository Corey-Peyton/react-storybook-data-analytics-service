import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {Button, Divider, Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {XS_SCREEN} from '../Theme/constants';
import LoginFooter from './Footers/LoginFooter';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 1),
  },
  splashDivider: {
    marginTop: theme.spacing(3),
  },
  splashLogo: {
    height: '24px',
    [theme.breakpoints.down('xs')]: {
      height: '20px',
    },
  },
  splashPaper: {
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
  splashWrapper: {
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
  splashContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  splashBtns: {
    'marginTop': theme.spacing(3),
    'width': '48%',
    '& > .MuiButton-root': {
      width: '100%',
    },
  },
}));

function SplashPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });

  const isXsScreen = state.windowWidth < XS_SCREEN;

  React.useEffect(() => {
    document.title = t('DAaaS');
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state, t]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.splashWrapper}
    >
      <Grid item className={classes.splashContent}>
        <Paper className={classes.splashPaper} elevation={3}>
          <div className={classes.container}>
            <img
              src={process.env.PUBLIC_URL + '/images/sig-blk-en.svg'}
              alt=""
              className={classes.splashLogo}
            />
            <span className="screen-reader-text">
              Government of Canada /{' '}
              <span lang="fr">Gouvernement du Canada</span>
            </span>
          </div>
          <Divider className={classes.splashDivider} />
          <div className={classes.container}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item className={classes.splashBtns}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/home"
                >
                English
                </Button>
              </Grid>
              <Grid item className={classes.splashBtns}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/home"
                >
                  Français
                </Button>
              </Grid>
            </Grid>
          </div>
          {isXsScreen && <Divider className={classes.splashDivider} />}
        </Paper>
        <LoginFooter />
      </Grid>
    </Grid>
  );
}

export default withRouter(SplashPage);
