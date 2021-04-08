import React from 'react';

import {TextField} from '../Components/CommonComponents/TextField';

export default {
  title: 'Molecules/TextField',
  component: TextField,
};

export const BasicOutlined = (args) => {
  return (
    <>
      {/*       <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
};
