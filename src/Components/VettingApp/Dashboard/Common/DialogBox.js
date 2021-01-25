import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  IconButton,
  InputLabel,
  Select,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';

import CustomizedSnackbar from './CustomizedSnackbar';
import {AnalystMenu} from './ContextMenu';
import {analystList} from '../../../../Data/fakeData';

const ROW_HEIGHT = 56;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        'width': '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
        'background-color': 'white',
      },
      '& .MuiOutlinedInput-multiline': {
        'padding': 0,
      },
      '& .MuiOutlinedInput-inputMultiline': {
        'max-height': 130,
        'overflow': 'auto !important',
        'padding': theme.spacing(2),
      },
      '& .MuiAutocomplete-endAdornment': {
        'top': '5.5px',
      },
    },
    '& .MuiFormControl-root': {
      'width': '100%',
    },
    '& .MuiFormControlLabel-root': {
      'margin-left': '0px',
      'flex-basis': '50%',
      'height': '100%',
      '&:last-child': {
        'margin-right': '0px',
      },
      '& .MuiTextField-root': {
        'width': '100% !important',
      },
    },
    '& .MuiFormHelperText-root': {
      'color': '#E91B0C',
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
    height: '100%',
  },
  hiddenRow: {
    display: 'none',
  },
  dialogText: {
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
  dialogFooter: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: theme.spacing(1),
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
}));

// ////////////////////////////////////////// ANALYST INFORMATION
export function DialogAnalyst(props) {
  const {open, toggleDialog} = props;
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog onClose={toggleDialog} aria-labelledby="dashboard-dialog-title" open={open} className={classes.root}>
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>{t('Analyst information')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Analyst information - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
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
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="contained" color="primary" onClick={toggleDialog}>
            {t('Go back')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// MANAGE TEAM
export function DialogManageTeam(props) {
  const {open, toggleDialog} = props;
  const {t} = useTranslation();
  const classes = useStyles();
  const [analysts, setAnalysts] = React.useState(analystList);
  const [selected, setSelected] = React.useState([]);

  const makeLead = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
            item.role === 'lead' ?
            {...item, role: 'support'}:
            item.id === value.id ?
            {...item, role: 'lead'} :
            item,
        ));
  };

  const makeSupport = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
          item.id === value.id ?
          {...item, role: 'support'} :
          item,
        ));
  };

  const unassignRequest = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ?
        {...item, assigned: false, role: 'support'} :
        item,
        ));
  };

  function selectSupports(value) {
    const ids = value.map((item) => {
      return item.id;
    });

    setAnalysts(
        analysts.map((item) =>
        ids.includes(item.id) ?
        {...item, assigned: true, role: 'support'} :
        item,
        ));

    setSelected([]);
  };

  const leadAnalysts = () => {
    const content = analysts.filter((analyst) => analyst.assigned && analyst.role === 'lead').map((analyst, index) => {
      return (
        <div className={classes.dialogRow} key={analyst.id}>
          <Avatar >
            <Icon path={mdiAccount} size={1} />
          </Avatar>
          <div className={classes.analystListing}>
            <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
            <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
          </div>
          <AnalystMenu
            role={'lead'}
            makeSupport={makeSupport(analyst)}
            unassignRequest={unassignRequest(analyst)}
            controls={index}
          />
        </div>
      );
    });
    if (content.length > 0 ) {
      return content;
    } else {
      return (
        <div className={classes.dialogRow}>
          <Box fontStyle="italic" className={classes.box}>
            <Typography>{t('No lead assigned')}</Typography>
          </Box>
        </div>
      );
    }
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
            <Typography variant='h6'>{t('Manage team')}</Typography>
            <IconButton
              id='dialog-close'
              edge='end'
              onClick={toggleDialog}
              aria-label="Manage team - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>{t('Lead')}</Typography>
        </div>
        {leadAnalysts()}
        <Divider className='mt-2 mb-2'/>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <Autocomplete
              value={selected}
              multiple
              limitTags={2}
              clearOnEscape={true}
              disableCloseOnSelect={true}
              id="analyst-multiselect"
              options={analysts.filter((analyst) => !analyst.assigned)}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setSelected(value);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    label={t('Search support analysts')}
                  />
                );
              }
              }
            />
          </FormControl>
        </div>
        <div className={classes.dialogRow}>
          <Button variant="outlined" color="primary" onClick={() => selectSupports(selected)} >
            {t('Add support analyst')}
          </Button>
        </div>
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2' className='mt-2'>{t('Support Analysts')}</Typography>
        </div>
        <div className={classes.supportAnalysts}>
          {analysts.filter((analyst) => analyst.assigned && analyst.role === 'support').map((analyst, index) => {
            return (
              <div className={classes.dialogRow} key={analyst.id}>
                <Avatar >
                  <Icon path={mdiAccount} size={1} />
                </Avatar>
                <div className={classes.analystListing}>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
                </div>
                <AnalystMenu
                  role={'support'}
                  makeLead={makeLead(analyst)}
                  unassignRequest={unassignRequest(analyst)}
                  controls={index}
                />
              </div>
            );
          })
          }
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Apply')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// WITHDRAW REQUEST
export function DialogWithdraw(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);
  const initial = {
    comments: '',
    commentsErr: '',
  };
  const [state, setState] = React.useState({
    comments: '',
    commentsErr: '',
  });

  const handleChange = (e) => {
    const comment = e.target.value;
    setState({...state, comments: comment});
  };

  const toggleSnackbar = () => {
    toggleDialog();
    setSnackbar(!snackbar);
    setState({...initial});
  };

  const SnackbarClose =() =>{
    setSnackbar(false);
  };

  const validateForm = () => {
    let isError = false;
    if (state.comments.trim() === '') {
      isError = true;
      state.commentsErr = t('Enter some comments.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }
    return isError;
  };

  const submitForm = () => {
    const err = validateForm();
    if (!err) {
      toggleSnackbar();
    }
  };

  const disableCutCopyPaste = (e, value) => {
    e.preventDefault();
    switch (value) {
      case 'cut':
        setState({...state, commentsErr: t('Cut has been disabled for security purposes.')});
        break;
      case 'copy':
        setState({...state, commentsErr: t('Copy has been disabled for security purposes.')});
        break;
      case 'paste':
        setState({...state, commentsErr: t('Paste has been disabled for security purposes.')});
        break;
      default:
        state.commentsErr('');
        break;
    }
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
            <Typography variant='h6'>{t('Withdraw request')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Withdraw request - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <form onSubmit={submitForm} noValidate>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                id="withdraw-input"
                label={t('Comments')}
                value={state.comments}
                onChange={handleChange}
                variant="outlined"
                placeholder={t('Please provite us with a withdrawal reason')}
                multiline
                error={Boolean(state.commentsErr)}
                helperText={state.commentsErr}
                onCut={(e) => disableCutCopyPaste(e, 'cut')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste')}
                required
              />
            </FormControl>
          </div>
          <Divider className="mt-2" />
          <div className={classes.dialogFooter}>
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
              variant="contained"
              color="primary"
              className={classes.footerBtns}
              type="submit"
            >
              {t('Withdraw request')}
            </Button>
          </div>
        </form>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request has been withdrawn')}
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// UNASSIGN REQUEST
export function DialogUnassign(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;

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
            <Typography variant='h6'>{t('Unassign from me')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Unassign from me - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='body2'>
            {t('If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.')}
          </Typography>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Unassign')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// MAKE ME SUPPORT
export function DialogSupport(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;

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
            <Typography variant='h6'>{t('Make me support')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Make me support - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='body2'>
            {t('If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.')}
          </Typography>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Continue')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// ASSIGN TO ME
export function DialogAssign(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const initial = {
    phone: '',
    phoneErr: '',
  };
  const [state, setState] = React.useState({
    phone: '',
    phoneErr: '',
  });

  const phoneExp = /^[+][1]\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}/;

  const handleChange = (prop) => (event) => {
    setState({...state, [prop]: event.target.value});
  };

  const validatePhone = () => {
    let isError = false;
    if (!state.phone.match(phoneExp)) {
      isError = true;
      state.phoneErr = t('Enter an phone number.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }
    return isError;
  };

  const submitPhone = () => {
    const err = validatePhone();
    if (!err) {
      toggleDialog();
      setState({...initial});
    }
  };

  const disableCutCopyPaste = (e, value) => {
    e.preventDefault();
    switch (value) {
      case 'cut':
        setState({...state, phoneErr: t('Cut has been disabled for security purposes.')});
        break;
      case 'copy':
        setState({...state, phoneErr: t('Copy has been disabled for security purposes.')});
        break;
      case 'paste':
        setState({...state, phoneErr: t('Paste has been disabled for security purposes.')});
        break;
      default:
        state.phoneErr('');
        break;
    }
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
            <Typography variant='h6'>{t('Assign to me')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Assign to me - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <form onSubmit={() => submitPhone()}>
          <div className={classes.dialogRow}>
            <Typography variant='subtitle2'>{t('Provide a phone number')}</Typography>
          </div>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" className={classes.textField}>
              <NumberFormat
                id='phone'
                label={t('Phone number')}
                customInput={TextField}
                type="text"
                variant='outlined'
                format="+1 (###) ### ####"
                mask="_"
                allowEmptyFormatting
                autoComplete='phone'
                error={Boolean(state.phoneErr)}
                helperText={state.phoneErr}
                onChange={handleChange('phone')}
                onCut={(e) => disableCutCopyPaste(e, 'cut')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste')}
                required
              />
            </FormControl>
          </div>
          <Divider className="mt-2" />
          <div className={classes.dialogFooter}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setState({...initial});
                toggleDialog();
              }}
              className={classes.footerBtns}>
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.footerBtns}
            >
              {t('Continue')}
            </Button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
}


// ////////////////////////////////////////// REQUEST AN UPDATE
export function DialogUpdate(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {toggleDialog, open} = props;
  const initial = {
    comments: '',
    commentsErr: '',
  };
  const [state, setState] = React.useState({
    comments: '',
    commentsErr: '',
  });

  const handleChange = (e) => {
    const comment = e.target.value;
    setState({...state, comments: comment});
  };

  const validateForm = () => {
    let isError = false;
    if (state.comments.trim() === '') {
      isError = true;
      state.commentsErr = t('Enter some comments.');
    }

    if (isError) {
      setState({
        ...state,
      });
    }
    return isError;
  };

  const submitForm = () => {
    const err = validateForm();
    if (!err) {
      setState({...initial});
      toggleDialog();
    }
  };

  const disableCutCopyPaste = (e, value) => {
    e.preventDefault();
    switch (value) {
      case 'cut':
        setState({...state, commentsErr: t('Cut has been disabled for security purposes.')});
        break;
      case 'copy':
        setState({...state, commentsErr: t('Copy has been disabled for security purposes.')});
        break;
      case 'paste':
        setState({...state, commentsErr: t('Paste has been disabled for security purposes.')});
        break;
      default:
        state.commentsErr('');
        break;
    }
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
            <Typography variant='h6'>{t('Request an update')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Request an update - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <form onSubmit={submitForm} noValidate>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                id="update-input"
                label={t('Comments')}
                variant="outlined"
                multiline
                value={state.comments}
                onChange={handleChange}
                className={classes.textField}
                error={Boolean(state.commentsErr)}
                helperText={state.commentsErr}
                onCut={(e) => disableCutCopyPaste(e, 'cut')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste')}
                required
              />
            </FormControl>
          </div>
          <Divider className="mt-2" />
          <div className={classes.dialogFooter}>
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
            >
              {t('Submit request')}
            </Button>
          </div>
        </form>
      </Dialog>
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
    hours: '',
    minutes: '',
    reason: '',
    comments: '',
    hoursErr: '',
    minutesErr: '',
    reasonErr: '',
    commentsErr: '',
  };
  const [state, setState] = React.useState({
    hours: '',
    minutes: '',
    reason: '',
    comments: '',
    hoursErr: '',
    minutesErr: '',
    reasonErr: '',
    commentsErr: '',
  });

  const handleChange = (e, val) => {
    const comment = e.target.value;
    setState({...state, [val]: comment});
  };

  const disableCutCopyPaste = (e, value, field) => {
    e.preventDefault();
    switch (value) {
      case 'cut':
        setState({...state, [field]: t('Cut has been disabled for security purposes.')});
        break;
      case 'copy':
        setState({...state, [field]: t('Copy has been disabled for security purposes.')});
        break;
      case 'paste':
        setState({...state, [field]: t('Paste has been disabled for security purposes.')});
        break;
      default:
        state.commentsErr('');
        break;
    }
  };

  const SnackbarClose =() =>{
    setSnackbar(false);
  };

  const validateForm = () => {
    let isError = false;
    if (state.reason === '') {
      isError = true;
      state.reasonErr = t('Select a reason.');
    } else {
      if (state.comments.trim() === '') {
        isError = true;
        state.commentsErr = t('Enter some comments.');
      }
    }

    if (isError) {
      setState({
        ...state,
      });
    }
    return isError;
  };

  const submitForm = () => {
    const err = validateForm();
    if (!err) {
      toggleDialog();
      setSnackbar(!snackbar);
      setState({...initial});
    }
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
            <Typography variant='h6'>{t('Deny request')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Deny request - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <form onSubmit={submitForm} noValidate>
          <div className={classes.dialogRow}>
            <Typography variant='subtitle2'>{t('Billable hours')}</Typography>
          </div>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" className={classes.formControl}>
              <FormControlLabel
                control={
                  <NumberFormat
                    label={t('Hours')}
                    aria-label={t('Hours')}
                    customInput={TextField}
                    type="text"
                    variant='outlined'
                    error={Boolean(state.hoursErr)}
                    helperText={state.hoursErr}
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'hoursErr')}
                    onCopy={(e) => disableCutCopyPaste(e, 'copy', 'hoursErr')}
                    onPaste={(e) => disableCutCopyPaste(e, 'paste', 'hoursErr')}
                    onChange={(e) => handleChange(e, 'hours')}
                    value={state.hours}
                  />
                }
              />
              <FormControlLabel
                control={
                  <NumberFormat
                    label={t('Minutes')}
                    aria-label={t('Minutes')}
                    customInput={TextField}
                    type="text"
                    variant='outlined'
                    isAllowed={(values) => {
                      const {formattedValue, floatValue} = values;
                      return formattedValue === '' || floatValue <= 60;
                    }}
                    error={Boolean(state.minutesErr)}
                    helperText={state.minutesErr}
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'minutesErr')}
                    onCopy={(e) => disableCutCopyPaste(e, 'copy', 'minutesErr')}
                    onPaste={(e) => disableCutCopyPaste(e, 'paste', 'minutesErr')}
                    onChange={(e) => handleChange(e, 'minutes')}
                    value={state.minutes}
                  />
                }
              />
            </FormControl>
          </div>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" required>
              <InputLabel htmlFor="denied-select-label">{t('Denied reason')}</InputLabel>
              <Select
                native
                inputProps={{
                  id: 'denied-select-label',
                }}
                label={t('Denied reason')}
                fullWidth
                placeholder={t('Select an option')}
                onChange={(e) => handleChange(e, 'reason')}
                error={Boolean(state.reasonErr)}
              >
                <option value=""></option>
                <option value='Non-SSI project'>{t('Non-SSI project')}</option>
                <option value='Confidential requirements are not met'>{t('Confidential requirements are not met')}</option>
                <option value='Request is missing information'>{t('Request is missing information')}</option>
                <option value='Output file(s) are not in line with the project proposal'>{t('Output file(s) are not in line with the project proposal')}</option>
                <option value='Other'>{t('Other')}</option>
              </Select>
              <FormHelperText>{state.reasonErr}</FormHelperText>
            </FormControl>
          </div>
          <div className={clsx(classes.dialogRow, {
            [classes.hiddenRow]: state.reason !== 'Other',
          })}>
            <FormControl variant="outlined">
              <TextField
                id="withdraw-input"
                label={t('Comments')}
                variant="outlined"
                multiline
                required
                error={Boolean(state.commentsErr)}
                helperText={state.commentsErr}
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'commentsErr')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'commentsErr')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'commentsErr')}
                onChange={(e) => handleChange(e, 'comments')}
                value={state.comments}
              />
            </FormControl>
          </div>
          <Divider className="mt-2" />
          <div className={classes.dialogFooter}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setState({...initial});
                toggleDialog();
              }}
              className={classes.footerBtns}>
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.footerBtns}>
              {t('Submit')}
            </Button>
          </div>
        </form>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request 10-2020-2354326 has been denied')}
        toggleSnackbar={SnackbarClose}
      />
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
    hoursErr: '',
    minutesErr: '',
  };
  const [state, setState] = React.useState({
    hoursErr: '',
    minutesErr: '',
  });

  const disableCutCopyPaste = (e, value, field) => {
    e.preventDefault();
    switch (value) {
      case 'cut':
        setState({...state, [field]: t('Cut has been disabled for security purposes.')});
        break;
      case 'copy':
        setState({...state, [field]: t('Copy has been disabled for security purposes.')});
        break;
      case 'paste':
        setState({...state, [field]: t('Paste has been disabled for security purposes.')});
        break;
      default:
        state.commentsErr('');
        break;
    }
  };

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
            <Typography variant='h6'>{t('Approve request')}</Typography>
            <IconButton
              id='dialog-close'
              onClick={toggleDialog}
              edge='end'
              aria-label="Approve request - close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <form onSubmit={toggleSnackbar} >
          <div className={classes.dialogRow}>
            <Typography variant='subtitle2'>{t('Billable hours')}</Typography>
          </div>
          <div className={classes.dialogRow}>
            <FormControl variant="outlined" className={classes.formControl}>
              <FormControlLabel
                control={
                  <NumberFormat
                    label={t('Hours')}
                    customInput={TextField}
                    type="text"
                    variant='outlined'
                    error={Boolean(state.hoursErr)}
                    helperText={state.hoursErr}
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'hoursErr')}
                    onCopy={(e) => disableCutCopyPaste(e, 'copy', 'hoursErr')}
                    onPaste={(e) => disableCutCopyPaste(e, 'paste', 'hoursErr')}
                  />
                }
              />
              <FormControlLabel
                control={
                  <NumberFormat
                    label={t('Minutes')}
                    customInput={TextField}
                    type="text"
                    variant='outlined'
                    isAllowed={(values) => {
                      const {formattedValue, floatValue} = values;
                      return formattedValue === '' || floatValue <= 60;
                    }}
                    error={Boolean(state.minutesErr)}
                    helperText={state.minutesErr}
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'minutesErr')}
                    onCopy={(e) => disableCutCopyPaste(e, 'copy', 'minutesErr')}
                    onPaste={(e) => disableCutCopyPaste(e, 'paste', 'minutesErr')}
                  />
                }
              />
            </FormControl>
          </div>
          <Divider className="mt-2" />
          <div className={classes.dialogFooter}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setState({...initial});
                toggleDialog();
              }}
              className={classes.footerBtns}>
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.footerBtns}>
              {t('Submit')}
            </Button>
          </div>
        </form>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request 10-2020-2354326 has been approved')}
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}
