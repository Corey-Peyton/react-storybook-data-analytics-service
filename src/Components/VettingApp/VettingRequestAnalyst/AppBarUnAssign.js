import React from 'react';
import {Grid, Chip} from '@material-ui/core';

function AppBarUnAssign(props) {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Chip label="DISCLOSURE ANALYSIS" className="mr-2" />
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

