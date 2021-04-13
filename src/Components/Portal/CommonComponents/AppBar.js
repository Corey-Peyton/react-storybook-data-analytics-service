import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  Divider,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import BrandingStatCan from './BrandingStatCan';
import Icon from '@mdi/react';
import {
  mdiApps,
  mdiHelpCircle,
  mdiMessageAlert,
  mdiAccountCircle,
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

function RequestToolbar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item className={classes.branding}>
            <BrandingStatCan />
          </Grid>
          <Grid item className={classes.actions}>
            <Button
              className={classes.textBtn}
              variant="text"
              startIcon={<Icon path={mdiHelpCircle} size={1} />}
              // onClick={() => handleClickOpen('snackbarReactivate')}
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
        </Grid>
      </Toolbar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb" className="mb-0">
              <Link color="inherit" href="https://www.statcan.gc.ca/eng/start">
                Statistics Canada
              </Link>
            </Breadcrumbs>
          </Grid>
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
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Icon path={mdiAccountCircle} size={1} />}
              // onClick={() => handleClickOpen('snackbarReactivate')}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default RequestToolbar;
