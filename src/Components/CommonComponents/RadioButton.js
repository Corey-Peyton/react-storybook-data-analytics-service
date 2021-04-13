import React from 'react';
import PropTypes from 'prop-types';
import {Radio as MUIRadioButtons} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  Root: {
    margin: theme.spacing(1),
  },
}));

export function RadioButtons(props) {
  const classes = useStyles();
  return (
    <MUIRadioButtons
      classes={{
        root: classes.Root,
        size: 'small',
      }}
      {...props}
    ></MUIRadioButtons>
  );
}

const COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DEFAULT: 'default',
};

const VARIANT = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STANDARD: 'standard',
};

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
};
RadioButtons.propTypes = {
  /**
    If true, the component is checked.
  */
  checked: PropTypes.bool,
  /**
  The icon to display when the component is checked.
  */
  checkedIcon: PropTypes.node,
  /**
    The color of the component
  */
  color: PropTypes.oneOf(Object.values(COLOR)),
  /**
    The default value for a Radio Group. Use when the component is not controlled.
  */
  defaultValue: PropTypes.array,
  /**
    If true, the component is disabled.
  */
  disabled: PropTypes.bool,
  /**
    The icon to display when the component is unchecked.
  */
  icon: PropTypes.node,
  /**
 If true, the input element is required
  */
  required: PropTypes.bool,
  /**
The value of the component. The DOM API casts this to a string.
  */
  value: PropTypes.any,
};

RadioButtons.defaultProps = {
  checked: false,
  disabled: false,
  color: COLOR.DEFAULT,
  size: SIZE.MEDIUM,
  required: false,
  variant: VARIANT.STANDARD,
};
