import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

function SecurityGroup(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={8}>
        <FormControl component="fieldset" className={classes.inputMargin}>
          <FormLabel component="legend">Environment</FormLabel>
          <RadioGroup
            aria-label="environment"
            name="radio-buttons-group"
            color="primary"
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="VDL"
            />
            <FormControlLabel
              value="Prerelease"
              control={<Radio color="primary" />}
              label="Prerelease"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}

export default SecurityGroup;
