import React from 'react';

import {IconButton} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiPlus} from '@mdi/js';

export default {
  title: 'Atoms/Buttons/IconButton',
  component: IconButton,
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
    edge: {
      description:
        'If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape).',
      control: {
        type: 'radio',
        options: ['start', 'end', false],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: false},
      },
    },
  },
};

export const Default = (args) => {
  return (
    <>
      <IconButton {...args} aria-label="default" className="m-1">
        <Icon path={mdiPlus} size={1} />
      </IconButton>
    </>
  );
};
Default.args = {};

export const AllButtons = (args) => {
  return (
    <>
      <IconButton aria-label="default" className="m-1">
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      <IconButton aria-label="primary" color="primary" className="m-1">
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      <IconButton aria-label="disabled" disabled className="m-1">
        <Icon path={mdiPlus} size={1} />
      </IconButton>
    </>
  );
};
