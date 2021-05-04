import React from 'react';
import {suggestions} from '../../Data/fakeData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from '@material-ui/core';
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
}));

function SecurityGroup(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <Autocomplete
          id="securitygroupname"
          options={suggestions.map((option) => option.subject)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Security group name"
              className={classes.inputMargin}
              variant="outlined"
            />
          )}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SecurityGroup;
