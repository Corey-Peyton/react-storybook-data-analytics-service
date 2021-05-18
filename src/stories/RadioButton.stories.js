import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';

export default {
  title: 'Molecules/RadioButtons',
  component: RadioGroup,
  argTypes: {},
};

export const Group = (args) => {
  const [state, setState] = React.useState({
    gender: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <FormHelperText>Helper text</FormHelperText>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={state.gender}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Female</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Male</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Other</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">(Disabled option)</Typography>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export const GroupError = (args) => {
  const [state, setState] = React.useState({
    gender: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <FormControl component="fieldset" error={!state.gender}>
        <FormLabel component="legend">Gender</FormLabel>
        <FormHelperText>Error text</FormHelperText>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={state.gender}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Female</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Male</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">Other</Typography>
                <Typography variant="caption" component="p">
                  Helper text
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio color="primary" />}
            label={
              <>
                <Typography variant="body2">(Disabled option)</Typography>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
GroupError.storyName = 'Group - Error';
