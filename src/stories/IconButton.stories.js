import React from 'react';

import {IconButton} from '../Components/CommonComponents/IconButton';
import Icon from '@mdi/react';
import {mdiPlus} from '@mdi/js';

export default {
  title: 'Design System/Buttons/IconButton',
  component: IconButton,
};

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
