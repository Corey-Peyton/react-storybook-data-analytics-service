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

export const Group = (args) => {
  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  return (
    <>
      <FormControl component="fieldset" fullWidth={true}>
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
                <Typography variant="caption">Helper text</Typography>
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
                <Typography variant="caption">Helper text</Typography>
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
                <Typography variant="caption">Helper text</Typography>
              </>
            }
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export const GroupError = (args) => {
  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const {gilad, jason, antoine} = state;
  const error = [gilad, jason, antoine].filter((v) => v).length === 0;

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  return (
    <>
      <FormControl component="fieldset" error={error} fullWidth={true}>
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
            label={
              <>
                <Typography variant="body2">Gilad Gray</Typography>
                <Typography variant="caption">Helper text</Typography>
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
                <Typography variant="caption">Helper text</Typography>
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
                <Typography variant="caption">Helper text</Typography>
              </>
            }
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
GroupError.storyName = 'Group - Error';

export const Individual = (args) => {
  const [state, setState] = React.useState({
    terms: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };
  return (
    <>
      <FormControl component="fieldset" fullWidth={true}>
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
            label={
              <>
                <Typography variant="body2">
                  I agree to the Terms and conditions and Privacy policy
                </Typography>
                <Typography variant="caption">Helper text</Typography>
              </>
            }
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
      <FormControl component="fieldset" error={!state.terms} fullWidth={true}>
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
IndividualError.storyName = 'Individual - Error';
