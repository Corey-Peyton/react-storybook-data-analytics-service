import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  Typography,
  TextField,
  FormLabel,
  Grid,
  Tooltip,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoIcon from '@material-ui/icons/Info';
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
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function ProjectInformation(props) {
  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };
  const security = [{label: 'vDL'}, {label: 'Prerelease'}];
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
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
    contractstartdate: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contractenddate: {
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
    contractstartdate: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    contractenddate: {
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

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  return (
    <React.Fragment>
      <Grid item xs={10}>
        <Typography variant="body2" required>
          Environment
        </Typography>
        <Autocomplete
          id="combo-box-demo"
          options={security}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select an environment"
              className={classes.inputMargin}
              required
              variant="outlined"
            />
          )}
        />
        <TextField
          variant="outlined"
          id="primaryinvestigator"
          fullWidth
          className="mb-2"
          margin="dense"
          label="Primary investigator"
          required
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'primaryinvestigator')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'primaryinvestigator')}
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
        <Alert severity="error" className="mb-1">
          Complete all required fields to advance to the next step
        </Alert>
        <TextField
          variant="outlined"
          id="contractnumber"
          fullWidth
          className={classes.inputMargin}
          margin="dense"
          label="Contract number"
          error
        />
        <Grid container>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="contract-start-date"
                className={classes.datePicker}
                variant="inline"
                label={'Contract start date'}
                InputProps={{readOnly: true}}
                autoOk
                margin="dense"
                format="mm/dd/yyyy"
                value={state.selectedFromDate}
                inputVariant="outlined"
                onChange={handleFromDateChange}
                PopoverProps={{
                  'aria-modal': 'true',
                }}
                KeyboardButtonProps={{
                  'aria-label': 'Select contract start date',
                }}
              />
              <KeyboardDatePicker
                id="contract-end-date"
                variant="inline"
                InputProps={{readOnly: true}}
                autoOk
                margin="dense"
                format="mm/dd/yyyy"
                label={'Contract end date'}
                value={state.selectedFromDate}
                inputVariant="outlined"
                onChange={handleFromDateChange}
                PopoverProps={{
                  'aria-modal': 'true',
                }}
                KeyboardButtonProps={{
                  'aria-label': 'Select contract start date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
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
            </Grid>
            <Grid item>
              <BootstrapTooltip
                className={classes.tooltipLabel}
                title="Default tools (Adobe Reader DC, Java, LibreOffice, Office 2019, Power BI, ProjectLibre, Python, R, RStudio, RTools, VSCode"
              >
                <InfoIcon />
              </BootstrapTooltip>
            </Grid>
          </Grid>
          <Grid container>
            <Grid>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="SAS"
              />
            </Grid>
            <BootstrapTooltip title="Includes SAS 9.4 and SAS Enterprise Guide">
              <InfoIcon />
            </BootstrapTooltip>
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
    </React.Fragment>
  );
}

export default ProjectInformation;
