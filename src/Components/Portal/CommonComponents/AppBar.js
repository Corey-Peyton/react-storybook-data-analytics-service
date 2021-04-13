import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar as MUIAppBar,
  Toolbar,
  Grid,
  Button,
  Divider,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import {SM_SCREEN} from '../../../Theme/constants';
import BrandingStatCan from './BrandingStatCan';
import {HelpDrawer} from './Dialogs';
import Icon from '@mdi/react';
import {
  mdiApps,
  mdiHelpCircle,
  mdiMessageAlert,
  mdiAccountCircle,
  mdiMenuDown,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: theme.spacing(0, -3),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  branding: {
    '& img': {
      height: theme.spacing(3),
    },
  },
  textBtn: {
    marginRight: theme.spacing(1),
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function AppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });
  const [open, setOpen] = React.useState({
    helpDrawer: false,
  });

  const openDrawer = (element) => {
    setOpen({...open, [element]: true});
  };

  const closeDrawer = (element) => {
    setOpen({...open, [element]: false});
  };
  const isSmScreen = state.windowWidth < SM_SCREEN;

  React.useEffect(() => {
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state]);

  return (
    <>
      <MUIAppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item className={classes.branding}>
              <BrandingStatCan />
            </Grid>
            {!isSmScreen && (
              <Grid item className={classes.actions}>
                <Button
                  className={classes.textBtn}
                  variant="text"
                  startIcon={<Icon path={mdiHelpCircle} size={1} />}
                  onClick={() => openDrawer('helpDrawer')}
                >
                  Help
                </Button>
                <Button
                  variant="text"
                  startIcon={<Icon path={mdiMessageAlert} size={1} />}
                  // onClick={() => handleClickOpen('snackbarReactivate')}
                >
                  Feedback
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb" className="mb-0">
                <Link
                  color="inherit"
                  href="https://www.statcan.gc.ca/eng/start"
                >
                  Statistics Canada
                </Link>
              </Breadcrumbs>
            </Grid>
            {isSmScreen ? (
              <Button
                className={classes.textBtn}
                variant="outlined"
                color="primary"
                // onClick={() => handleClickOpen('snackbarReactivate')}
              >
                Menu
              </Button>
            ) : (
              <Grid item className={classes.actions}>
                <Button
                  className={classes.textBtn}
                  variant="text"
                  startIcon={<Icon path={mdiApps} size={1} />}
                  // onClick={() => handleClickOpen('snackbarReactivate')}
                >
                  AAW dashboard
                </Button>
                <Button
                  className={classes.headerBtn}
                  variant="text"
                  startIcon={<Icon path={mdiApps} size={1} />}
                  // onClick={() => handleClickOpen('snackbarReactivate')}
                >
                  CAE dashboard
                </Button>
                <Divider orientation="vertical" flexItem className="mr-2" />
                <Button
                  className={classes.headerBtn}
                  variant="text"
                  // onClick={() => handleClickOpen('snackbarReactivate')}
                >
                  Français
                </Button>
                {props.auth ? (
                  <Button
                    variant="text"
                    color="primary"
                    endIcon={<Icon path={mdiMenuDown} size={1} />}
                    // onClick={() => handleClickOpen('snackbarReactivate')}
                  >
                    {props.username}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon path={mdiAccountCircle} size={1} />}
                    // onClick={() => handleClickOpen('snackbarReactivate')}
                  >
                    Sign in
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </MUIAppBar>
      {/* Help drawer */}
      <HelpDrawer
        open={open.helpDrawer}
        closeDrawer={() => closeDrawer('helpDrawer')}
      />
    </>
  );
}

export default AppBar;
