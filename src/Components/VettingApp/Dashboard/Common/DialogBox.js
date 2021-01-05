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
  MenuItem,
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
              onClick={toggleDialog}
              edge='end'>
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
              edge='end'
              onClick={toggleDialog}>
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
          {analysts.filter((analyst) => analyst.assigned && analyst.role === 'support').map((analyst) => {
            return (
              <div className={classes.dialogRow} key={analyst.id}>
                <Avatar >
                  <Icon path={mdiAccount} size={1} />
                </Avatar>
                <div className={classes.analystListing}>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
                </div>
                <AnalystMenu role={'support'} makeLead={makeLead(analyst)} unassignRequest={unassignRequest(analyst)}/>
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

export function DialogWithdraw(props) {
  const classes = useStyles();
  const {t} = useTranslation();
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
            <Typography variant='h6'>{t('Withdraw request')}</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <TextField
              id="withdraw-input"
              label={t('Comments *')}
              variant="outlined"
              placeholder={t('Please provite us with a withdrawal reason')}
              multiline
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            {t('Withdraw request')}
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request has been withdrawn')}
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}

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
              onClick={toggleDialog}
              edge='end'>
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
              onClick={toggleDialog}
              edge='end'>
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
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>{t('Provide a phone number')}</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <NumberFormat
              id='phone'
              label={t('Phone number *')}
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
            variant="contained"
            color="primary"
            onClick={() => submitPhone()}
            className={classes.footerBtns}
          >
            {t('Continue')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogUpdate(props) {
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
            <Typography variant='h6'>{t('Request an update')}</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <TextField
              id="update-input"
              label={t('Comments *')}
              variant="outlined"
              multiline
              className={classes.textField}
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Submit request')}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogDenied(props) {
  const classes = useStyles();
  const {toggleDialog, open} = props;
  const {t} = useTranslation();
  const [snackbar, setSnackbar] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const toggleSnackbar = () => {
    toggleDialog();
    setSnackbar(!snackbar);
  };

  const SnackbarClose =() =>{
    setSnackbar(false);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
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
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>{t('Billable hours')}</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              {...props}
              label={t('Hours')}
              customInput={TextField}
              type="text"
              variant='outlined'
            />
            <NumberFormat
              {...props}
              label={t('Minutes')}
              customInput={TextField}
              type="text"
              variant='outlined'
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values;
                return formattedValue === '' || floatValue <= 60;
              }}
            />
          </FormControl>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined">
            <InputLabel id="denied-select-label">{t('Denied reason *')}</InputLabel>
            <Select
              labelId="denied-select-label"
              id="denied-select"
              onChange={handleChange}
              value={selected}
              label={t('Denied reason *')}
              fullWidth
              placeholder={t('Select an option')}
            >
              <MenuItem value="">
                <em>{t('Select an option')}</em>
              </MenuItem>
              <MenuItem value='Non-SSI project'>{t('Non-SSI project')}</MenuItem>
              <MenuItem value='Confidential requirements are not met'>{t('Confidential requirements are not met')}</MenuItem>
              <MenuItem value='Request is missing information'>{t('Request is missing information')}</MenuItem>
              <MenuItem value='Output file(s) are not in line with the project proposal'>{t('Output file(s) are not in line with the project proposal')}</MenuItem>
              <MenuItem value='Other'>{t('Other')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={clsx(classes.dialogRow, {
          [classes.hiddenRow]: selected !== 'Other',
        })}>
          <FormControl variant="outlined">
            <TextField
              id="withdraw-input"
              label={t('Comments *')}
              variant="outlined"
              multiline
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            {t('Submit')}
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request 10-2020-2354326 has been denied')}
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}

export function DialogApprove(props) {
  const classes = useStyles();
  const {t} = useTranslation();
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
            <Typography variant='h6'>{t('Approve request')}</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>{t('Billable hours')}</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              {...props}
              label={t('Hours')}
              customInput={TextField}
              type="text"
              variant='outlined'
            />
            <NumberFormat
              {...props}
              label={t('Minutes')}
              customInput={TextField}
              type="text"
              variant='outlined'
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values;
                return formattedValue === '' || floatValue <= 60;
              }}
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            {t('Submit')}
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Vetting request 10-2020-2354326 has been approved')}
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}
