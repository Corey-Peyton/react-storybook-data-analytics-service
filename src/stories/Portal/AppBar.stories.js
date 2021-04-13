import React from 'react';

import AppBar from '../../Components/Portal/CommonComponents/AppBar';

export default {
  title: 'Organisms/Portal/AppBar',
  component: AppBar,
};

export const AppBarUnAuth = (args) => {
  return <AppBar />;
};
AppBarUnAuth.storyName = 'App Bar - Unauthenticated';

export const AppBarAuth = (args) => {
  return <AppBar auth username="user.name@cloud.statcan.ca" />;
};
AppBarAuth.storyName = 'App Bar - Authenticated';
