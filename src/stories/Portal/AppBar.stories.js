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
