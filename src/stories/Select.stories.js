import React from 'react';
import {Select, FormControl, InputLabel, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  width: {
    width: 200,
  },
}));

export default {
  title: 'Molecules/Selects',
  component: Select,
};

export const OutlinedSelect = (args) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    fullWidth: '',
    reg: '',
    multiple: [],
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  };

  return (
    <div className={classes.container}>
      <FormControl className="input-margin">
        <InputLabel id="fullWidth-label">Full width</InputLabel>
        <Select
          labelId="fullWidth-label"
          id="fullWidth"
          value={state.fullWidth}
          onChange={handleChange}
          label="Full width"
          name="fullWidth"
        >
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        fullWidth={false}
        className={`input-margin ${classes.width}`}
      >
        <InputLabel id="reg-label">Set width</InputLabel>
        <Select
          labelId="reg-label"
          id="reg"
          value={state.reg}
          onChange={handleChange}
          label="Set width"
          name="reg"
        >
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
