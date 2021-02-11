import React from 'react';
import {Grid, Chip, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  assignee: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Assignee(props) {
  // No analysts assigned
  if (props.lead === '' && props.support.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        Unassigned
      </Typography>
    );
    // Only lead analyst assigned
  } else if (props.lead !== '' && props.support.length === 0) {
    return <Chip label={props.lead} onClick={props.handleDialogOpen} />;
    // Only support analysts assigned
  } else if (props.lead === '' && props.support.length !== 0) {
    return (
      <>
        <Typography variant="body2" color="textSecondary">No lead</Typography>
        <Chip
          label={`${props.support.length} support`}
          onClick={props.handleDialogOpen}
          className="ml-1"
        />
      </>
    );
    // Both load and support analysts assigned
  } else {
    return (
      <>
        <Chip label={props.lead} onClick={props.handleDialogOpen} />
        <Chip
          label={`${props.support.length} support`}
          onClick={props.handleDialogOpen}
          className="ml-1"
        />
      </>
    );
  }
}

function AppBarUnAssign(props) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item className={classes.title}>
        <Typography variant="h6" color="textSecondary">
        Vetting request · ID 0101-000000
        </Typography>
        <Typography variant="h6" component="h2">
          {props.title}
        </Typography>
      </Grid>
      <Grid item>
        <Chip label="Disclosure Analysis" className={`${classes.upperCase} mr-1`} />
      </Grid>
      <Grid item className={classes.assignee}>
        <Assignee {...props} />
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
