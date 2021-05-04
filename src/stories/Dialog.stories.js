import React from 'react';

import {Button} from '../Components/CommonComponents/Button';
import {Dialog} from '../Components/CommonComponents/Dialog';
import {Typography} from '@material-ui/core';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
};

export const SingleActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogSingleAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
      >
        Single action dialog
      </Button>
      <Dialog
        id="single-action-dialog"
        open={open.dialogSingleAction}
        title="Single action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with one action.
            </Typography>
          </>
        }
        primaryButton="Close"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
      />
    </>
  );
};

export const TwoActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogTwoAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
      >
        Two action dialog
      </Button>
      <Dialog
        id="two-action-dialog"
        open={open.dialogTwoAction}
        title="Two action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with two actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
        handleSecondaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
      />
    </>
  );
};

export const ThreeActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogThreeAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
      >
        Three action dialog
      </Button>
      <Dialog
        id="three-action-dialog"
        open={open.dialogThreeAction}
        title="Three action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with three actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        thirdButton="Other action"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        handleSecondaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        handleThirdClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
      />
    </>
  );
};

export const BackButtonDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogBackButton: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogBackButton', !open.dialogBackButton, e);
        }}
      >
        Back button dialog
      </Button>
      <Dialog
        id="back-button-dialog"
        open={open.dialogBackButton}
        title="Back button dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with one action and a back button.
            </Typography>
          </>
        }
        primaryButton="Next"
        backButton="Back"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogBackButton', !open.dialogBackButton, e);
        }}
        handleBackClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogBackButton', !open.dialogBackButton, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogBackButton', !open.dialogBackButton, e);
        }}
      />
    </>
  );
};
