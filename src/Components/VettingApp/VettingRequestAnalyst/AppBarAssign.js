import React from 'react';
import {Grid, Chip, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  upperCase: {
    textTransform: 'uppercase',
    marginRight: '16px',
  },
}));

function AppBarUnAssign() {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Chip label="Disclosure Analysis" className={classes.upperCase} />
        </Grid>
        <Grid item>
          <Typography variant="body2">Unassigned</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default AppBarUnAssign;

