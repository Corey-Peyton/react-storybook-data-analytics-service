import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Email from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
}));

export default function FloatingActionButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" variant="extended" aria-label="support" size="large">
        <Email className={classes.extendedIcon}/>Get support
      </Fab>
    </div>
  );
}
