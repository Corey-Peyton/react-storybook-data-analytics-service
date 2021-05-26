import React from 'react';
// import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import NumberFormat from 'react-number-format';

export default function PhoneField(props) {
  // const phoneExp = /^[+][1]\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}/;

  return (
    <NumberFormat
      id={props.id}
      label={props.label}
      aria-label={props.label}
      value={props.value}
      customInput={TextField}
      type="text"
      format="+1 (###) ### ####"
      variant="outlined"
      mask="_"
      allowEmptyFormatting
      autoComplete="phone"
      error={props.error}
      helperText={props.helperText}
      onChange={props.changeHandler}
      onClick={props.clickHandler}
      onBlur={props.blurHandler}
      onFocus={props.focusHandler}
      onCut={props.cutHandler}
      onCopy={props.copyHandler}
      onPaste={props.pasteHandler}
    />
  );
}

// PhoneField.propTypes = {
//   /**
//    * The message to display.
//    */
//   message: PropTypes.node.isRequired,
//   /**
//     If true, Snackbar is open.
//   */
//   open: PropTypes.bool,
//   /**
//     The severity of the alert. This defines the color and icon used.
//   */
//   severity: PropTypes.oneOf(Object.values(SEVERITY)).isRequired,
//   /**
//     Click handler to close snackbar
//   */
//   handleClose: PropTypes.func.isRequired,
// };

// Snackbar.defaultProps = {
//   open: false,
// };
