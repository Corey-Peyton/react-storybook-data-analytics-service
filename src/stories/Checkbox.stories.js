import React from 'react';
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';
// import {makeStyles} from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({}));

export default {
  title: 'Molecules/Checkboxes',
  component: FormGroup,
  argTypes: {},
};

// TODO: other versions:
// With helper text on entire group
// With helper text on each option

export const Default = (args) => {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={state.gilad}
                onChange={handleChbxChange}
                name="gilad"
              />
            }
            label="Gilad Gray Gilad Gray Gilad Gray Gilad Gray Gilad Gray Gilad Gray Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={state.jason}
                onChange={handleChbxChange}
                name="jason"
              />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={state.antoine}
                onChange={handleChbxChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
