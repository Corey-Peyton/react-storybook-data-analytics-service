import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  TextField,
  FormLabel,
  Grid,
  FormControl,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  datePicker: {
    marginRight: theme.spacing(4.75),
  },
  fullWidth: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

function ProjectDetails(props) {
  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };
  const handleToDateChange = (date) => {
    setState({...state, selectedToDate: date});
  };
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    selectedFromDate: null,
    selectedToDate: null,
    selectedDateType: 10,
    primaryinvestigator: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contractnumber: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
  });

  const initial = {
    // blank object used to reset state
    primaryinvestigator: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    contractnumber: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
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

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={9}>
          <Alert severity="error" className={classes.fullWidth}>
            Complete all required fields to advance to the next step
          </Alert>
        </Grid>
        <Grid container>
          <FormControl
            component="fieldset"
            className={classes.inputMargin}
            required
          >
            <FormLabel component="legend">Access location</FormLabel>
            <RadioGroup
              aria-label="Access location"
              name="radio-buttons-group"
              color="primary"
            >
              <FormControlLabel
                value="Secure room"
                control={<Radio color="primary" />}
                label="Secure room"
              />
              <FormControlLabel
                value="Authorized workspace"
                control={<Radio color="primary" />}
                label="Authorized workspace"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container>
          <FormControl
            component="fieldset"
            className={classes.inputMargin}
            required
          >
            <FormLabel component="legend">Environment</FormLabel>
            <RadioGroup
              aria-label="environment"
              name="radio-buttons-group"
              color="primary"
            >
              <FormControlLabel
                value="VDL"
                control={<Radio color="primary" />}
                label="VDL"
              />
              <FormControlLabel
                value="Prerelease"
                control={<Radio color="primary" />}
                label="Prerelease"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            id="primaryinvestigator"
            fullWidth
            className="mb-2"
            margin="dense"
            label="Primary investigator"
            required
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'primaryinvestigator')}
            onCopy={(e) =>
              disableCutCopyPaste(e, 'copy', 'primaryinvestigator')
            }
            onPaste={(e) =>
              disableCutCopyPaste(e, 'paste', 'primaryinvestigator')
            }
            // onChange={(e) => handleChange(e, 'info')}
            onClick={() => toggleHelperText('primaryinvestigator')}
            onBlur={() => toggleHelperText('primaryinvestigator')}
            onFocus={() => toggleHelperText('primaryinvestigator')}
            error={Boolean(state.primaryinvestigator.errorText)}
            helperText={state.primaryinvestigator.helperText}
          />
          <TextField
            variant="outlined"
            id="contractnumber"
            fullWidth
            className={classes.inputMargin}
            margin="dense"
            label="Contract number"
            error
            required
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="start-date"
              variant="inline"
              margin="dense"
              className={classes.datePicker}
              format="MM/dd/yyyy"
              label={t('Contract start date')}
              value={state.selectedFromDate}
              maxDate={state.selectedToDate}
              autoOk
              disablePast
              onChange={handleFromDateChange}
              inputVariant="outlined"
              PopoverProps={{
                'aria-modal': 'true',
              }}
              KeyboardButtonProps={{
                'aria-label': t('Select start date'),
              }}
            />
            <KeyboardDatePicker
              id="end-date"
              variant="inline"
              margin="dense"
              format="MM/dd/yyyy"
              label={t('Contract end date')}
              value={state.selectedToDate}
              minDate={state.selectedFromDate}
              onChange={handleToDateChange}
              autoOk
              inputVariant="outlined"
              KeyboardButtonProps={{
                'aria-label': t('Select end date'),
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={10}>
          <FormLabel component="legend" className="mt-2" required>
            Required tools
          </FormLabel>
          <FormGroup>
            <Grid container>
              <Grid>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Default tools"
                />
                <FormHelperText>
                  Default tools (Adobe Reader DC, Java, LibreOffice, Office
                  2019, Power BI, ProjectLibre, Python, R, RStudio, RTools,
                  VSCode
                </FormHelperText>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid container>
              <Grid>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="SAS"
                />
                <FormHelperText>
                  Includes SAS 9.4 and SAS Enterprise Guide
                </FormHelperText>
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="SPSS"
              color="primary"
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="STATA"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ProjectDetails;
