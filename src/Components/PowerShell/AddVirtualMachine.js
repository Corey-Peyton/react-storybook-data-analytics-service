import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {analystList} from '../../Data/fakeData';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
  Grid,
  FormGroup,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
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
}));


export function EditVirtualMachine(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Update virtual machine details
          </Typography>
          <IconButton
            aria-label="Close edit virtual machine"
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
          Update
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
          Add
        </Button>
      </div>
    </React.Fragment>
  );
}

function VirtualMachineDetails(props) {
  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };
  const classes = useStyles();
  const {t} = useTranslation();
  const [state, setState] = React.useState({
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
    researcherID: {
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
    researcherID: {
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

  const security = [
    {label: 'Statistics Canada'},
    {label: 'Canada Revenue Agency'},
  ];

  return (
    <>
      <Typography variant="subtitle1" className="mb-2">
        User details
      </Typography>
      <Typography variant="body2" className="mb-2">
        If the cloud account email cannot be found it means it does not exist in
        Azure Active Directory. Submit a Jira ticket to the Cloud Jira project
        for assistance.
      </Typography>
      <Autocomplete
        id="combo-box-demo"
        options={analystList.map((option) => option.email)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cloud email"
            className={classes.inputMargin}
            variant="outlined"
          />
        )}
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="contract-start-date"
          className={classes.inputMargin}
          variant="inline"
          label={'Contract expiry date'}
          InputProps={{readOnly: true}}
          autoOk
          fullWidth
          margin="dense"
          format="mm/dd/yyyy"
          value={state.selectedFromDate}
          inputVariant="outlined"
          onChange={handleFromDateChange}
          disablePast
          PopoverProps={{
            'aria-modal': 'true',
          }}
          KeyboardButtonProps={{
            'aria-label': 'Select contract expiry date',
          }}
        />
      </MuiPickersUtilsProvider>
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
      <Autocomplete
        id="combo-box-demo"
        options={security}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Organization"
            className={classes.inputMargin}
            variant="outlined"
          />
        )}
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
      <Typography variant="subtitle1">Virtual machine details</Typography>
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
      <Grid container>
        <FormControl
          component="fieldset"
          className={classes.inputMargin}
          required
        >
          <RadioGroup id="virtualmachinename" name="virtualmachinename">
            <FormLabel component="legend">Virtual machine language</FormLabel>
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
      </Grid>
      <FormLabel component="legend" required>
        Required tools
      </FormLabel>
      <FormGroup>
        <Grid container>
          <Grid>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Default tools"
            />
            <FormHelperText>Default tools (Adobe Reader DC, Java, LibreOffice, Office 2019, Power BI, ProjectLibre, Python, R, RStudio, RTools, VSCode</FormHelperText>
          </Grid>
        </Grid>
        <Grid container>
          <Grid>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="SAS"
            />
            <FormHelperText>Includes SAS 9.4 and SAS Enterprise Guide</FormHelperText>
          </Grid>
        </Grid>
        <FormControlLabel control={<Checkbox color="primary" />} label="SPSS" />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="STATA"
        />
      </FormGroup>
    </>
  );
}
