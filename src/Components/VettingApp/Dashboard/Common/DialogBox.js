import React from 'react';
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
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog onClose={toggleDialog} aria-labelledby="dashboard-dialog-title" open={open} className={classes.root}>
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Analyst information</Typography>
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
            Go back
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogManageTeam(props) {
  const {open, toggleDialog} = props;
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
    const content = analysts.filter((analyst) => analyst.assigned && analyst.role === 'lead').map((analyst) => {
      return (
        <div className={classes.dialogRow} key={analyst.id}>
          <Avatar >
            <Icon path={mdiAccount} size={1} />
          </Avatar>
          <div className={classes.analystListing}>
            <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
            <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
          </div>
          <AnalystMenu role={'lead'} makeSupport={makeSupport(analyst)} unassignRequest={unassignRequest(analyst)}/>
        </div>
      );
    });
    if (content.length > 0 ) {
      return content;
    } else {
      return (
        <div className={classes.dialogRow}>
          <Box fontStyle="italic" className={classes.box}>
            <Typography>No lead assigned</Typography>
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
            <Typography variant='h6'>Manage team</Typography>
            <IconButton
              edge='end'
              onClick={toggleDialog}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>Lead</Typography>
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
                    label='Search support analysts'
                  />
                );
              }
              }
            />
          </FormControl>
        </div>
        <div className={classes.dialogRow}>
          <Button variant="outlined" color="primary" onClick={() => selectSupports(selected)} >
            Add support analyst
          </Button>
        </div>
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2' className='mt-2'>Support Analysts</Typography>
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
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Apply
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
            <Typography variant='h6'>Withdraw request</Typography>
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
              label="Comments *"
              variant="outlined"
              placeholder="Please provite us with a withdrawal reason"
              multiline
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
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

export function DialogUnassign(props) {
  const classes = useStyles();
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
            <Typography variant='h6'>Unassign from me</Typography>
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
            If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.
          </Typography>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Unassign
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogSupport(props) {
  const classes = useStyles();
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
            <Typography variant='h6'>Make me support</Typography>
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
            If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.
          </Typography>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Continue
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogAssign(props) {
  const classes = useStyles();
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
            <Typography variant='h6'>Assign to me</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>Provide a phone number</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <NumberFormat
              label='Phone number *'
              customInput={TextField}
              type="text"
              variant='outlined'
              format="+1 (###) ### ####"
              mask="_"
              allowEmptyFormatting
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Continue
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogUpdate(props) {
  const classes = useStyles();
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
            <Typography variant='h6'>Request an update</Typography>
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
              label="Comments *"
              variant="outlined"
              multiline
              className={classes.textField}
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Submit request
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogDenied(props) {
  const classes = useStyles();
  const {toggleDialog, open} = props;
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
            <Typography variant='h6'>Deny request</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>Billable hours</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              {...props}
              label='Hours'
              customInput={TextField}
              type="text"
              variant='outlined'
            />
            <NumberFormat
              {...props}
              label='Minutes'
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
            <InputLabel id="denied-select-label">Denied reason *</InputLabel>
            <Select
              labelId="denied-select-label"
              id="denied-select"
              onChange={handleChange}
              value={selected}
              label="Denied reason *"
              fullWidth
              placeholder='Select an option'
            >
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
              <MenuItem value='Non-SSI project'>Non-SSI project</MenuItem>
              <MenuItem value='Confidential requirements are not met'>Confidential requirements are not met</MenuItem>
              <MenuItem value='Request is missing information'>Request is missing information</MenuItem>
              <MenuItem value='Output file(s) are not in line with the project proposal'>Output file(s) are not in line with the project proposal</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={clsx(classes.dialogRow, {
          [classes.hiddenRow]: selected !== 'Other',
        })}>
          <FormControl variant="outlined">
            <TextField
              id="withdraw-input"
              label="Comments *"
              variant="outlined"
              multiline
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            Submit
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message="Vetting request 10-2020-2354326 has been denied"
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}

export function DialogApprove(props) {
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
            <Typography variant='h6'>Approve request</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>Billable hours</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              {...props}
              label='Hours'
              customInput={TextField}
              type="text"
              variant='outlined'
            />
            <NumberFormat
              {...props}
              label='Minutes'
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
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            Submit
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message="Vetting request 10-2020-2354326 has been approved"
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}
