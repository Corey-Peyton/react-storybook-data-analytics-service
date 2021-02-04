import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    'width': '100%',
    '& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeSmall:hover': {
      borderRadius: '0',
    },
  },
  banner: {
    backgroundColor: 'white',
  },
}));

export default function CopyAndPasteAlert() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.banner}
          action={
            <IconButton
              aria-label="close"
              color="primary"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Typography variant='body1' color='primary'>Understood</Typography>
            </IconButton>
          }
        >
          <Typography color='textPrimary'>Cut, copy and paste functionality has been disabled on text fields for security purposes.</Typography>
        </Alert>
      </Collapse>
    </div>
  );
}
