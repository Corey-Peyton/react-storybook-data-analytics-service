import React from 'react';

import {Drawer} from '../Components/CommonComponents/Drawer';
import {Button, Typography} from '@material-ui/core';

export default {
  title: 'Molecules/Drawer',
  component: Drawer,
};

export const SingleActionDrawer = (args) => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDrawer}>
        Single action drawer
      </Button>
      <Drawer
        open={open}
        title="Single action drawer"
        content={
          <>
            <Typography variant="body2">
              This is an example of a drawer with one action.
            </Typography>
          </>
        }
        primaryButton="Close"
        handlePrimaryClick={closeDrawer}
        toggleDrawer={closeDrawer}
      />
    </>
  );
};

export const TwoActionDrawer = (args) => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDrawer}>
        Two action drawer
      </Button>
      <Drawer
        open={open}
        title="Two action drawer"
        content={
          <>
            <Typography variant="body2">
              This is an example of a drawer with two actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        handlePrimaryClick={closeDrawer}
        handleSecondaryClick={closeDrawer}
        toggleDrawer={closeDrawer}
      />
    </>
  );
};

export const ThreeActionDrawer = (args) => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDrawer}>
        Three action drawer
      </Button>
      <Drawer
        open={open}
        title="Three action drawer"
        content={
          <>
            <Typography variant="body2">
              This is an example of a drawer with three actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        thirdButton="Other action"
        handlePrimaryClick={closeDrawer}
        handleSecondaryClick={closeDrawer}
        handleThirdClick={closeDrawer}
        toggleDrawer={closeDrawer}
      />
    </>
  );
};
