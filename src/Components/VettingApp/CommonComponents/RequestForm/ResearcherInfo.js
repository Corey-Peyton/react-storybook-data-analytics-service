import React from 'react';
import {useTranslation} from 'react-i18next';
import NumberFormat from 'react-number-format';
import {Typography, TextField, FormControl, Divider} from '@material-ui/core';

function ResearchInfo(props) {
  const {t} = useTranslation();
  const initial = {
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
      text: 'Untitled request',
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
  };

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
      text: 'Untitled request',
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
    if (!state[value].text) {
      // if field is empty, set field to "untitled request"
      setState({
        ...state,
        [value]: {
          ...state[value],
          text: initial[value].text,
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" className="mb-3">
        Request details
      </Typography>
      <Typography component="p" variant="body1" className="mb-3">
        Vetting of statistical output is required by Statistics Canada to ensure
        data protection. Statistics Canada Analysts will review all external
        users' vetting requests. These requests are subject to a risk-based
        assessment of potential disclosure based on established rules and
        procedures.
      </Typography>
      <Divider className="mb-3" />
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Details
      </Typography>
      <TextField
        id="project"
        name="project"
        label="Project"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        inputProps={{readOnly: true}}
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'project')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'project')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'project')}
        onChange={(e) => handleChange(e, 'project')}
        onClick={() => toggleHelperText('project')}
        onBlur={() => toggleHelperText('project')}
        onFocus={() => toggleHelperText('project')}
        error={Boolean(state.project.errorText)}
        helperText={state.project.errorText}
        value="20-SSH-UTO-1111"
      />
      <TextField
        id="RequestID"
        name="RequestID"
        label="Request ID"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        className="mb-3"
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
        value="0101-000000"
      />
      <TextField
        id="Requestname"
        name="Requestname"
        label="Request name"
        variant="outlined"
        value={state.Requestname.text}
        fullWidth
        margin="dense"
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'Requestname')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Requestname')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Requestname')}
        onChange={(e) => {
          handleChange(e, 'Requestname');
          props.handleTitleChange(e);
        }}
        onClick={() => toggleHelperText('Requestname')}
        onBlur={() => toggleHelperText('Requestname')}
        onFocus={() => toggleHelperText('Requestname')}
        error={Boolean(state.Requestname.errorText)}
        helperText={state.Requestname.errorText}
      />
      <TextField
        id="Createdon"
        name="Createdon"
        label="Created"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        inputProps={{readOnly: true}}
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'Createdon')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Createdon')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Createdon')}
        onChange={(e) => handleChange(e, 'Createdon')}
        onClick={() => toggleHelperText('Createdon')}
        onBlur={() => toggleHelperText('Createdon')}
        onFocus={() => toggleHelperText('Createdon')}
        error={Boolean(state.Createdon.errorText)}
        helperText={state.Createdon.errorText}
        value="Jan 1, 2021"
      />
      <TextField
        id="Updatedon"
        name="Updatedon"
        label="Updated"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        className="mb-3"
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
        value="Dec 31, 2021"
      />
      <Divider className="mb-3" />
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Requester
      </Typography>
      <TextField
        id="Firstname"
        name="Firstname"
        variant="outlined"
        fullWidth
        margin="dense"
        className="mb-3"
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
        value="Steve"
      />
      <TextField
        id="Lastname"
        name="Lastname"
        label="Last name"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        className="mb-3"
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
        value="Rogers"
      />
      <TextField
        id="Username"
        name="Username"
        label="Username"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'Username')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Username')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Username')}
        onChange={(e) => handleChange(e, 'Username')}
        onClick={() => toggleHelperText('Username')}
        onBlur={() => toggleHelperText('Username')}
        onFocus={() => toggleHelperText('Username')}
        error={Boolean(state.Username.errorText)}
        helperText={state.Username.errorText}
        inputProps={{readOnly: true}}
        value="steve.rogers@cloud.statcan.ca"
      />
      <TextField
        id="Role"
        name="Role"
        label="Role"
        variant="outlined"
        required
        fullWidth
        margin="dense"
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'Role')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Role')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Role')}
        onChange={(e) => handleChange(e, 'Role')}
        onClick={() => toggleHelperText('Role')}
        onBlur={() => toggleHelperText('Role')}
        onFocus={() => toggleHelperText('Role')}
        value="Primary Researcher"
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
        className="mb-3"
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'Email')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Email')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Email')}
        onChange={(e) => handleChange(e, 'Email')}
        onClick={() => toggleHelperText('Email')}
        onBlur={() => toggleHelperText('Email')}
        onFocus={() => toggleHelperText('Email')}
        error={Boolean(state.Email.errorText)}
        helperText={state.Email.errorText}
        inputProps={{readOnly: true}}
        value="steve.rogers@canada.ca"
      />

      <FormControl variant="outlined" fullWidth>
        <NumberFormat
          id="phone-input"
          label={t('Phone number')}
          aria-label={t('Phone number')}
          value="+1 (999) 999 9999"
          customInput={TextField}
          type="text"
          variant="outlined"
          format="+1 (###) ### ####"
          mask="_"
          allowEmptyFormatting
          autoComplete="phone"
          className="mb-3"
          error={Boolean(state.Phonenumber.errorText)}
          helperText={state.Phonenumber.errorText}
          required
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'Phonenumber')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'Phonenumber')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'Phonenumber')}
          onChange={(e) => handleChange(e, 'Phonenumber')}
          onClick={() => toggleHelperText('Phonenumber')}
          inputProps={{readOnly: true}}
          onBlur={() => toggleHelperText('Phonenumber')}
          onFocus={() => toggleHelperText('Phonenumber')}
        />
      </FormControl>
    </React.Fragment>
  );
}
export default ResearchInfo;
