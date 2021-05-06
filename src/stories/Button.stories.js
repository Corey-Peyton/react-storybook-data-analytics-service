import React from 'react';

import {Button, Paper} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiPlus} from '@mdi/js';
import {ThemeProvider} from '@material-ui/core/styles';
import {darkTheme} from '../Theme/theme';

export default {
  title: 'Atoms/Buttons/Button',
  component: Button,
  argTypes: {
    color: {
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
      control: {
        type: 'radio',
        options: ['default', 'inherit', 'primary'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'default'},
      },
    },
    component: {
      description:
        'The component used for the root node. Either a string to use a HTML element or a component.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'elementType'},
        defaultValue: {summary: 'button'},
      },
    },
    disabled: {
      description: 'If true, the button will be disabled.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'false'},
      },
    },
    endIcon: {
      description: 'Element placed after the children.',
      table: {
        type: {summary: 'node'},
      },
    },
    fullWidth: {
      description:
        'If true, the button will take up the full width of its container.',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'false'},
      },
    },
    href: {
      description:
        'The URL to link to when the button is clicked. If defined, an a element will be used as the root node.',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'string'},
      },
    },
    startIcon: {
      description: 'Element placed before the children.',
      table: {
        type: {summary: 'node'},
      },
    },
    variant: {
      description: 'The variant to use.',
      control: {
        type: 'radio',
        options: ['contained', 'outlined', 'text'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'text'},
      },
    },
  },
};

export const Default = (args) => {
  return (
    <>
      <Button {...args}>Primary</Button>
    </>
  );
};
Default.args = {
  color: 'primary',
  variant: 'contained',
};

export const ContainedButtons = (args) => {
  return (
    <>
      <Button variant="contained" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="contained" disabled className="m-1">
        Disabled
      </Button>
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        className="m-1"
      >
        Link
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        End icon
      </Button>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};

export const OutlinedButtons = (args) => {
  return (
    <>
      <Button variant="outlined" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="outlined" disabled className="m-1">
        Disabled
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href="#outlined-buttons"
        className="m-1"
      >
        Link
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        variant="outlined"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        End icon
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};

export const TextButtons = (args) => {
  return (
    <>
      <Button className="m-1">Default</Button>
      <Button color="primary" className="m-1">
        Primary
      </Button>
      <Button disabled className="m-1">
        Disabled
      </Button>
      <Button href="#text-buttons" color="primary" className="m-1">
        Link
      </Button>
      <Button startIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
        Start icon
      </Button>
      <Button endIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
        End icon
      </Button>
      <Button
        startIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        endIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        className="m-1"
      >
        End icon
      </Button>
      <Button
        startIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};

export const DarkThemeButtons = (args) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper className="p-3">
          <Button variant="contained" color="primary" className="m-1">
            Primary
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiPlus} size={1} />}
            className="m-1"
          >
            Start icon
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon path={mdiPlus} size={1} />}
            className="m-1"
          >
            End icon
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiPlus} size={1} />}
            disabled
            className="m-1"
          >
            Disabled icon
          </Button>
          <Button variant="contained" disabled className="m-1">
            Disabled
          </Button>
          <br />
          <Button variant="outlined" className="m-1">
            Default
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon path={mdiPlus} size={1} />}
            className="m-1"
          >
            Start icon
          </Button>
          <Button
            variant="outlined"
            endIcon={<Icon path={mdiPlus} size={1} />}
            className="m-1"
          >
            End icon
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon path={mdiPlus} size={1} />}
            disabled
            className="m-1"
          >
            Disabled icon
          </Button>
          <Button variant="outlined" disabled className="m-1">
            Disabled
          </Button>
          <br />
          <Button className="m-1">Default</Button>
          <Button startIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
            Start icon
          </Button>
          <Button endIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
            End icon
          </Button>
          <Button
            startIcon={<Icon path={mdiPlus} size={1} />}
            disabled
            className="m-1"
          >
            Disabled icon
          </Button>
          <Button disabled className="m-1">
            Disabled
          </Button>
        </Paper>
      </ThemeProvider>
    </>
  );
};
