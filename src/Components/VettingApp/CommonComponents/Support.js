import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Email from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'absolute',
      left: '88%',
      top: '50%',
    },
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
}));

export default function FloatingSupportButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" variant="extended" aria-label="support" size="medium">
        <Email className={classes.extendedIcon}/>Get support
      </Fab>
    </div>
  );
}
