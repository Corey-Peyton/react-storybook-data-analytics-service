import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Divider,
  Link,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  emphasisBox: {
    background: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tooltipLabel: {
    'display': 'flex',
    'alignItems': 'center',
    '& svg': {
      paddingLeft: theme.spacing(1),
    },
  },
  pt0: {
    paddingTop: [0, '!important'],
  },
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function AnalystInfo(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    RequestID: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    name: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    project: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    firstname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    lastname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    date: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    username: {
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


  return (
    <React.Fragment>
      <Typography>
        Vetting disclosure requests are required by Statistics Canada’s to
        ensure data protection. Disclosure analysts will review all external
        users vetting requests for accessing to confidential microdata. These
        vetting requests are subject to a risk-based assessment of potential
        disclosure based on established rules and procedures. For more
        information please visit the
        <Link href="#">Vetting guidelines website</Link>.
      </Typography>
      <Divider className={classes.divider} />
      <Typography className="mb-2" component="p" variant="subtitle2">
        Items marked with asterisk (*) are required.
      </Typography>
      <Typography component="h2" variant="h6">
        Request details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="RequestID"
            name="RequestID"
            label="Request ID"
            variant="outlined"
            fullWidth
            margin="dense"
            readOnly
            value="0101-000000"
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'RequestID')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'RequestID')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'RequestID')}
            onChange={(e) => handleChange(e, 'RequestID')}
            onClick={() => toggleHelperText('RequestID')}
            onBlur={() => toggleHelperText('RequestID')}
            onFocus={() => toggleHelperText('RequestID')}
            error={Boolean(state.RequestID.errorText)}
            helperText={state.RequestID.errorText}
          />
          <TextField
            id="name"
            name="name"
            label="Request name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className="mt-2"
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'name')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'name')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'name')}
            onChange={(e) => handleChange(e, 'name')}
            onClick={() => toggleHelperText('name')}
            onBlur={() => toggleHelperText('name')}
            onFocus={() => toggleHelperText('name')}
            value={state.name.text}
            error={Boolean(state.name.errorText)}
            helperText={state.name.errorText}
          />
          <Typography component="h2" variant="h6" className="mt-1 mb-1">
            Project details
          </Typography>
          <TextField
            id="project"
            name="project"
            label="Contract ID"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            value="21-SSH-UTO-0000"
            readOnly
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'project')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'project')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'project')}
            onChange={(e) => handleChange(e, 'project')}
            onClick={() => toggleHelperText('project')}
            onBlur={() => toggleHelperText('project')}
            onFocus={() => toggleHelperText('project')}
            // value={state.name.text}
            error={Boolean(state.project.errorText)}
            helperText={state.project.errorText}
          />
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="outputFilesFolder-label">Output Folder</InputLabel>
            <Select
              id="outputFilesFolder"
              label="Output Folder *"
              labelId="outputFilesFolder-label"
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="supportingFilesFolder-label">
              Supporting Folder
            </InputLabel>
            <Select
              id="supportingFilesFolder"
              label="Supporting Folder *"
              labelId="supportingFilesFolder-label"
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6">
        Basic information
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="first-name"
            name="first-name"
            label="First Name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'firstname')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'firstname')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'firstname')}
            onChange={(e) => handleChange(e, 'firstname')}
            onClick={() => toggleHelperText('firstname')}
            onBlur={() => toggleHelperText('firstname')}
            onFocus={() => toggleHelperText('firstname')}
            // value={state.name.text}
            error={Boolean(state.firstname.errorText)}
            helperText={state.firstname.errorText}
          />
          <TextField
            id="last-name"
            name="last-name"
            label="Last Name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'lastname')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'lastname')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'lastname')}
            onChange={(e) => handleChange(e, 'lastname')}
            onClick={() => toggleHelperText('lastname')}
            onBlur={() => toggleHelperText('lastname')}
            onFocus={() => toggleHelperText('lastname')}
            // value={state.name.text}
            error={Boolean(state.lastname.errorText)}
            helperText={state.lastname.errorText}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.pt0}>
          <TextField
            id="date"
            name="date"
            label="Date"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'date')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'date')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'date')}
            onChange={(e) => handleChange(e, 'date')}
            onClick={() => toggleHelperText('date')}
            onBlur={() => toggleHelperText('date')}
            onFocus={() => toggleHelperText('date')}
            // value={state.name.text}
            error={Boolean(state.date.errorText)}
            helperText={state.date.errorText}
          />
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'username')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'username')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'username')}
            onChange={(e) => handleChange(e, 'username')}
            onClick={() => toggleHelperText('username')}
            onBlur={() => toggleHelperText('username')}
            onFocus={() => toggleHelperText('username')}
            // value={state.name.text}
            error={Boolean(state.username.errorText)}
            helperText={state.username.errorText}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" gutterBottom={true}>
        Additional information
      </Typography>
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2" component="h3" gutterBottom={true}>
          Please consider the following guidelines:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Check your output against the vetting guidelines.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Delete values you do not need released at this time.
            </Typography>
          </li>
        </ul>
        <Typography variant="subtitle2" component="h3">
          A completed request form will be stored as part of the request record.
        </Typography>
      </div>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
      >
        <FormLabel component="legend">
          Is the requested output consistent with the approved proposal for this
          project?
        </FormLabel>
        <RadioGroup id="consistentOutput">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
      >
        <FormLabel component="legend">
          Have you checked the vetting rules to determine if there are
          geographical, institutional, household size and/or population
          requirements for your output?
        </FormLabel>
        <RadioGroup id="vettingRules">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Is the requested output your final output?
          <BootstrapTooltip title="If no, future vetting release requests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst.">
            <InfoIcon />
          </BootstrapTooltip>
        </FormLabel>
        <RadioGroup id="finalOutput">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
export default AnalystInfo;
