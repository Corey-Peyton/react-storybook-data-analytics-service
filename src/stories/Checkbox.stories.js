import React from 'react';
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';

export default {
  title: 'Molecules/Checkboxes',
  component: FormGroup,
  argTypes: {},
};

export const Default = (args) => {
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
            label="Gilad Gray"
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

export const HelperText = (args) => {
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
        <FormHelperText>Select all that apply</FormHelperText>
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
            label={
              <>
                <Typography variant="body2">Gilad Gray</Typography>
                <Typography variant="caption">Description text</Typography>
              </>
            }
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
            label={
              <>
                <Typography variant="body2">Jason Killian</Typography>
                <Typography variant="caption">Description text</Typography>
              </>
            }
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
            label={
              <>
                <Typography variant="body2">Antoine Llorca</Typography>
                <Typography variant="caption">Description text</Typography>
              </>
            }
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export const Error = (args) => {
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
      <FormControl component="fieldset" error={true}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormHelperText>Error text</FormHelperText>
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
            label="Gilad Gray"
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

export const Individual = (args) => {
  const [state, setState] = React.useState({
    terms: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend" className="screen-reader-text">
          Select if you agree
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.terms}
                onChange={handleChbxChange}
                name="terms"
                color="primary"
                required
              />
            }
            label="I agree to the Terms and conditions and Privacy policy"
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export const IndividualError = (args) => {
  const [state, setState] = React.useState({
    terms: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };
  return (
    <>
      <FormControl component="fieldset" error={true}>
        <FormLabel component="legend" className="screen-reader-text">
          Select if you agree
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.terms}
                onChange={handleChbxChange}
                name="terms"
                color="primary"
                required
                error={true}
              />
            }
            label={
              <>
                <Typography variant="body2">
                  I agree to the Terms and conditions and Privacy policy
                </Typography>
                <FormHelperText>Error text</FormHelperText>
              </>
            }
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
