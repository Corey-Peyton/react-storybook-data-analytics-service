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
import {
  SnackbarAssignLead,
  SnackbarSaveRequest,
} from '../CommonComponents/Snackbars';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
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
}));

function ToolBarAssign(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    dialogAssign: false,
    snackbarSave: false,
    snackbarAssign: false,
  });

  const handleOpen = (element) => {
    setOpen({...open, [element]: true});
  };

  const handleClose = (element) => {
    setOpen({...open, [element]: false});
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
        onClick={() => handleOpen('dialogAssign')}
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
        onClick={() => handleOpen('snackbarSave')}
      >
        Save
      </Button>
      {/* Save request snackbar */}
      <SnackbarSaveRequest
        open={open.snackbarSave}
        handleClose={() => handleClose('snackbarSave')}
      />
      {/* Assign to me snackbar */}
      <SnackbarAssignLead
        open={open.snackbarAssign}
        handleClose={() => handleClose('snackbarAssign')}
      />
      {/* Assign to me dialog */}
      <Dialog
        open={open.dialogAssign}
        onClose={() => handleClose('dialogAssign')}
        aria-labelledby="form-dialog-title"
        scroll="paper"
        disableBackdropClick
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">Assign vetting request to me</Typography>
            <IconButton onClick={() => handleClose('dialogAssign')} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="subtitle2">
                  Provide a phone number
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <FormControl variant="outlined">
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
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions className={classes.dialogFooter}>
          <Button
            onClick={() => handleClose('dialogAssign')}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.handleAssignToMe();
              handleClose('dialogAssign');
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
