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
    Firstname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Lastname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Username: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Role: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Email: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Phonenumber: {
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
    RequestID: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Requestname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Createdon: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
    Updatedon: {
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
        Vetting of statistical output is required by Statistics Canada to ensure
        data protection. Statistics Canada Analysts will review all external
        users' vetting requests. These requests are subject to a risk-based
        assessment of potential disclosure based on established rules and
        procedures.
      </Typography>
      <Divider className={classes.divider} />
      <Typography className="mb-2" component="p" variant="subtitle2">
        Items marked with asterisk (*) are required.
      </Typography>
      <Typography component="h2" variant="h6">
      Requester details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="Firstname"
            name="Firstname"
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            label="First name"
            required
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Firstname')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Firstname')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Firstname')}
            onChange={(e) => handleChange(e, 'Firstname')}
            onClick={() => toggleHelperText('Firstname')}
            onBlur={() => toggleHelperText('Firstname')}
            onFocus={() => toggleHelperText('Firstname')}
            error={Boolean(state.Firstname.errorText)}
            helperText={state.Firstname.errorText}
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Lastname"
            name="Lastname"
            label="Last name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Lastname')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Lastname')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Lastname')}
            onChange={(e) => handleChange(e, 'Lastname')}
            onClick={() => toggleHelperText('Lastname')}
            onBlur={() => toggleHelperText('Lastname')}
            onFocus={() => toggleHelperText('Lastname')}
            inputProps={{readOnly: true}}
            error={Boolean(state.Lastname.errorText)}
            helperText={state.Lastname.errorText}
          />
          <TextField
            id="Username"
            name="Username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Username')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Username')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Username')}
            onChange={(e) => handleChange(e, 'Username')}
            onClick={() => toggleHelperText('Username')}
            onBlur={() => toggleHelperText('Username')}
            onFocus={() => toggleHelperText('Username')}
            value={state.Username.text}
            error={Boolean(state.Username.errorText)}
            helperText={state.Username.errorText}
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Role"
            name="Role"
            label="Role"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Role')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Role')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Role')}
            onChange={(e) => handleChange(e, 'Role')}
            onClick={() => toggleHelperText('Role')}
            onBlur={() => toggleHelperText('Role')}
            onFocus={() => toggleHelperText('Role')}
            value={state.Role.text}
            error={Boolean(state.Role.errorText)}
            helperText={state.Role.errorText}
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Email"
            name="Email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Email')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Email')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Email')}
            onChange={(e) => handleChange(e, 'Email')}
            onClick={() => toggleHelperText('Email')}
            onBlur={() => toggleHelperText('Email')}
            onFocus={() => toggleHelperText('Email')}
            value={state.Email.text}
            error={Boolean(state.Email.errorText)}
            helperText={state.Email.errorText}
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Phonenumber"
            name="Phone number"
            label="Phone number"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Phonenumber')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Phonenumber')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Phonenumber')}
            onChange={(e) => handleChange(e, 'Phonenumber')}
            onClick={() => toggleHelperText('Phonenumber')}
            onBlur={() => toggleHelperText('Phonenumber')}
            onFocus={() => toggleHelperText('Phonenumber')}
            value={state.Phonenumber.text}
            error={Boolean(state.Phonenumber.errorText)}
            helperText={state.Phonenumber.errorText}
            inputProps={{readOnly: true}}
          />
          <Typography component="h2" variant="h6" className="mt-1 mb-1">
            Request details
          </Typography>
          <TextField
            id="project"
            name="project"
            label="Project"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            value={state.project.text}
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'project')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'project')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'project')}
            onChange={(e) => handleChange(e, 'project')}
            onClick={() => toggleHelperText('project')}
            onBlur={() => toggleHelperText('project')}
            onFocus={() => toggleHelperText('project')}
            error={Boolean(state.project.errorText)}
            helperText={state.project.errorText}
          />
          {/*  <FormControl
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
        <Grid item xs={6}>*/}
          <TextField
            id="RequestID"
            name="RequestID"
            label="Request ID"
            variant="outlined"
            required
            fullWidth
            margin="dense"
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
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Requestname"
            name="Requestname"
            label="Request name"
            variant="outlined"
            // required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Requestname')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Requestname')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Requestname')}
            onChange={(e) => handleChange(e, 'Requestname')}
            onClick={() => toggleHelperText('Requestname')}
            onBlur={() => toggleHelperText('Requestname')}
            onFocus={() => toggleHelperText('Requestname')}
            error={Boolean(state.Requestname.errorText)}
            helperText={state.Requestname.errorText}
            // inputProps={{readOnly: true}}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.pt0}>
          <TextField
            id="Createdon"
            name="Createdon"
            label="Created on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Createdon')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Createdon')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Createdon')}
            onChange={(e) => handleChange(e, 'Createdon')}
            onClick={() => toggleHelperText('Createdon')}
            onBlur={() => toggleHelperText('Createdon')}
            onFocus={() => toggleHelperText('Createdon')}
            error={Boolean(state.Createdon.errorText)}
            helperText={state.Createdon.errorText}
          />
          <TextField
            id="Updatedon"
            name="Updatedon"
            label="Updated on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'Updatedon')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Updatedon')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Updatedon')}
            onChange={(e) => handleChange(e, 'Updatedon')}
            onClick={() => toggleHelperText('Updatedon')}
            onBlur={() => toggleHelperText('Updatedon')}
            onFocus={() => toggleHelperText('Updatedon')}
            error={Boolean(state.Updatedon.errorText)}
            helperText={state.Updatedon.errorText}
            inputProps={{readOnly: true}}
          />
        </Grid>
      </Grid>
      {/* <Divider className={classes.divider} />
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
      </FormControl> */}
    </React.Fragment>
  );
}
export default AnalystInfo;
