import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
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
  TextField,
  IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'fixed',
      left: '88%',
      top: '50%',
    },
  },
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiOutlinedInput-multiline': {
        padding: 0,
      },
      '& .MuiOutlinedInput-inputMultiline': {
        'max-height': 130,
        'overflow': 'auto !important',
        'padding': theme.spacing(2),
      },
    },
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(1, 0, 2, 0),
  },

  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogFooter: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
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

  const [state, setState] = React.useState({
    comments: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });

  const disableCutCopyPaste = (e, command, value) => {
    // display error if user tries to cut/copy/paste
    let msg;
    e.preventDefault();
    switch (command) {
      case 'cut':
        msg = t('Cut has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'copy':
        msg = t('Copy has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'paste':
        msg = t('Paste has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      default:
        break;
    }
  };

  const toggleHelperText = (value) => {
    if (state[value].commands === state[value].errorText) {
      if (Boolean(state[value].invalid)) {
        // set error text back to invalid error
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: state[value].invalid,
          },
        });
      } else {
        // clear error text if no invalid error exists
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: '',
          },
        });
      }
    }
  };

  const {t} = useTranslation();

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        variant="extended"
        aria-label="support"
        size="medium"
        onClick={handleClickOpen}
      >
        <Email className={classes.extendedIcon} />
        Get support
      </Fab>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={false}
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">
          <div className={classes.dialogTitle}>
            Get support
            <IconButton onClick={handleClose} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="pb-0 mt-1">
          <div className={classes.alertRow}>
            <Alert severity="warning" className={classes.alert}>
              Do not include any confidential information.
            </Alert>
          </div>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body2" component="span" color="textPrimary">
              Click submit and one of our support staff will reach out to help
              you with your enquiry.
            </Typography>
          </DialogContentText>
          <TextField
            className="mt-1 mb-3"
            id="comment-text"
            label="Comments"
            variant="outlined"
            multiline
            fullWidth
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'comments')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'comments')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'comments')}
            onClick={() => toggleHelperText('comments')}
            onBlur={() => toggleHelperText('comments')}
            onFocus={() => toggleHelperText('comments')}
            value={state.comments.text}
            error={Boolean(state.comments.errorText)}
            helperText={state.comments.errorText}
          />
        </DialogContent>
        <Divider />
        <DialogActions className={classes.dialogFooter}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            className={classes.footerBtns}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
