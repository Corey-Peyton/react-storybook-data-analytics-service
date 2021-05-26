import React from 'react';
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
      format="(###) ###-####"
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
