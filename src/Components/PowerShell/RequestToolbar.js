import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Grid, Button} from '@material-ui/core';

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
        <Grid container justify="flex-end">
          <Grid>
            <Button
              className={classes.headerBtn}
              variant="contained"
              color="primary"
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
