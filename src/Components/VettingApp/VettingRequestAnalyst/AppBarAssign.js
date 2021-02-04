import React from 'react';
import {Grid, Chip, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  upperCase: {
    textTransform: 'uppercase',
    marginRight: '16px',
  },
}));

function AppBarUnAssign() {
  const classes = useStyles();
  const [state] = React.useState({
    title: 'New vetting request',
  });
  return (
    <Grid container alignItems="center">
      <Grid item className={classes.title}>
        <Typography variant="h6" component="h2">{state.title}</Typography>
        <Typography variant="caption" color="textSecondary">
                ID: 10_2020_232425255
        </Typography>
      </Grid>
      <Grid item>
        <Chip label="Disclosure Analysis" className={classes.upperCase} />
      </Grid>
      <Grid item>
        <Typography variant="body2">Unassigned</Typography>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;

