import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({}));

export default function CutCopyPasteAlert() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity="warning"
        className="mb-3"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Cut, copy and paste functionality has been disabled on text fields for
        security purposes.
      </Alert>
    </Collapse>
  );
}
