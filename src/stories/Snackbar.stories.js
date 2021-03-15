import React from 'react';

import {Snackbar} from '../Components/CommonComponents/Snackbar';
import {Button} from '../Components/CommonComponents/Button';

export default {
  title: 'Design System/Snackbar',
  component: Snackbar,
};

export const Snackbars = (args) => {
  const [open, setOpen] = React.useState({
    error: false,
    info: false,
    success: false,
    warning: false,
  });

  const handleOpen = (element) => {
    setOpen({...open, [element]: true});
  };

  const handleClose = (element) => {
    setOpen({...open, [element]: false});
  };

  return (
    <>
      <Button
        className="m-1"
        color="primary"
        variant="contained"
        onClick={() => handleOpen('error')}
      >
        Error snackbar
      </Button>
      <Button
        className="m-1"
        color="primary"
        variant="contained"
        onClick={() => handleOpen('info')}
      >
        Info snackbar
      </Button>
      <Button
        className="m-1"
        color="primary"
        variant="contained"
        onClick={() => handleOpen('success')}
      >
        Success snackbar
      </Button>
      <Button
        className="m-1"
        color="primary"
        variant="contained"
        onClick={() => handleOpen('warning')}
      >
        Warning snackbar
      </Button>
      <Snackbar
        message="Error message"
        severity="error"
        open={open.error}
        handleClose={() => handleClose('error')}
      />
      <Snackbar
        message="Info message"
        severity="info"
        open={open.info}
        handleClose={() => handleClose('info')}
      />
      <Snackbar
        message="Warning message"
        severity="warning"
        open={open.warning}
        handleClose={() => handleClose('warning')}
      />
      <Snackbar
        message="Success message"
        severity="success"
        open={open.success}
        handleClose={() => handleClose('success')}
      />
    </>
  );
};
