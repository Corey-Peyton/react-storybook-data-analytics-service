import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default {
  title: 'Molecules/TextFields',
  component: TextField,
  argTypes: {
    autoComplete: {description: 'This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as its more like an autofill.', control: 'boolean'},
    autoFocus: {description: 'If true, the input element will be focused during the first mount.'},
    color: {description: 'The color of the component'},
    defaultValue: {description: 'The default value of the input element.'},
    disabled: {description: 'If true, the textfield will be disabled.'},
    endAdornment: {description: 'End InputAdornment for this component, applies to filled and outlined textfields only.'},
    error: {description: 'If true, the label will be displayed in an error state.'},
    fullWidth: {description: 'If true, the textfield will take up the full width of its container.'},
    helpertext: {description: 'The helper text content.'},
    id: {description: 'Textfield id used for a11y'},
    label: {description: 'The label content.'},
    margin: {description: 'If dense or normal, will adjust vertical spacing of this and contained components.'},
    multiline: {description: 'If true, a textarea element will be rendered instead of an input.'},
    placeholder: {description: 'The default value of the input element.'},
    required: {description: 'If true, the textfield will be disabled.'},
    rows: {description: 'End InputAdornment for this component, applies to filled and outlined textfields only.'},
    rowsmax: {description: 'If true, the label will be displayed in an error state.'},
    startAdornment: {description: 'If true, the textfield will take up the full width of its container.'},
    select: {description: 'The helper text content.'},
    size: {description: 'Textfield id used for a11y'},
    type: {description: 'Type of the input element. It should be a valid HTML5 input type.'},
    value: {description: 'The value of the input element, required for a controlled component.'},
    variant: {description: 'The variant to use.'},
  },
};

export const TextFields = (args) => <TextField variant="outlined" margin="dense" {...args} />;
TextFields.args = {
  autoComplete: '',
  autoFocus: true,
  color: '',
  defaultValue: '',
  disabled: '',
  endAdornment: '',
  error: '',
  fullWidth: 'true',
  helpertext: '',
  id: '',
  label: '',
  margin: 'dense',
  multiline: '',
  placeholder: '',
  required: '',
  rows: '',
  rowsmax: '',
  startAdornment: '',
  select: '',
  size: '',
  type: '',
  value: '',
  variant: 'outlined',
};

export const OutlinedTextField = (args) => {
  return (
    <>
      <TextField
        id="standard-basic"
        label="Full width"
        variant="outlined"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Required"
        variant="outlined"
        required
        margin="dense"
        className="mr-2 mt-2"
      />
      <TextField
        id="outlined-basic"
        label="Disabled"
        variant="outlined"
        disabled
        margin="dense"
        className="mr-2 mt-2"
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
        className="mr-2 mt-2"
      />
      <TextField
        id="outlined-basic"
        label="Helper text"
        variant="outlined"
        defaultValue="Default Value"
        helperText="Some important text"
        margin="dense"
        className="mr-2 mt-2"
      />
      <TextField
        label="Error"
        id="standard-start-adornment"
        variant="outlined"
        InputProps={{
          error: true,
        }}
        margin="dense"
        className="mr-2"
      />
      <TextField
        label="Adornment"
        id="standard-start-adornment"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        margin="dense"
        className="mr-2"
      />

      <TextField
        id="standard-basic"
        label="Multiline"
        variant="outlined"
        multiline
        rows={2}
        margin="dense"
        className="mr-2"
      />
      <TextField
        id="standard-basic"
        variant="outlined"
        label="Size medium"
        size="medium"
        margin="dense"
      />
    </>
  );
};
