import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
  },
  radioMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  lineHeight: {
    lineHeight: 'normal',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  hiddenRow: {
    display: 'none',
  },
  appBar: {
    'backgroundColor': theme.palette.common.white,
    'margin': theme.spacing(0, -3, 3, 0),
    'boxShadow': theme.shadows[0],
    'borderBottom': '1px solid',
    'borderBottomColor': theme.palette.divider,
    'position': 'fixed',
    'top': 0,
    'zIndex': 500,
    'width': '400px',
    '& .MuiToolbar-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(0, 3),
    },
  },
  body: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2, 3, 2, 3),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(-3),
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    position: 'fixed',
    bottom: 0,
    width: '400px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  buttonTooltip: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
}));

export function EditVirtualMachine(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Edit virtual machine details
          </Typography>
          <IconButton
            aria-label="Close edit researcher"
            className={classes.margin}
            edge="end"
            onClick={(e) => props.toggleDrawer(e, 'editVirtualMachine', false)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <VirtualMachineDetails {...props} />
      </div>
      <div className={classes.footer}>
        <Button
          className="mr-2"
          variant="outlined"
          color="primary"
          onClick={(e) => props.toggleDrawer(e, 'editVirtualMachine', false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.editVirtualMachine}
        >
          Edit virtual machine details
        </Button>
      </div>
    </React.Fragment>
  );
}

export function AddVirtualMachine(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Add virtual machine details
          </Typography>
          <IconButton
            aria-label="Close add virtual machine"
            className={classes.margin}
            edge="end"
            onClick={(e) => props.toggleDrawer(e, 'addVirtualMachine', false)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <VirtualMachineDetails {...props} />
      </div>
      <div className={classes.footer}>
        <Button
          className="mr-2"
          variant="outlined"
          color="primary"
          onClick={(e) => props.toggleDrawer(e, 'addVirtualMachine', false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.addVirtualMachine}
        >
          Add virtual machine details
        </Button>
      </div>
    </React.Fragment>
  );
}

function VirtualMachineDetails(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    includeWeightVariable: null,
    linkedData: null,
    descriptiveStats: null,
    modifiedWeights: null,
    covariance: null,
    snackbarDelete: false,
    dialogDelete: false,
    cloudemail: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    username: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    firstname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    lastName: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    securityClearanceExpiryDate: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    researcherID: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    organization: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    phoneNumber: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    email: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    virtualmachinename: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
  });

  const initial = {
    // blank object used to reset state
    cloudemail: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    username: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    firstname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    lastName: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    securityClearanceExpiryDate: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: ')',
    },
    researcherID: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    organization: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    phoneNumber: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    email: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    virtualmachinename: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
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
            helperText: msg,
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
            helperText: msg,
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
            helperText: msg,
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
            helperText: state[value].invalid,
          },
        });
      } else {
        // clear error text if no invalid error exists
        setState({
          ...state,
          [value]: {
            ...state[value],
            helperText: initial[value].helperText,
            errorText: initial[value].errorText,
          },
        });
      }
    }
  };

  /*  const handleClickOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClickClose = (element) => {
    setState({...state, [element]: false});
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleDeleteFile = () => {
    setState({...state, dialogDelete: false, snackbarDelete: true});
  }; */

  return (
    <>
      <Typography variant="subtitle1">Personal information</Typography>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="cloudemail"
        label="Cloud account email"
        variant="outlined"
        fullWidth
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'cloudemail')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'cloudemail')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'cloudemail')}
        onClick={() => toggleHelperText('cloudemail')}
        onBlur={() => toggleHelperText('cloudemail')}
        onFocus={() => toggleHelperText('cloudemail')}
        defaultValue={state.email.text}
        error={Boolean(state.cloudemail.errorText)}
        helperText={state.cloudemail.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="username"
        label="Username"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'username')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'username')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'username')}
        onClick={() => toggleHelperText('username')}
        onBlur={() => toggleHelperText('username')}
        onFocus={() => toggleHelperText('username')}
        defaultValue={state.username.text}
        error={Boolean(state.username.errorText)}
        helperText={state.username.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="firstname"
        label="First name"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'firstname')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'firstname')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'firstname')}
        onClick={() => toggleHelperText('firstname')}
        onBlur={() => toggleHelperText('firstname')}
        onFocus={() => toggleHelperText('firstname')}
        defaultValue={state.firstname.text}
        error={Boolean(state.firstname.errorText)}
        helperText={state.firstname.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="lastName"
        label="Last name"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'lastName')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'lastName')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'lastName')}
        onClick={() => toggleHelperText('lastName')}
        onBlur={() => toggleHelperText('lastName')}
        onFocus={() => toggleHelperText('lastName')}
        defaultValue={state.lastName.text}
        error={Boolean(state.lastName.errorText)}
        helperText={state.lastName.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="securityClearanceExpiryDate"
        // label="Security clearance expiry date"
        variant="outlined"
        fullWidth
        required
        type="date"
        onCut={(e) =>
          disableCutCopyPaste(e, 'cut', 'securityClearanceExpiryDate')
        }
        onCopy={(e) =>
          disableCutCopyPaste(e, 'copy', 'securityClearanceExpiryDate')
        }
        onPaste={(e) =>
          disableCutCopyPaste(e, 'paste', 'securityClearanceExpiryDate')
        }
        onClick={() => toggleHelperText('securityClearanceExpiryDate')}
        onBlur={() => toggleHelperText('securityClearanceExpiryDate')}
        onFocus={() => toggleHelperText('securityClearanceExpiryDate')}
        defaultValue={state.securityClearanceExpiryDate.text}
        error={Boolean(state.securityClearanceExpiryDate.errorText)}
        helperText={state.securityClearanceExpiryDate.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="researcherID"
        label="Researcher ID"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'researcherID')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'researcherID')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'researcherID')}
        onClick={() => toggleHelperText('researcherID')}
        onBlur={() => toggleHelperText('researcherID')}
        onFocus={() => toggleHelperText('researcherID')}
        defaultValue={state.researcherID.text}
        error={Boolean(state.researcherID.errorText)}
        helperText={state.researcherID.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="organization"
        label="Organization"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'organization')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'organization')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'organization')}
        onClick={() => toggleHelperText('organization')}
        onBlur={() => toggleHelperText('organization')}
        onFocus={() => toggleHelperText('organization')}
        defaultValue={state.organization.text}
        error={Boolean(state.organization.errorText)}
        helperText={state.organization.helperText}
      />
      <Typography variant="subtitle1">Contact information</Typography>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="phoneNumber"
        label="Phone number"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'phoneNumber')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'phoneNumber')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'phoneNumber')}
        onClick={() => toggleHelperText('phoneNumber')}
        onBlur={() => toggleHelperText('phoneNumber')}
        onFocus={() => toggleHelperText('phoneNumber')}
        defaultValue={state.phoneNumber.text}
        error={Boolean(state.phoneNumber.errorText)}
        helperText={state.phoneNumber.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'email')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'email')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'email')}
        onClick={() => toggleHelperText('email')}
        onBlur={() => toggleHelperText('email')}
        onFocus={() => toggleHelperText('email')}
        defaultValue={state.email.text}
        helperText={state.email.helperText}
        error={Boolean(state.email.errorText)}
      />
      <Typography variant="subtitle1">vDL information</Typography>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="virtualmachinename"
        label="Virtual machine name"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'virtualmachinename')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'virtualmachinename')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'virtualmachinename')}
        onClick={() => toggleHelperText('virtualmachinename')}
        onBlur={() => toggleHelperText('virtualmachinename')}
        onFocus={() => toggleHelperText('virtualmachinename')}
        defaultValue={state.virtualmachinename.text}
        error={Boolean(state.virtualmachinename.errorText)}
        helperText={state.virtualmachinename.helperText}
      />
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <RadioGroup id="virtualmachinename" name="virtualmachinename">
          <FormLabel component="legend">Virtual machine name</FormLabel>
          <FormControlLabel
            control={<Radio color="primary" />}
            value="English"
            label="English"
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            value="French"
            label="French"
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <RadioGroup id="requiredtools" name="requiredtools">
          <FormLabel component="legend">Required tools</FormLabel>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            value="Default tools"
            label="Default tools"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            value="SAS"
            label="SAS"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            value="SPSS"
            label="SPSS"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            value="STATA"
            label="STATA"
          />
        </RadioGroup>
      </FormControl>
      <React.Fragment>
        <AppBar position="static" className={classes.appBar} color="default">
          <Toolbar>
            <Typography variant="h6" component="h2" className={classes.title}>
              Add virtual machine details
            </Typography>
            <IconButton
              aria-label="Close add researcher"
              className={classes.margin}
              edge="end"
              onClick={(e) => props.toggleDrawer(e, 'addResearcher', false)}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.footer}>
          <Button
            className="mr-2"
            variant="outlined"
            color="primary"
            onClick={(e) => props.toggleDrawer(e, 'addResearcher', false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.addResearcher}
          >
            Add virtual machine details
          </Button>
        </div>
      </React.Fragment>
    </>
  );
}
