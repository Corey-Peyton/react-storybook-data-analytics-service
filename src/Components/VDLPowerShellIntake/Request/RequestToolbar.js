import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Toolbar, Grid, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: theme.spacing(0, -3),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
}));

function RequestToolbar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <Grid container justify="space-between">
          <Typography className="mt-1">
            VDL PowerShell Intake Request
          </Typography>
          <Grid>
            <Button
              className={classes.headerBtn}
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/VDLPowerShellIntake/"
            >
              New request
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default RequestToolbar;
