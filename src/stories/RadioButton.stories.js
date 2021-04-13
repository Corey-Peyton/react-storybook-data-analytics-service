import React from 'react';
import {RadioButtons} from '../Components/CommonComponents/RadioButton';
import {Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default {
  title: 'Molecules/RadioButtons',
  component: RadioButtons,
};

export const AllRadioButtons = (args) => {
  return (
    <>
      <FormControl component="fieldset" className="m-1">
        <FormLabel component="legend">Vertical radiogroup</FormLabel>
        <RadioGroup
          aria-label="numbers"
          name="radio-buttons-group"
        >
          <FormControlLabel value="1" control={<Radio />} label="1" checked/>
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className="m-1">
        <FormLabel component="legend">Horizontal radiogroup</FormLabel>
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" checked/>
          <FormControlLabel value="3" control={<Radio />} label="3" />
        </RadioGroup>
      </FormControl>
    </>
  );
};
