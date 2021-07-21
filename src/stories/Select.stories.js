import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import {countries} from '../Data/countries';

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
  title: 'Lab/Selects',
  component: Select,
};

export const OutlinedSelect = (args) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    fullWidth: '',
    reg: '',
    req: '',
    ro: 10,
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        fullWidth={false}
        className={`input-margin ${classes.width}`}
        required
      >
        <InputLabel id="req-label">Required</InputLabel>
        <Select
          labelId="req-label"
          id="req"
          value={state.req}
          onChange={handleChange}
          label="Required *"
          name="req"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        fullWidth={false}
        className={`input-margin ${classes.width}`}
      >
        <InputLabel id="ro-label">Read only</InputLabel>
        <Select
          labelId="ro-label"
          id="ro"
          value={state.ro}
          onChange={handleChange}
          label="Read only"
          name="ro"
          inputProps={{readOnly: true}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export const OutlinedAutocomplete = (args) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    fullWidth: null,
    reg: null,
    req: null,
    ro: 'Canada',
  });

  return (
    <div className={classes.container}>
      <Autocomplete
        className="input-margin"
        fullWidth={true}
        id="autocomplete-full"
        options={countries}
        value={state.fullWidth}
        onChange={(event, newValue) => {
          setState({...state, fullWidth: newValue});
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-margin"
            name="autocompleteFull"
            label="Autocomplete full width"
          />
        )}
      />
      <Autocomplete
        className={`input-margin ${classes.width}`}
        fullWidth={false}
        id="autocomplete-set"
        options={countries}
        value={state.reg}
        onChange={(event, newValue) => {
          setState({...state, reg: newValue});
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-margin"
            name="autocompleteSet"
            label="Autocomplete set width"
          />
        )}
      />
      <Autocomplete
        className={`input-margin ${classes.width}`}
        fullWidth={false}
        id="autocomplete-req"
        options={countries}
        value={state.req}
        onChange={(event, newValue) => {
          setState({...state, req: newValue});
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-margin"
            name="autocompleteReq"
            label="Autocomplete required"
            required
          />
        )}
      />
      <Autocomplete
        className={`input-margin ${classes.width}`}
        fullWidth={false}
        id="autocomplete-ro"
        options={countries}
        value={state.ro}
        onChange={(event, newValue) => {
          setState({...state, ro: newValue});
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-margin"
            name="autocompleteRo"
            label="Autocomplete read only"
            InputProps={{
              readOnly: true,
            }}
          />
        )}
      />
    </div>
  );
};
