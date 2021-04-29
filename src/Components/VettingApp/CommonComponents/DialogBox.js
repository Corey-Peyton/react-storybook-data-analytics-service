/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import {
  Typography,
  TextField,
  FormControl,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import {Dialog as CustomDialog} from '../../CommonComponents/Dialog';
import NumberFormat from 'react-number-format';
import Alert from '@material-ui/lab/Alert';

import {
  SnackbarApproveRequest,
  SnackbarAssignLead,
  SnackbarAssignSupport,
  SnackbarChangeRequest,
  SnackbarDenyRequest,
  SnackbarUnassign,
  SnackbarWithdrawRequest,
  SnackbarSupportFab,
} from './Snackbars';

const ROW_HEIGHT = 56;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiFormControlLabel-root': {
      'margin-left': '0px',
      'flex-basis': '50%',
      'height': '100%',
      '&:last-child': {
        'margin-right': '0px',
      },
      '& .MuiTextField-root': {
        width: '100% !important',
      },
    },
    '& .Mui-error ~.MuiFormHelperText-root, & .Mui-error + label': {
      color: theme.palette.error.main,
    },
    '& .MuiInputBase-input:not(.MuiInputBase-inputMultiline)': {
      height: '100%',
    },
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
    '& .MuiSelect-select': {
      height: [theme.spacing(7), '!important'],
      paddingTop: 0,
      paddingBottom: 0,
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
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    padding: theme.spacing(3),
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
  hiddenRow: {
    display: 'none',
  },
  vettingText: {
    paddingLeft: theme.spacing(1),
  },
  analystListing: {
    display: 'flex',
    flexFlow: 'column',
    marginRight: 'auto',
  },
  supportAnalysts: {
    maxHeight: `calc(${ROW_HEIGHT}px * 3)`,
    overflow: 'auto',
  },
  footerBtns: {
    marginLeft: theme.spacing(2),
  },
  box: {
    padding: theme.spacing(1, 0),
  },
  textField: {
    width: '100%',
    padding: 0,
  },
  formControl: {
    'display': 'flex',
    'flexFlow': 'row',
    'justifyContent': 'space-between',
    '& .MuiTextField-root': {
      width: '49% !important',
    },
  },
  widthAuto: {
    width: 'auto !important',
  },
  alignStart: {
    alignItems: 'start',
  },
}));

// ////////////////////////////////////////// REQUESTER DETAILS
export function DialogRequesterDetails(props) {
  const {open, toggleDialog} = props;
  const {t} = useTranslation();
  const classes = useStyles();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">Requester details</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Requester information - close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Avatar className={classes.avatar}>BB</Avatar>
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Bill Brian
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  brian.bill@cloud.statcan.ca
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  +1 (999) 999 9999
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={toggleDialog}>
            {t('Done')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// ////////////////////////////////////////// ASSIGNEE DETAILS
export function DialogAssigneeDetails(props) {
  const {open, toggleDialog, role} = props;
  const {t} = useTranslation();
  const classes = useStyles();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">Assignee Details</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Analyst information - close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Avatar className={classes.avatar}>BB</Avatar>
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Bill Brian
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  brian.bill@cloud.statcan.ca
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  +1 (999) 999 9999
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={toggleDialog}>
            {t('Done')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// ////////////////////////////////////////// WITHDRAW REQUEST
export function DialogWithdraw(props) {
  const {t} = useTranslation();
  const [snackbar, setSnackbar] = React.useState(false);
  const [state, setState] = React.useState({
    withdrawReason: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
    },
  });

  const initial = {
    // blank object used to reset state
    withdrawReason: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
    },
  };

  const handleSelectChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: {
        text: event.target.value,
        errorText: '',
        helperText: '',
        invalid: '',
      },
    });
  };

  const snackbarClose = () => {
    setSnackbar(false);
  };

  const validateForm = () => {
    let isError = false;
    if (state.withdrawReason.text.trim() === '') {
      isError = true;
      state.withdrawReason.invalid = t('Select a withdraw reason.');
      state.withdrawReason.errorText = t('Select a withdraw reason.');
      state.withdrawReason.helperText = t('Select a withdraw reason.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form and reset the inputs
      props.toggleDialog(e);
      setSnackbar(!snackbar);
      setState({...initial});
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'comments':
              document.getElementById('comments-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

  const content = () => (
    <>
      <FormControl
        className="m-0"
        variant="outlined"
        error={Boolean(state.withdrawReason.errorText)}
        margin="dense"
        required
      >
        <InputLabel htmlFor="withdrawReason">{t('Withdraw reason')}</InputLabel>
        <Select
          id="withdrawReason"
          name="withdrawReason"
          label={t('Withdraw reason')}
          labelId="withdrawReason-label"
          onChange={handleSelectChange}
          value={state.withdrawReason.text}
        >
          <MenuItem value="makeChanges">Need to make changes</MenuItem>
          <MenuItem value="notNeeded">No longer required</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      {Boolean(state.withdrawReason.errorText) && (
        <FormHelperText
          error={Boolean(state.withdrawReason.errorText)}
          variant="outlined"
          margin="dense"
        >
          {state.withdrawReason.helperText}
        </FormHelperText>
      )}
    </>
  );

  return (
    <>
      <CustomDialog
        id="withdraw-dialog"
        open={props.open}
        title={t('Withdraw request')}
        content={content()}
        primaryButton={t('Withdraw')}
        secondaryButton={t('Cancel')}
        handlePrimaryClick={submitForm}
        handleSecondaryClick={(e) => props.toggleDialog(e)}
        toggleDialog={(e) => props.toggleDialog(e)}
      />
      <SnackbarWithdrawRequest open={snackbar} handleClose={snackbarClose} />
    </>
  );
}

// ////////////////////////////////////////// UNASSIGN REQUEST
export function DialogUnassign(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Unassign from me')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Unassign from me - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="body2">
                  {t(
                      'If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.',
                  )}
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              toggleDialog(e);
              snackbarOpen();
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Unassign')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarUnassign open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// SAVE BEFORE LEAVING
export function DialogSaveBeforeLeaving(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Save before leaving?')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Save before leaving - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
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
                  {t('If you don`t save, your changes will be lost.')}
                </Alert>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item>
              <Button
                color="primary"
                onClick={toggleDialog}
                className={clsx(classes.footerBtn, 'MuiIconButton-edgeStart')}
                onKeyPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    toggleDialog(e);
                  }
                }}
              >
                {t('Don`t save')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={toggleDialog}
                className={classes.footerBtns}
                onKeyPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    toggleDialog(e);
                  }
                }}
              >
                {t('Cancel')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleDialog}
                className={classes.footerBtns}
                onKeyPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    toggleDialog(e);
                  }
                }}
              >
                {t('Save')}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// ////////////////////////////////////////// MAKE ME SUPPORT
export function DialogSupport(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  };

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Make me support')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Make me support - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="body2">
                  {t(
                      'If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.',
                  )}
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              toggleDialog(e);
              snackbarOpen();
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Continue')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAssignSupport open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// REQUEST CHANGES
export function DialogUpdate(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={(e) => {
          toggleDialog(e);
        }}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        scroll="paper"
        disableBackdropClick
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Request changes')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Request changes - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="subtitle1">
                  What you need to do...
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <ul>
                  <li>
                    <Typography variant="body2" gutterBottom>
                      Click the "Request changes" button to notify the requester
                      that changes will need to be made to the request.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Contact the requester on a secure communication channel
                      indicating what changes need to be made.
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            onClick={(e) => {
              toggleDialog(e);
              setSnackbar(true);
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
                setSnackbar(true);
              }
            }}
          >
            {t('Request changes')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarChangeRequest open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// GET SUPPORT FAB
export function DialogGetSupportFab(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={(e) => {
          toggleDialog(e);
        }}
        aria-labelledby="get-support-dialog-title"
        open={open}
        className={classes.root}
        scroll="paper"
        disableBackdropClick
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="get-support-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Get support')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Get support - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="subtitle1">
                  Do you need help with something?
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="body2">
                  Click the "Get support" button and one of our Analysts will
                  contact you to resolve the issue. We aim to make contact
                  within 1 to 2 business days.
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            onClick={(e) => {
              toggleDialog(e);
              setSnackbar(true);
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
                setSnackbar(true);
              }
            }}
          >
            {t('Get support')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarSupportFab open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// GET SUPPORT (FORM ONLY)
export function DialogFormGetSupportFab(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);
  const [state, setState] = React.useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    other: false,
  });

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={(e) => {
          toggleDialog(e);
        }}
        aria-labelledby="get-support-form-dialog-title"
        open={open}
        className={classes.root}
        scroll="paper"
        disableBackdropClick
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="get-support-form-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Get support')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Get support - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <Typography variant="subtitle1" className="input-margin">
              Do you need help with something?
            </Typography>
            <FormControl component="fieldset" className="radio-margin" required>
              <FormLabel component="legend">
                Select the steps you need help with.
              </FormLabel>
              <FormHelperText>Select all that apply</FormHelperText>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.step1}
                      onChange={handleChbxChange}
                      name="step1"
                      color="primary"
                    />
                  }
                  label="Step 1 - Requester details"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.step2}
                      onChange={handleChbxChange}
                      name="step2"
                      color="primary"
                    />
                  }
                  label="Step 2 - Output details"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.step3}
                      onChange={handleChbxChange}
                      name="step3"
                      color="primary"
                    />
                  }
                  label="Step 3 - Residual disclosure"
                />
                <FormControlLabel
                  className="radio-margin"
                  control={
                    <Checkbox
                      checked={state.step4}
                      onChange={handleChbxChange}
                      name="step4"
                      color="primary"
                    />
                  }
                  label="Step 4 - Additional information"
                />
                <Divider className="radio-margin" />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.other}
                      onChange={handleChbxChange}
                      name="other"
                      color="primary"
                    />
                  }
                  label="I need help with something else"
                />
              </FormGroup>
            </FormControl>
            <Typography variant="body2" className="radio-margin">
              Click the "Get support" button and one of our Analysts will
              contact you to resolve the issue. We aim to make contact within 1
              to 2 business days.
            </Typography>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            onClick={(e) => {
              toggleDialog(e);
              setSnackbar(true);
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
                setSnackbar(true);
              }
            }}
          >
            {t('Get support')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarSupportFab open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// DENY REQUEST
export function DialogDenied(props) {
  const classes = useStyles();
  const {toggleDialog, open} = props;
  const {t} = useTranslation();
  const [snackbar, setSnackbar] = React.useState(false);
  const initial = {
    // blank object used to reset state
    hours: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    minutes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    reason: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  };
  const [state, setState] = React.useState({
    hours: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    minutes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    reason: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });

  const handleChange = (e, val) => {
    const comment = e.target.value;
    setState({
      ...state,
      [val]: {
        // updates state with text from input
        ...state[val],
        text: comment,
      },
    });

    if (e.target.value && state[val].errorText) {
      // if input text is valid, clear errors
      setState({
        ...state,
        [val]: {
          ...state[val],
          text: comment,
          errorText: '',
          invalid: '',
          commands: '',
        },
      });
    }
  };

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const validateForm = () => {
    let isError = false;
    if (state.hours.text.trim() === '') {
      isError = true;
      state.hours.invalid = t('Enter total hours.');
      state.hours.errorText = t('Enter total hours.');
    }
    if (state.minutes.text.trim() === '' || state.minutes.text.trim() === '.') {
      isError = true;
      state.minutes.invalid = t('Enter total minutes.');
      state.minutes.errorText = t('Enter total minutes.');
    }
    if (state.reason.text.trim() === '') {
      isError = true;
      state.reason.invalid = t('Select a reason.');
      state.reason.errorText = t('Select a reason.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form, toggle snackbar, and reset the inputs
      toggleDialog(e);
      setSnackbar(!snackbar);
      setState({...initial});
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'hours':
              document.getElementById('hours-input').focus();
              break;
            case 'minutes':
              document.getElementById('minutes-input').focus();
              break;
            case 'reason':
              document.getElementById('denied-select-label').focus();
              break;
            case 'comments':
              document.getElementById('comments-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

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

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={(e) => {
          setState({...initial});
          toggleDialog(e);
        }}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Deny request')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Deny request - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={submitForm} noValidate id="deny-form">
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="subtitle2">
                    {t('Billable hours')}
                  </Typography>
                </div>
              </div>
              <div className={clsx(classes.vettingRow, classes.alignStart)}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined">
                    <FormControlLabel
                      control={
                        <NumberFormat
                          id="hours-input"
                          label={t('Hours')}
                          aria-label={t('Hours')}
                          value={state.hours.text}
                          customInput={TextField}
                          type="text"
                          variant="outlined"
                          error={Boolean(state.hours.errorText)}
                          helperText={state.hours.errorText}
                          required
                          onCut={(e) => disableCutCopyPaste(e, 'cut', 'hours')}
                          onCopy={(e) =>
                            disableCutCopyPaste(e, 'copy', 'hours')
                          }
                          onPaste={(e) =>
                            disableCutCopyPaste(e, 'paste', 'hours')
                          }
                          onChange={(e) => handleChange(e, 'hours')}
                          onClick={() => toggleHelperText('hours')}
                          onBlur={() => toggleHelperText('hours')}
                          onFocus={() => toggleHelperText('hours')}
                        />
                      }
                    />
                  </FormControl>
                </div>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined">
                    <FormControlLabel
                      control={
                        <NumberFormat
                          id="minutes-input"
                          label={t('Minutes')}
                          aria-label={t('Minutes')}
                          value={state.minutes.text}
                          customInput={TextField}
                          type="text"
                          variant="outlined"
                          isAllowed={(values) => {
                            const {formattedValue, floatValue} = values;
                            return formattedValue === '' || floatValue <= 60;
                          }}
                          error={Boolean(state.minutes.errorText)}
                          helperText={state.minutes.errorText}
                          required
                          onCut={(e) =>
                            disableCutCopyPaste(e, 'cut', 'minutes')
                          }
                          onCopy={(e) =>
                            disableCutCopyPaste(e, 'copy', 'minutes')
                          }
                          onPaste={(e) =>
                            disableCutCopyPaste(e, 'paste', 'minutes')
                          }
                          onChange={(e) => handleChange(e, 'minutes')}
                          onClick={() => toggleHelperText('minutes')}
                          onBlur={() => toggleHelperText('minutes')}
                          onFocus={() => toggleHelperText('minutes')}
                        />
                      }
                    />
                  </FormControl>
                </div>
              </div>

              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined" required>
                    <Select
                      native
                      inputProps={{
                        id: 'denied-select-label',
                      }}
                      label={t('Denied reason')}
                      value={state.reason.text}
                      fullWidth
                      placeholder={t('Select an option')}
                      onChange={(e) => handleChange(e, 'reason')}
                      error={Boolean(state.reason.errorText)}
                    >
                      <option value=""></option>
                      <option value="Non-SSI project">
                        {t('Non-SSI project')}
                      </option>
                      <option value="Confidential requirements are not met">
                        {t('Confidential requirements are not met')}
                      </option>
                      <option value="Request is missing information">
                        {t('Request is missing information')}
                      </option>
                      <option value="Output file(s) are not in line with the project proposal">
                        {t(
                            'Output file(s) are not in line with the project proposal',
                        )}
                      </option>
                      <option value="Other">{t('Other')}</option>
                    </Select>
                    <InputLabel htmlFor="denied-select-label">
                      {t('Denied reason')}
                    </InputLabel>
                    <FormHelperText>{state.reason.errorText}</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              setState({...initial});
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                setState({...initial});
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            form="deny-form"
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitForm(e);
              }
            }}
          >
            {t('Deny')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarDenyRequest open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// APPROVE REQUEST
export function DialogApprove(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);
  const initial = {
    // blank object used to reset state
    hours: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    minutes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  };
  const [state, setState] = React.useState({
    hours: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    minutes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });

  const handleChange = (e, val) => {
    const comment = e.target.value;
    setState({
      ...state,
      [val]: {
        // updates state with text from input
        ...state[val],
        text: comment,
      },
    });

    if (e.target.value && state[val].errorText) {
      // if input text is valid, clear error
      setState({
        ...state,
        [val]: {
          ...state[val],
          text: comment,
          errorText: '',
          invalid: '',
          commands: '',
        },
      });
    }
  };

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const validateForm = () => {
    let isError = false;
    if (state.hours.text.trim() === '') {
      isError = true;
      state.hours.invalid = t('Enter total hours.');
      state.hours.errorText = t('Enter total hours.');
    }
    if (state.minutes.text.trim() === '' || state.minutes.text.trim() === '.') {
      isError = true;
      state.minutes.invalid = t('Enter total minutes.');
      state.minutes.errorText = t('Enter total minutes.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form, toggle snackbar, and reset the inputs
      toggleDialog(e);
      setSnackbar(!snackbar);
      setState({...initial});
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'hours':
              document.getElementById('hours-input').focus();
              break;
            case 'minutes':
              document.getElementById('minutes-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

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

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Approve request')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Approve request - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={submitForm} noValidate id="approve-form">
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="subtitle2">
                    {t('Billable hours')}
                  </Typography>
                </div>
              </div>
              <div className={clsx(classes.vettingRow, classes.alignStart)}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined">
                    <FormControlLabel
                      control={
                        <NumberFormat
                          id="hours-input"
                          label={t('Hours')}
                          aria-label={t('Hours')}
                          value={state.hours.text}
                          customInput={TextField}
                          type="text"
                          variant="outlined"
                          error={Boolean(state.hours.errorText)}
                          helperText={state.hours.errorText}
                          required
                          onCut={(e) => disableCutCopyPaste(e, 'cut', 'hours')}
                          onCopy={(e) =>
                            disableCutCopyPaste(e, 'copy', 'hours')
                          }
                          onPaste={(e) =>
                            disableCutCopyPaste(e, 'paste', 'hours')
                          }
                          onChange={(e) => handleChange(e, 'hours')}
                          onClick={() => toggleHelperText('hours')}
                          onBlur={() => toggleHelperText('hours')}
                          onFocus={() => toggleHelperText('hours')}
                        />
                      }
                    />
                  </FormControl>
                </div>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined">
                    <FormControlLabel
                      control={
                        <NumberFormat
                          id="minutes-input"
                          label={t('Minutes')}
                          aria-label={t('Minutes')}
                          value={state.minutes.text}
                          customInput={TextField}
                          type="text"
                          variant="outlined"
                          isAllowed={(values) => {
                            const {formattedValue, floatValue} = values;
                            return formattedValue === '' || floatValue <= 60;
                          }}
                          error={Boolean(state.minutes.errorText)}
                          helperText={state.minutes.errorText}
                          required
                          onCut={(e) =>
                            disableCutCopyPaste(e, 'cut', 'minutes')
                          }
                          onCopy={(e) =>
                            disableCutCopyPaste(e, 'copy', 'minutes')
                          }
                          onPaste={(e) =>
                            disableCutCopyPaste(e, 'paste', 'minutes')
                          }
                          onChange={(e) => handleChange(e, 'minutes')}
                          onClick={() => toggleHelperText('minutes')}
                          onBlur={() => toggleHelperText('minutes')}
                          onFocus={() => toggleHelperText('minutes')}
                        />
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              setState({...initial});
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                setState({...initial});
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            form="approve-form"
            onKeyPress={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitForm(e);
              }
            }}
          >
            {t('Approve')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarApproveRequest open={snackbar} handleClose={SnackbarClose} />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// NEW REQUEST TITLE
export function DialognNewRequestTitle(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const {toggleDialog, open, role} = props;
  const initial = {
    // blank object used to reset state
    name: {
      text: 'Untitled request',
      errorText: '',
      invalid: '',
      commands: '',
    },
  };
  const [state, setState] = React.useState({
    name: {
      text: 'Untitled request',
      errorText: '',
      invalid: '',
      commands: '',
    },
    from: location.pathname,
  });

  const handleChange = (e, val) => {
    const comment = e.target.value;
    setState({
      ...state,
      [val]: {
        // updates state with text from input
        ...state[val],
        text: comment,
      },
    });

    if (e.target.value && state.name.errorText) {
      // if input text is valid, clear error
      setState({
        ...state,
        [val]: {
          ...state[val],
          text: comment,
          errorText: '',
          invalid: '',
          commands: '',
        },
      });
    }
  };

  const validateForm = () => {
    let isError = false;
    if (state.name.text.trim() === '') {
      isError = true;
      state.name.invalid = t('Enter a title.');
      state.name.errorText = t('Enter a title.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form and reset the inputs
      toggleDialog();
      setState({...initial});

      if (role === 'researcher') {
        history.push({
          pathname: '/vetting-app/request-researcher',
          state,
        });
      }
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'title':
              document.getElementById('title-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

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
    if (!state[value].text) {
      // if field is empty, set field to "untitled request"
      setState({
        ...state,
        [value]: {
          ...state[value],
          text: initial[value].text,
        },
      });
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setState({...initial});
          toggleDialog();
        }}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('New vetting request')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="New vetting request - close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={submitForm} noValidate id="new-form">
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="body2">
                    {t('Please name your new request.')}
                  </Typography>
                </div>
              </div>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined" className={classes.textField}>
                    <TextField
                      id="name-input"
                      label={t('Request name')}
                      aria-label={t('Request name')}
                      value={state.name.text}
                      variant="outlined"
                      error={Boolean(state.name.errorText)}
                      helperText={state.name.errorText}
                      onCut={(e) => disableCutCopyPaste(e, 'cut', 'name')}
                      onCopy={(e) => disableCutCopyPaste(e, 'copy', 'name')}
                      onPaste={(e) => disableCutCopyPaste(e, 'paste', 'name')}
                      onChange={(e) => handleChange(e, 'name')}
                      onClick={() => toggleHelperText('name')}
                      onBlur={() => toggleHelperText('name')}
                      multiline
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setState({...initial});
              toggleDialog();
            }}
            className={classes.footerBtns}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            form="new-form"
          >
            {t('Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// ////////////////////////////////////////// NO LEAD ASSIGNED
export function DialogNoLead(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {submitDialog, toggleDialog, open} = props;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Continue with no lead?')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="No lead assigned - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
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
                  {t(
                      'If you continue, the request will have no lead and the requester will be notified of the change.',
                  )}
                </Alert>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitDialog(e);
              }
            }}
          >
            {t('Continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// ////////////////////////////////////////// ASSIGN AS LEAD
export function DialogAssignAsLead(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open, handleAssignMeAs, origin} = props;
  const [snackbar, setSnackbar] = React.useState({
    snackbarAssignLead: false,
  });
  const initial = {
    // blank object used to reset state
    phone: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  };
  const [state, setState] = React.useState({
    phone: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });

  const phoneExp = /^[+][1]\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}/;

  const handleSnackbarOpen = (state) => {
    setSnackbar({...snackbar, [state]: true});
  };

  const handleSnackbarClose = (state) => {
    setSnackbar({...snackbar, [state]: false});
  };

  const handleChange = (e, val) => {
    const comment = e.target.value.trim();
    setState({
      ...state,
      [val]: {
        // updates state with text from input
        ...state[val],
        text: comment,
      },
    });

    if (e.target.value.match(phoneExp) && state[val].errorText) {
      // if input text is valid, clear error
      setState({
        ...state,
        [val]: {
          ...state[val],
          text: comment,
          errorText: '',
          invalid: '',
          commands: '',
        },
      });
    }
  };

  const validateForm = () => {
    let isError = false;
    if (!state.phone.text.match(phoneExp)) {
      isError = true;
      state.phone.invalid = t('Enter phone number.');
      state.phone.errorText = t('Enter phone number.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form and reset the inputs
      toggleDialog(e);
      setState({...initial});
      handleSnackbarOpen('snackbarAssignLead');
      if (origin === 'manageTeamDrawer') {
        handleAssignMeAs(state.phone.text, 'lead');
      }
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'phone':
              document.getElementById('phone-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

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

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setState({...initial});
          toggleDialog();
        }}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Assign me as lead')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Assign me as lead - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={submitForm} noValidate id="assign-form">
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="body2">
                    {t(
                        'To assign yourself to the request you must first enter a secure phone number',
                    )}
                  </Typography>
                </div>
              </div>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined" className={classes.textField}>
                    <NumberFormat
                      id="phone-input"
                      label={t('Phone number')}
                      aria-label={t('Phone number')}
                      value={state.phone.text}
                      customInput={TextField}
                      type="text"
                      variant="outlined"
                      format="+1 (###) ### ####"
                      mask="_"
                      allowEmptyFormatting
                      autoComplete="phone"
                      error={Boolean(state.phone.errorText)}
                      helperText={state.phone.errorText}
                      required
                      onCut={(e) => disableCutCopyPaste(e, 'cut', 'phone')}
                      onCopy={(e) => disableCutCopyPaste(e, 'copy', 'phone')}
                      onPaste={(e) => disableCutCopyPaste(e, 'paste', 'phone')}
                      onChange={(e) => handleChange(e, 'phone')}
                      onClick={() => toggleHelperText('phone')}
                      onBlur={() => toggleHelperText('phone')}
                      onFocus={() => toggleHelperText('phone')}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              setState({...initial});
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            form="assign-form"
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitForm(e);
              }
            }}
          >
            {t('Assign')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAssignLead
        open={snackbar.snackbarAssignLead}
        handleClose={() => handleSnackbarClose('snackbarAssignLead')}
      />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// ASSIGN AS SUPPORT
export function DialogAssignAsSupport(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open, handleAssignMeAs, origin} = props;
  const [snackbar, setSnackbar] = React.useState({
    snackbarAssignSupport: false,
  });
  const initial = {
    // blank object used to reset state
    phone: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  };
  const [state, setState] = React.useState({
    phone: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });

  const phoneExp = /^[+][1]\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}/;

  const handleSnackbarOpen = (state) => {
    setSnackbar({...snackbar, [state]: true});
  };

  const handleSnackbarClose = (state) => {
    setSnackbar({...snackbar, [state]: false});
  };

  const handleChange = (e, val) => {
    const comment = e.target.value.trim();
    setState({
      ...state,
      [val]: {
        // updates state with text from input
        ...state[val],
        text: comment,
      },
    });

    if (e.target.value.match(phoneExp) && state[val].errorText) {
      // if input text is valid, clear error
      setState({
        ...state,
        [val]: {
          ...state[val],
          text: comment,
          errorText: '',
          invalid: '',
          commands: '',
        },
      });
    }
  };

  const validateForm = () => {
    let isError = false;
    if (!state.phone.text.match(phoneExp)) {
      isError = true;
      state.phone.invalid = t('Enter phone number.');
      state.phone.errorText = t('Enter phone number.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }

    return isError;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (!err) {
      // if no errors exist, submit the form and reset the inputs
      toggleDialog(e);
      setState({...initial});
      handleSnackbarOpen('snackbarAssignSupport');
      if (origin === 'manageTeamDrawer') {
        handleAssignMeAs(state.phone.text, 'support');
      }
    } else {
      for (const property in state) {
        // focus on the first input that has an error on submit
        if (state[property].invalid) {
          switch (property) {
            case 'phone':
              document.getElementById('phone-input').focus();
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  };

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

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setState({...initial});
          toggleDialog();
        }}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Assign me as support')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Assign me as support - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={submitForm} noValidate id="assign-form">
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="body2">
                    {t(
                        'To assign yourself to the request you must first enter a secure phone number',
                    )}
                  </Typography>
                </div>
              </div>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <FormControl variant="outlined" className={classes.textField}>
                    <NumberFormat
                      id="phone-input"
                      label={t('Phone number')}
                      aria-label={t('Phone number')}
                      value={state.phone.text}
                      customInput={TextField}
                      type="text"
                      variant="outlined"
                      format="+1 (###) ### ####"
                      mask="_"
                      allowEmptyFormatting
                      autoComplete="phone"
                      error={Boolean(state.phone.errorText)}
                      helperText={state.phone.errorText}
                      required
                      onCut={(e) => disableCutCopyPaste(e, 'cut', 'phone')}
                      onCopy={(e) => disableCutCopyPaste(e, 'copy', 'phone')}
                      onPaste={(e) => disableCutCopyPaste(e, 'paste', 'phone')}
                      onChange={(e) => handleChange(e, 'phone')}
                      onClick={() => toggleHelperText('phone')}
                      onBlur={() => toggleHelperText('phone')}
                      onFocus={() => toggleHelperText('phone')}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              setState({...initial});
              toggleDialog(e);
            }}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.footerBtns}
            form="assign-form"
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitForm(e);
              }
            }}
          >
            {t('Assign')}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAssignSupport
        open={snackbar.snackbarAssignSupport}
        handleClose={() => handleSnackbarClose('snackbarAssignSupport')}
      />
    </React.Fragment>
  );
}

// ////////////////////////////////////////// DELETE
export function DialogDelete(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {submitDialog, toggleDialog, open} = props;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
        disableBackdropClick
        scroll="paper"
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.vettingContainerTitle}>
            <Typography variant="h6">{t('Delete permanently?')}</Typography>
            <IconButton
              id="dialog-close"
              onClick={toggleDialog}
              edge="end"
              aria-label="Delete permanently - close"
              onKeyPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  toggleDialog(e);
                }
              }}
            >
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
                  {t('If you delete this item, it cannot be undone.')}
                </Alert>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitDialog}
            className={classes.footerBtns}
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                submitDialog(e);
              }
            }}
          >
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
