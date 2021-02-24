import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Divider,
  FormControl,
} from '@material-ui/core';
import Icon from '@mdi/react';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
      },
      '& .MuiInputBase-input': {
        'max-height': 130,
        'overflow': 'hidden auto !important',
      },
      '& .MuiAutocomplete-endAdornment': {
        top: '5.5px',
      },
    },
  },
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  textField: {
    width: '100%',
    padding: 0,
  },
}));

function ToolBarAssign(props) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [state, setState] = React.useState({
    phone: '',
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
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Back to vetting requests dashboard"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        Vetting requests dashboard
      </Typography>
      <Button
        color="primary"
        className={classes.headerBtn}
        onClick={handleClickOpen}
        startIcon={
          <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        }
      >
        <Typography variant="subtitle2" color="textSecondary">
          Assign to me
        </Typography>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant="h6">Assign vetting request to me</Typography>
            <IconButton onClick={handleClose} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mt-3 pt-0">
          <Typography variant="subtitle2" className="mb-2">
            Provide a phone number
          </Typography>
          <FormControl variant="outlined" className={classes.textField}>
            <NumberFormat
              id="phone"
              label="Phone number *"
              customInput={TextField}
              type="text"
              variant="outlined"
              format="+1 (###) ### ####"
              mask="_"
              allowEmptyFormatting
              autoComplete="phone"
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'phone')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'phone')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'phone')}
              onClick={() => toggleHelperText('phone')}
              onBlur={() => toggleHelperText('phone')}
              onFocus={() => toggleHelperText('phone')}
              value={state.phone.text}
              error={Boolean(state.phone.errorText)}
              helperText={state.phone.errorText}
            />
          </FormControl>
        </DialogContent>
        <Divider className="mt-3 mb-1" />
        <DialogActions className={classes.dialogFooter}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.handleAssignToMe();
              handleClose();
            }}
            color="primary"
            variant="contained"
            className={classes.footerBtns}
          >
            Assign to me
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

export default ToolBarAssign;
