import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import Email from '@material-ui/icons/Email';
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
  },
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    left: '88%',
    top: '50%',
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
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
        className={classes.fab}
      >
        <Email className={classes.extendedIcon} />
        Get support
      </Fab>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll='paper'
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title">
          <div className={classes.vettingContainerTitle}>
            Get support
            <IconButton onClick={handleClose} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Alert severity="warning" className={classes.alert}>
                  {t('Do not include any confidential information.')}
                </Alert>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <Typography variant="body2" component="span" color="textPrimary">
                Click submit and one of our support staff will reach out to help
                you with your enquiry.
              </Typography>
            </div>
            <div className={classes.vettingRow}>
              <TextField
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
            </div>
          </div>
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
