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
  MenuItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {SM_SCREEN} from '../../../Theme/constants';
import BrandingStatCan from './BrandingStatCan';
import {HelpDrawer, FeedbackDialog} from './Dialogs';
import Icon from '@mdi/react';
import {
  mdiApps,
  mdiHelpCircle,
  mdiMessageAlert,
  mdiAccountCircle,
  mdiMenuDown,
} from '@mdi/js';
import {Menu} from '../../CommonComponents/Menu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1200,
    backgroundColor: theme.palette.common.white,
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
    feedbackDialog: false,
    accountMenuAnchor: null,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDialog = (state, value) => {
    setOpen({...open, [state]: value});
  };

  const openDrawer = (element) => {
    setOpen({...open, [element]: true});
  };

  const closeDrawer = (element) => {
    setOpen({...open, [element]: false});
  };
  const isSmScreen = state.windowWidth < SM_SCREEN;

  const closeMenu = (element) => {
    setOpen({...open, [element]: null});
  };

  const openMenu = (event) => {
    // setOpen({...open, [element]: event.currentTarget});
    setAnchorEl(event.currentTarget);
  };

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

  const accountMenuItems = () => {
    return [
      <MenuItem key="1" onClick={() => closeMenu('accountMenuAnchor')}>
        <ListItemText primary={<Typography>Profile</Typography>} />
      </MenuItem>,
      <MenuItem key="2" onClick={() => closeMenu('accountMenuAnchor')}>
        <ListItemText primary={<Typography>Sign out</Typography>} />
      </MenuItem>,
    ];
  };

  return (
    <>
      <MUIAppBar className={classes.appBar} color="default">
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
                  onClick={() =>
                    toggleDialog('feedbackDialog', !open.feedbackDialog)
                  }
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
                  <>
                    <Button
                      variant="text"
                      color="primary"
                      aria-controls="account-menu"
                      aria-haspopup="true"
                      aria-label="Account menu"
                      endIcon={<Icon path={mdiMenuDown} size={1} />}
                      onClick={openMenu}
                    >
                      {props.username}
                    </Button>
                    <Menu
                      id="account-menu"
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      content={accountMenuItems()}
                      handleClose={() => closeMenu('accountMenuAnchor')}
                      anchorVertical="bottom"
                      anchorHorizontal="right"
                      transformVertical="top"
                      transformHorizontal="right"
                    />
                  </>
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
      {/* Feedback dialog */}
      <FeedbackDialog
        open={open.feedbackDialog}
        toggleDialog={() =>
          toggleDialog('feedbackDialog', !open.feedbackDialog)
        }
      />
    </>
  );
}

export default AppBar;
