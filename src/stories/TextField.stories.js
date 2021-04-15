import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default {
  title: 'Molecules/TextFields',
  component: TextField,
  argTypes: {
    autoComplete: {
      description:
        'This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as its more like an autofill.',
    },
    autoFocus: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description:
        'If true, the input element will be focused during the first mount.',
    },
    color: {
      table: {
        defaultValue: {summary: 'primary'},
      },
      control: {
        type: 'radio',
        options: ['primary', 'secondary'],
      },
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
    },
    defaultValue: {description: 'The default value of the input element.'},
    disabled: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the textfield will be disabled.',
    },
    endAdornment: {
      description:
        'End InputAdornment for this component, applies to filled and outlined textfields only.',
    },
    error: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the label will be displayed in an error state.',
    },
    fullWidth: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description:
        'If true, the textfield will take up the full width of its container.',
    },
    helpertext: {
      type: {name: 'node'},
      description: 'The helper text content.',
    },
    id: {description: 'Textfield id used for a11y'},
    label: {type: {name: 'node'}, description: 'The label content.'},
    margin: {
      control: {
        type: 'radio',
        options: ['dense', 'none', 'normal'],
      },
      description:
        'If dense or normal, will adjust vertical spacing of this and contained components.',
    },
    multiline: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description:
        'If true, a textarea element will be rendered instead of an input.',
    },
    placeholder: {
      description:
        'The short hint displayed in the input before the user enters a value.',
    },
    required: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description: 'If true, the textfield will be disabled.',
    },
    rows: {
      description:
        'Number of rows to display when multiline option is set to true.',
    },
    rowsmax: {
      description:
        'Maximum number of rows to display when multiline option is set to true.',
    },
    startAdornment: {
      description:
        'If true, the textfield will take up the full width of its container.',
    },
    select: {
      table: {
        defaultValue: {summary: 'false'},
      },
      description:
        'Render a Select element while passing the Input element to Select as input parameter. If this option is set you must pass the options of the select as children.',
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium'],
      },
      description: 'The size of the textfield',
    },
    type: {
      description:
        'Type of the input element. It should be a valid HTML5 input type.',
    },
    value: {
      description:
        'The value of the input element, required for a controlled component.',
    },
    variant: {
      table: {
        defaultValue: {summary: 'standard'},
      },
      control: {
        type: 'radio',
        options: ['filled', 'outlined', 'standard'],
      },
      description: 'The variant to use.',
    },
  },
};

export const TextFields = (args) => (
  <TextField variant="outlined" label="Outlined" margin="dense" {...args} />
);
TextFields.args = {
  autoComplete: '',
  autoFocus: false,
  color: '',
  defaultValue: '',
  disabled: false,
  endAdornment: '',
  error: false,
  fullWidth: false,
  helpertext: '',
  id: '',
  label: 'Outlined',
  margin: 'dense',
  multiline: false,
  placeholder: '',
  required: false,
  rows: '',
  rowsmax: '',
  startAdornment: '',
  select: false,
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
