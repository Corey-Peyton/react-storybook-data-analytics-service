import React from 'react';

import {Button} from '../Components/CommonComponents/Button';
import {Dialog} from '../Components/CommonComponents/Dialog';
import {Typography, TextField} from '@material-ui/core';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
};

export const PassiveDialog = (args) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Passive dialog
      </Button>
      <Dialog
        id="passive-dialog"
        open={open}
        title="Passive dialog title"
        content={
          <Typography>
            Passive dialog notification should only appear if there’s an action
            the user needs to address immediately. Passive dialog notifications
            are persistent on screen.
          </Typography>
        }
        primaryButton="I got it"
        handleClose={handleClose}
      />
    </>
  );
};

export const TransactionalDialog = (args) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Transactional dialog
      </Button>
      <Dialog
        id="trans-dialog"
        open={open}
        title="Delete vetting request"
        content={
          <Typography>
            Are you sure you want to delete the Vetting disclosure request
            “Canadian Community Health Survey - Annual Component”?
          </Typography>
        }
        primaryButton="Delete request"
        secondaryButton="Cancel"
        handleSecondaryClick={handleClose}
        handleClose={handleClose}
      />
    </>
  );
};

export const InputDialog = (args) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Input dialog
      </Button>
      <Dialog
        id="input-dialog"
        open={open}
        title="Assign to me"
        content={
          <>
            <Typography variant="subtitle2" className="mb-2">
              Provide a phone number
            </Typography>
            <TextField
              className="m-0 w-50"
              id="phone-num"
              label="Phone number"
              required
              variant="outlined"
              margin="dense"
            />
          </>
        }
        primaryButton="Assign to me"
        secondaryButton="Cancel"
        handleSecondaryClick={handleClose}
        handleClose={handleClose}
      />
    </>
  );
};
