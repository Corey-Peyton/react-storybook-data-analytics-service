import React from 'react';
import {Typography, Divider, TextField} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

function AdditionalInfo(props) {
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    info: '',
    text: '',
    errorText: '',
    invalid: '',
    commands: '',
    helperText: '',
  });

  const initial = {
    // blank object used to reset state
    info: {
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
      <Typography component="h2" variant="h6" className="mb-3">
        Additional information
      </Typography>
      <Typography component="p" variant="body1" className="mb-3">
        Use this section to add any information that you think might be helpful
        for the Analyst(s) while reviewing your vetting request.
      </Typography>
      <Divider className="mb-3" />
      <TextField
        className="mb-3"
        margin="dense"
        id="additionalInfo"
        label="Additional information"
        multiline
        variant="outlined"
        fullWidth
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'info')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'info')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'info')}
        onClick={() => toggleHelperText('info')}
        onBlur={() => toggleHelperText('info')}
        onFocus={() => toggleHelperText('info')}
        value={state.info.text}
        error={Boolean(state.info.errorText)}
        helperText={state.info.helperText}
      />
    </React.Fragment>
  );
}

export default AdditionalInfo;
