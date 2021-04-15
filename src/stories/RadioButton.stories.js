import React from 'react';
import {Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default {
  title: 'Molecules/RadioButtons',
  component: Radio,
  argTypes: {
    checked: {
      description:
        'If true, the component is checked.',
    },
    checkedIcon: {
      description:
        'If true, the input element will be focused during the first mount.',
    },
    color: {
      table: {
        defaultValue: {summary: 'secondary'},
      },
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'default'],
      },
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
    },
    disabled: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the textfield will be disabled.',
    },
    id: {description: 'Textfield id used for a11y'},
    required: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the textfield will be disabled.',
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium'],
      },
      description: 'The size of the textfield',
    },
    value: {
      description:
        'The value of the input element, required for a controlled component.',
    },
  },
};

export const RadioButtons = (args) => (
  <Radio {...args} />
);
RadioButtons.args = {
  checked: '',
  checkedIcon: '',
  color: 'secondary',
  disabled: 'false',
  id: '',
  required: 'false',
  size: 'medium',
  type: '',
  value: '',
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
