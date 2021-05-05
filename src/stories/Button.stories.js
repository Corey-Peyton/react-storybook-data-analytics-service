import React from 'react';

import {Button} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiPlus} from '@mdi/js';

export default {
  title: 'Atoms/Buttons/Button',
  component: Button,
};

export const AllButtons = (args) => {
  return (
    <>
      <Button variant="contained" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="contained" disabled className="m-1">
        Disabled
      </Button>
      <br />
      <Button variant="outlined" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="outlined" disabled className="m-1">
        Disabled
      </Button>
      <br />
      <Button className="m-1">Default</Button>
      <Button color="primary" className="m-1">
        Primary
      </Button>
      <Button disabled className="m-1">
        Disabled
      </Button>
    </>
  );
};

export const ContainedButtons = (args) => {
  return (
    <>
      <Button variant="contained" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="contained" disabled className="m-1">
        Disabled
      </Button>
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        className="m-1"
      >
        Link
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        End icon
      </Button>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};

export const OutlinedButtons = (args) => {
  return (
    <>
      <Button variant="outlined" color="primary" className="m-1">
        Primary
      </Button>
      <Button variant="outlined" disabled className="m-1">
        Disabled
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href="#outlined-buttons"
        className="m-1"
      >
        Link
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        variant="outlined"
        color="primary"
        endIcon={<Icon path={mdiPlus} size={1} />}
        className="m-1"
      >
        End icon
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};

export const TextButtons = (args) => {
  return (
    <>
      <Button className="m-1">Default</Button>
      <Button color="primary" className="m-1">
        Primary
      </Button>
      <Button disabled className="m-1">
        Disabled
      </Button>
      <Button href="#text-buttons" color="primary" className="m-1">
        Link
      </Button>
      <Button startIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
        Start icon
      </Button>
      <Button endIcon={<Icon path={mdiPlus} size={1} />} className="m-1">
        End icon
      </Button>
      <Button
        startIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        className="m-1"
      >
        Start icon
      </Button>
      <Button
        endIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        className="m-1"
      >
        End icon
      </Button>
      <Button
        startIcon={<Icon path={mdiPlus} size={1} />}
        color="primary"
        disabled
        className="m-1"
      >
        Icon disabled
      </Button>
    </>
  );
};
