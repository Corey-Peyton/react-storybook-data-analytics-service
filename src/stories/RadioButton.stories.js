import React from 'react';
import {RadioButtons} from '../Components/CommonComponents/RadioButton';
import {Radio} from '@material-ui/core';

export default {
  title: 'Molecules/RadioButtons',
  component: RadioButtons,
};

export const AllRadioButtons = (args) => {
  return (
    <>
      <Radio value="a" name="radio-buttons" />
      <Radio
        value="b"
        name="radio-buttons"
      />
    </>
  );
};
