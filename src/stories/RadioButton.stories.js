import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';
// import {makeStyles} from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({}));

export default {
  title: 'Molecules/RadioButtons',
  component: RadioGroup,
  argTypes: {},
};

export const Default = (args) => {
  // const classes = useStyles();
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
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={state.gender}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female Female Female Female Female Female Female Female Female Female Female Female Female Female Female Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label="Other"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
