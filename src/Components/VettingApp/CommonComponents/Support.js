import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Email from '@material-ui/icons/Email';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'absolute',
      left: '88%',
      top: '50%',
    },
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
}));

export default function FloatingSupportButton() {
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleDialogClose = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <Fab color="primary" variant="extended" aria-label="support" size="medium" onClick={handleClickOpen}>
        <Email className={classes.extendedIcon}/>Get support
      </Fab>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="false"
      >
        <DialogTitle id="alert-dialog-title">
          Get support
        </DialogTitle>
        <DialogContent className="pb-0">
          <DialogContentText id="alert-dialog-description">
            <Typography>Click submit and one of our support staff will reach out to help you with your enquiry.</Typography>
          </DialogContentText>
          <Divider className={classes.divider} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            className="ml-2"
          >
            <SendIcon />Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
