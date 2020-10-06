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
        A brief introduction is needed to explain to external users why on this
        section it is important to provide as much details as possible.
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
        helperText="Add additional information which may helpful to the disclosure analyst."
        fullWidth
      />
    </React.Fragment>
  );
}

export default AdditionalInfo;
