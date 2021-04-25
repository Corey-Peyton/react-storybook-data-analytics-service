import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
      <Grid item xs={8}>
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
          className={classes.inputMargin}
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
        <Alert severity="error">
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
        <TextField
          variant="outlined"
          fullWidth
          className={classes.inputMargin}
          margin="dense"
          type="date"
          required
          id="contractstartdate"
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'contractstartdate')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'contractstartdate')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'contractstartdate')}
          onClick={() => toggleHelperText('contractstartdate')}
          onBlur={() => toggleHelperText('contractstartdate')}
          onFocus={() => toggleHelperText('contractstartdate')}
          error={Boolean(state.contractstartdate.errorText)}
          helperText={state.contractstartdate.helperText}
        />
        <TextField
          variant="outlined"
          fullWidth
          className={classes.inputMargin}
          margin="dense"
          type="date"
          required
          id="contractenddate"
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'contractenddate')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'contractenddate')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'contractenddate')}
          onClick={() => toggleHelperText('contractenddate')}
          onBlur={() => toggleHelperText('contractenddate')}
          onFocus={() => toggleHelperText('contractenddate')}
          error={Boolean(state.contractenddate.errorText)}
          helperText={state.contractenddate.helperText}
        />
        <FormLabel component="legend" required>
          Required tools
        </FormLabel>
        <FormGroup>
          <Grid container>
            <Grid>
              <FormControlLabel control={<Checkbox />} label="Default tools" />
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
              <FormControlLabel control={<Checkbox />} label="SAS" />
            </Grid>
            <BootstrapTooltip title="Includes SAS 9.4 and SAS Enterprise Guide">
              <InfoIcon />
            </BootstrapTooltip>
          </Grid>
          <FormControlLabel control={<Checkbox />} label="SPSS" />
          <FormControlLabel control={<Checkbox />} label="STATA" />
        </FormGroup>
      </Grid>
    </React.Fragment>
  );
}

export default ProjectInformation;
