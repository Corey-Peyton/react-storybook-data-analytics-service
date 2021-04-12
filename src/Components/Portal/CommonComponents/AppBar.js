import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar} from '@material-ui/core';
import BrandingStatCan from './BrandingStatCan';

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
}));

function RequestToolbar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <div className={classes.branding}>
          <BrandingStatCan />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default RequestToolbar;
