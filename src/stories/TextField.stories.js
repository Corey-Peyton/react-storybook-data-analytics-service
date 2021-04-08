import React from 'react';

import {TextFields} from '../Components/CommonComponents/TextField';

export default {
  title: 'Molecules/TextFields',
  component: TextFields,
};

export const AllTextFields = (args) => {
  return (
    <>
      <TextFields id="standard-basic" label="Standard" />
      <TextFields id="filled-basic" label="Filled" variant="filled" />
      <TextFields id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
};

export const StandardTextField = (args) => {
  return (
    <>
      <TextFields id="standard-basic" label="Standard" />
    </>
  );
};

export const OutlinedTextField = (args) => {
  return (
    <>
      <TextFields id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
};

export const FilledTextField = (args) => {
  return (
    <>
      <TextFields id="filled-basic" label="Filled" variant="filled" />
    </>
  );
};
