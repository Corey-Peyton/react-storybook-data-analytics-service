import React from 'react';
import {Grid, Chip, Typography} from '@material-ui/core';

function AppBarUnAssign() {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Chip label="DISCLOSURE ANALYSIS" className="mr-2" />
        </Grid>
        <Grid item>
          <Typography variant="body2">Unassigned</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default AppBarUnAssign;

