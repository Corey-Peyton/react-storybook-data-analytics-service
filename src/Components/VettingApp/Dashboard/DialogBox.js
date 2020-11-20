import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  Typography,
  TextField,
} from '@material-ui/core';

import CustomizedSnackbar from '../CommonComponents/CustomizedSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        'width': '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
      },
      '& .MuiInputBase-input': {
        'max-height': 130,
        'overflow': 'hidden auto !important',
      },
    },
  },
  avatar: {
    backgroundColor: green[500],
    color: theme.palette.grey[100],
  },
  avatarTransparent: {
    backgroundColor: 'transparent',
    color: theme.palette.grey[600],
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogRow: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
  },
  dialogText: {
    paddingLeft: theme.spacing(1),
  },
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: theme.spacing(1),
  },
}));

export function DialogAnalyst(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="dashboard-dialog-title" open={open}>
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography>Analyst information</Typography>
            <IconButton
              onClick={handleClose}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-1" />
        <div className={classes.dialogRow}>
          <Avatar className={classes.avatar}>A</Avatar>
          <Typography className={classes.dialogText}>brian.bill@cloud.statcan.ca</Typography>

        </div>
        <div className={classes.dialogRow}>
          <Avatar className={classes.avatarTransparent}>
            <PhoneIcon />
          </Avatar>
          <Typography className={classes.dialogText}>+1 343 567 7878</Typography>
        </div>
        <Divider className="mt-1" />
        <div className={classes.dialogFooter}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Go back
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogWithdraw(props) {
  const classes = useStyles();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const toggleSnackbar = () => {
    toggleDialog();
    setSnackbar(!snackbar);
  };

  const SnackbarClose =() =>{
    setSnackbar(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography>Withdraw Request</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-1" />
        <div className={classes.dialogRow}>
          <TextField
            id="outlined-basic"
            label="Comments *"
            variant="outlined"
            placeholder="Please provite us with a withdrawal reason"
            multiline
          />
        </div>
        <Divider className="mt-1" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            Withdraw request
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message="Vetting request has been withdrawn"
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}
