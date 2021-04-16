import React from 'react';
import {makeStyles, Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  fontFamily: {
    fontFamily: 'roboto',
    fontSize: '0.875rem',
  },
}));

export default {
  title: 'Molecules/RadioButtons',
  component: Radio,
  argTypes: {
    checked: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the component is checked.',
    },
    checkedIcon: {
      type: {name: 'node'},
      description: 'The icon to display when the component is checked.',
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
      description: 'If true, the component is disabled.',
    },
    id: {description: 'Textfield id used for a11y'},
    required: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the input element is required.',
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium'],
      },
      description:
        'The size of the component. small is equivalent to the dense radio styling.',
    },
    value: {
      description:
        'The value of the component. The DOM API casts this to a string.',
    },
  },
};

export const RadioButtons = (args) => (
  <Radio {...args} />
);
RadioButtons.args = {
  checked: false,
  checkedIcon: '',
  color: 'primary',
  disabled: false,
  id: '',
  required: false,
  size: '',
  value: '',
};

export const AllRadioButtons = (args) => {
  const classes = useStyles();
  return (
    <>
      <FormControl component="fieldset" className="m-1">
        <FormLabel component="legend">Vertical radiogroup</FormLabel>
        <RadioGroup aria-label="numbers" name="radio-buttons-group">
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel
            value="3"
            disabled
            control={<Radio />}
            label="disabled"
          />
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
          <FormControlLabel
            className="mr-2 mt-1"
            control={<Radio />}
            label="top"
            labelPlacement="top"
            value="1"
          />
          <FormControlLabel
            className="mr-2"
            control={<Radio />}
            label="start"
            labelPlacement="start"
            value="2"
          />
          <FormControlLabel
            className="mr-2"
            control={<Radio />}
            label="bottom"
            labelPlacement="bottom"
            value="3"
          />
        </RadioGroup>
      </FormControl>
      <Radio size="small" color="secondary" checked /><span className={classes.fontFamily}>Small size, secondary colour</span>
      <Radio size="medium" color="primary" checked /><span className={classes.fontFamily}>Medium, primary colour</span>
      <Radio size="medium" color="default" checked /><span className={classes.fontFamily}>Medium, default colour</span>
    </>
  );
};
