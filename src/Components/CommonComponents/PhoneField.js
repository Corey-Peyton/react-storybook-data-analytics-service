import React from 'react';
import PropTypes from 'prop-types';
// import {useTranslation} from 'react-i18next';
import {TextField as MUISnackbar} from '@material-ui/core';
import {NumberFormat as MUINumberFormat} from 'react-number-format';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Snackbar(props) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    // <MUISnackbar
    //   open={props.open}
    //   autoHideDuration={6000}
    //   onClose={props.handleClose}
    //   anchorOrigin={{
    //     vertical: 'bottom',
    //     horizontal: 'left',
    //   }}
    //   onClick={handleClick}
    // >
    //   <Alert onClose={props.handleClose} severity={props.severity}>
    //     {props.message}
    //   </Alert>
    // </MUISnackbar>
    <MUINumberFormat
      id="hours-input"
      label={t('Hours')}
      aria-label={t('Hours')}
      value={state.hours.text}
      customInput={TextField}
      type="text"
      variant="outlined"
      error={Boolean(state.hours.errorText)}
      helperText={state.hours.errorText}
      required
      onCut={(e) => disableCutCopyPaste(e, 'cut', 'hours')}
      onCopy={(e) =>
        disableCutCopyPaste(e, 'copy', 'hours')
      }
      onPaste={(e) =>
        disableCutCopyPaste(e, 'paste', 'hours')
      }
      onChange={(e) => handleChange(e, 'hours')}
      onClick={() => toggleHelperText('hours')}
      onBlur={() => toggleHelperText('hours')}
      onFocus={() => toggleHelperText('hours')}
    />
  );
}

const SEVERITY = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
};

Snackbar.propTypes = {
  /**
   * The message to display.
   */
  message: PropTypes.node.isRequired,
  /**
    If true, Snackbar is open.
  */
  open: PropTypes.bool,
  /**
    The severity of the alert. This defines the color and icon used.
  */
  severity: PropTypes.oneOf(Object.values(SEVERITY)).isRequired,
  /**
    Click handler to close snackbar
  */
  handleClose: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  open: false,
};
