import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Divider, TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

function AdditionalInfo(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography>
        Use this section to add any information that you think might be helpful for the Lead analyst while reviewing your vetting request.
      </Typography>
      <Divider className={classes.divider} />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="additionalInfo"
        label="Additional information"
        multiline
        rows={2}
        variant="outlined"
        fullWidth
      />
    </React.Fragment>
  );
}

export default AdditionalInfo;
