import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {darkTheme} from '../Theme/theme';

import {Link, Typography, Paper} from '@material-ui/core';

export default {
  title: 'Atoms/Link',
  component: Link,
};

export const LightThemeLinks = (args) => {
  return (
    <>
      <Typography>
        <Link underline="always" color="inherit" href="#">
          Default
        </Link>
      </Typography>
      <br />
      <Typography>
        <Link underline="always" color="primary" href="#">
          Primary
        </Link>
      </Typography>
    </>
  );
};

export const DarkThemeLinks = (args) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper className="p-3">
          <Typography>
            <Link underline="always" color="inherit" href="#">
              Default
            </Link>
          </Typography>
          <br />
          <Typography>
            <Link underline="always" color="primary" href="#">
              Primary
            </Link>
          </Typography>
        </Paper>
      </ThemeProvider>
    </>
  );
};
