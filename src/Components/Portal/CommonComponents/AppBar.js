import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar as MUIAppBar,
  Toolbar,
  Grid,
  Button,
  Divider,
  Breadcrumbs,
  Typography,
  MenuItem,
  ListItemText,
  // Link,
} from '@material-ui/core';
import {SM_SCREEN} from '../../../Theme/constants';
import {BrandingStatCanEn} from './BrandingStatCan';
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
    height: theme.spacing(3),
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
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });
  const [open, setOpen] = React.useState({
    helpDrawer: false,
    feedbackDialog: false,
    menuAnchor: null,
  });

  const toggleDialog = (element, value) => {
    setOpen({...open, [element]: value});
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

  const openMenu = (event, element) => {
    setOpen({...open, [element]: event.currentTarget});
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
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="1">
        <ListItemText
          primary={<Typography variant="body2">{t('Profile')}</Typography>}
        />
      </MenuItem>,
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="2">
        <ListItemText
          primary={<Typography variant="body2">{t('Sign out')}</Typography>}
        />
      </MenuItem>,
    ];
  };

  const mobileMenuItems = () => {
    return [
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="3">
        <ListItemText
          primary={
            <Typography variant="body2">{t('AAW Dashboard')}</Typography>
          }
        />
      </MenuItem>,
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="4">
        <ListItemText
          primary={
            <Typography variant="body2">{t('CAE Dashboard')}</Typography>
          }
        />
      </MenuItem>,
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="5">
        <ListItemText
          primary={<Typography variant="body2">{t('Help')}</Typography>}
        />
      </MenuItem>,
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="6">
        <ListItemText
          primary={<Typography variant="body2">{t('Feedback')}</Typography>}
        />
      </MenuItem>,
      <MenuItem onClick={() => closeMenu('menuAnchor')} key="7">
        <ListItemText
          primary={
            <Typography variant="body2">
              <span lang="fr">Français</span>
            </Typography>
          }
        />
      </MenuItem>,
    ];
  };

  return (
    <>
      <MUIAppBar className={classes.appBar} color="default">
        <Toolbar component="nav">
          <Grid container justify="space-between" alignItems="center">
            <Grid item className={classes.branding}>
              <BrandingStatCanEn />
            </Grid>
            {!isSmScreen && (
              <Grid item className={classes.actions}>
                <ul className="list-horizontal">
                  <li>
                    <Button
                      className={classes.textBtn}
                      variant="text"
                      startIcon={<Icon path={mdiHelpCircle} size={1} />}
                      onClick={() => openDrawer('helpDrawer')}
                    >
                      {t('Help')}
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="text"
                      startIcon={<Icon path={mdiMessageAlert} size={1} />}
                      onClick={() =>
                        toggleDialog('feedbackDialog', !open.feedbackDialog)
                      }
                    >
                      {t('Feedback')}
                    </Button>
                  </li>
                </ul>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        <Toolbar component="nav">
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb" className="mb-0">
                {/* <Link
                  color="inherit"
                  href="https://www.statcan.gc.ca/eng/start"
                >
                  Statistics Canada
                </Link> */}
                <Typography>
                  {t('About Data Analytics as a Service')}
                </Typography>
              </Breadcrumbs>
            </Grid>
            {isSmScreen ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                  endIcon={<Icon path={mdiMenuDown} size={1} />}
                  onClick={(e) => openMenu(e, 'menuAnchor')}
                >
                  {t('Menu')}
                </Button>
                <Menu
                  id="mobile-menu"
                  open={Boolean(open.menuAnchor)}
                  anchorEl={open.menuAnchor}
                  content={[mobileMenuItems(), accountMenuItems()]}
                  handleClose={() => closeMenu('menuAnchor')}
                />
              </>
            ) : (
              <Grid item className={classes.actions}>
                <ul className="list-horizontal">
                  <li>
                    <Button
                      className={classes.textBtn}
                      variant="text"
                      startIcon={<Icon path={mdiApps} size={1} />}
                    >
                      {t('AAW dashboard')}
                    </Button>
                  </li>
                  <li>
                    <Button
                      className={classes.headerBtn}
                      variant="text"
                      startIcon={<Icon path={mdiApps} size={1} />}
                    >
                      {t('CAE dashboard')}
                    </Button>
                  </li>
                </ul>
                <Divider orientation="vertical" flexItem className="mr-2" />
                <Button className={classes.headerBtn} variant="text">
                  <span lang="fr">Français</span>
                </Button>
                {props.auth ? (
                  <>
                    <Button
                      variant="text"
                      color="primary"
                      aria-controls="account-menu"
                      aria-haspopup="true"
                      aria-label={t('Account menu')}
                      endIcon={<Icon path={mdiMenuDown} size={1} />}
                      onClick={(e) => openMenu(e, 'menuAnchor')}
                    >
                      {props.username}
                    </Button>
                    <Menu
                      id="account-menu"
                      open={Boolean(open.menuAnchor)}
                      anchorEl={open.menuAnchor}
                      content={accountMenuItems()}
                      handleClose={() => closeMenu('menuAnchor')}
                    />
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon path={mdiAccountCircle} size={1} />}
                  >
                    {t('Sign in')}
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
