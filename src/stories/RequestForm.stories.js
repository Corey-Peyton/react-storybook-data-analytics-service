import React from 'react';

import RequestForm from '../Components/VettingApp/VettingRequestAnalyst';

export default {
  title: 'Pages/Vetting/RequestForm',
  component: RequestForm,
  parameters: {
    layout: 'fullscreen',
    docs: {page: null},
  },
};

export const Default = () => {
  return <RequestForm userName="Tony Stark" lead="" support={[]} />;
};

export const Assigned = () => {
  return <RequestForm userName="Tony Stark" lead="Tony Stark" support={[]} />;
};
