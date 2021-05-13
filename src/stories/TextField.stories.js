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
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    autoFocus: {
      description:
        'If true, the input element will be focused during the first mount.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    color: {
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
      control: {
        type: 'radio',
        options: ['primary', 'secondary'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'primary'},
      },
    },
    defaultValue: {
      description: 'The default value of the input element.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    disabled: {
      description: 'If true, the input element will be disabled.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    error: {
      description: 'If true, the label will be displayed in an error state.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    fullWidth: {
      description:
        'If true, the input will take up the full width of its container.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    helperText: {
      description: 'The helper text content.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    id: {
      description:
        'The id of the input element. Use this prop to make label and helperText accessible for screen readers.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    label: {
      description: 'The label content.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    margin: {
      description:
        'If dense or normal, will adjust vertical spacing of this and contained components.',
      control: {
        type: 'radio',
        options: ['dense', 'none', 'normal'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'dense'},
      },
    },
    multiline: {
      description:
        'If true, a textarea element will be rendered instead of an input.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    name: {
      description: 'Name attribute of the input element.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    placeholder: {
      description:
        'The short hint displayed in the input before the user enters a value.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    required: {
      description:
        'If true, the label is displayed as required and the input element` will be required.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: false},
      },
    },
    rows: {
      description:
        'Number of rows to display when multiline option is set to true.',
      control: {
        type: 'number',
      },
      table: {
        type: {summary: 'number'},
      },
    },
    rowsMax: {
      description:
        'Maximum number of rows to display when multiline option is set to true.',
      control: {
        type: 'number',
      },
      table: {
        type: {summary: 'number'},
      },
    },
    variant: {
      description: 'The variant to use.',
      control: {
        type: 'radio',
        options: ['filled', 'outlined', 'standard'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'outlined'},
      },
    },
  },
};

export const Default = (args) => <TextField {...args} />;
Default.args = {
  id: 'default',
  label: 'Default',
};

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
        helperText="Helper text"
      />
      <TextField
        className="input-margin"
        id="default-val"
        label="Default value"
        defaultValue="Default value"
      />
      <TextField
        className="input-margin"
        label="Error"
        id="error"
        error={true}
        helperText="Error text"
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
