import React from 'react';
import {Grid, Chip} from '@material-ui/core';
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

function AppBarUnAssign(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Chip label="DISCLOSURE ANALYSIS" className={classes.upperCase} />
        </Grid>
        <Grid item>
          <Chip label="brian.bill@cloud.statcan.ca" className="mr-2" onClick={props.handleDialogOpen} />
        </Grid>
        <Grid item>
          <Chip label="+2" className="mr-2" />
        </Grid>
      </Grid>
    </div>
  );
}

export default AppBarUnAssign;

