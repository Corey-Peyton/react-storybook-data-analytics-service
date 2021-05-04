import React from 'react';
import Link from '@material-ui/core/Link';
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
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Update virtual machine details
          </Typography>
          <IconButton
            aria-label={t('Close edit virtual machine')}
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
  const [state, setState] = React.useState({
    snackbarDelete: false,
    dialogDelete: false,
  });

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
        Azure Active Directory. Submit a Jira ticket to the <Link href="https://jirab.statcan.ca/projects/DAZSUPP/summary" underline="always">Cloud Jira project</Link>
        for assistance.
      </Typography>
      <Autocomplete
        id="cloudemail"
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
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="firstname"
        label="First name"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="lastName"
        label="Last name"
        variant="outlined"
        fullWidth
        required
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
          format="MM/dd/yyyy"
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
      />
      <Autocomplete
        id="organization"
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
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        required
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
