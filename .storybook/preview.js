import React from 'react';

import {addDecorator} from '@storybook/react';
import {ThemeProvider} from '@material-ui/core/styles';

import {useStyles} from '../src/Theme/globalStyles';
import {theme} from '../src/Theme/theme';
import '../src/styles/styles.css';

addDecorator((story) => {
  useStyles();

  return <ThemeProvider theme={theme}>{story()}</ThemeProvider>;
});

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  previewTabs: {
    docs: {
      hidden: false,
    },
  },
};
