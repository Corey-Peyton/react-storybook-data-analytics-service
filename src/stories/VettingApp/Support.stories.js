import React from 'react';

import FloatingSupportButton from '../../Components/VettingApp/CommonComponents/Support';

export default {
  title: 'Organisms/Vetting/Support',
  component: FloatingSupportButton,
};

export const DefaultSupport = (args) => {
  return <FloatingSupportButton />;
};
DefaultSupport.storyName = 'Support - Default';

export const RequestFormSupport = (args) => {
  return <FloatingSupportButton form />;
};
RequestFormSupport.storyName = 'Support - Request form';
