import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

export default {
  title: 'Molecules/TextFields',
  component: TextField,
  argTypes: {
    autoComplete: {
      description:
        'This prop helps users to fill forms faster, especially on mobile devices.',
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

export const TextFields = (args) => <TextField {...args} />;
TextFields.args = {};

export const OutlinedTextField = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        className="input-margin"
        id="full-width"
        label="Full width"
        fullWidth
      />
      <TextField
        className="input-margin"
        id="outlined-basic"
        label="Required"
        required
      />
      <TextField
        className="input-margin"
        id="disabled"
        label="Disabled"
        disabled
      />
      <TextField
        className="input-margin"
        id="placeholder"
        label="Placeholder"
        placeholder="Placeholder text"
      />
      <TextField
        className="input-margin"
        id="help-text"
        label="Helper text"
        defaultValue="Default Value"
        helperText="Some important text"
      />
      <TextField
        className="input-margin"
        label="Error"
        id="error"
        error={true}
      />
      <TextField
        className="input-margin"
        label="Adornment"
        id="standard-start-adornment"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className="input-margin"
        id="multiline"
        label="Multiline"
        multiline
        rows={2}
      />
    </div>
  );
};
