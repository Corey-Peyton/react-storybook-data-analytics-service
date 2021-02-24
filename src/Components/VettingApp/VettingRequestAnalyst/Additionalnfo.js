import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Divider, TextField} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

function AdditionalInfo(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    info: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText:
        'Add additional information which may helpful to the disclosure analyst.',
    },
  });

  const initial = {
    // blank object used to reset state
    info: {
      text: '',
      errorText: '',
      helperText:
        'Add additional information which may helpful to the disclosure analyst.',
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
      <Typography>
        A brief introduction is needed to explain to external users why on this
        section it is important to provide as much details as possible.
      </Typography>
      <Divider className={classes.divider} />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="additionalInfo"
        label="Additional information"
        multiline
        rows={2}
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
