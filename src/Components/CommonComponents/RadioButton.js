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
      }}
      {...props}
    ></MUIRadioButtons>
  );
}

const COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
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
    This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill.
  */
  autoComplete: PropTypes.string,
  /**
   If true, the input element will be focused during the first mount.
  */
  autoFocus: PropTypes.bool,
  /**
    The color of the component
  */
  color: PropTypes.oneOf(Object.values(COLOR)),
  /**
    The default value of the input element.
  */
  defaultValue: PropTypes.any,
  /**
    If true, the textfield will be disabled.
  */
  disabled: PropTypes.bool,
  /**
    If true, the input will not have an underline, applies to filled textfields only.
  */
  disableUnderline: PropTypes.bool,
  /**
  End InputAdornment for this component, applies to filled and outlined textfields only.
  */
  endAdornment: PropTypes.node,
  /**
  If true, the label will be displayed in an error state.
  */
  error: PropTypes.bool,
  /**
    If true, the textfield will take up the full width of its container.
  */
  fullWidth: PropTypes.bool,
  /**
  The helper text content.
   */
  helpertext: PropTypes.node,
  /**
   Textfield id used for a11y
  */
  id: PropTypes.string,
  /**
  The label content.
  */
  label: PropTypes.node,
  /**
  If dense or normal, will adjust vertical spacing of this and contained components.
  */
  margin: PropTypes.string,
  /**
  If true, a textarea element will be rendered instead of an input.
  */
  multiline: PropTypes.bool,
  /**
  The short hint displayed in the input before the user enters a value.
  */
  placeholder: PropTypes.string,
  /**
It prevents the user from changing the value of the field (not from interacting with the field), applies to filled textfields only.
  */
  readOnly: PropTypes.bool,
  /**
 If true, the label is displayed as required and the input element` will be required.
  */
  required: PropTypes.bool,
  /**
 Number of rows to display when multiline option is set to true.
  */
  rows: PropTypes.string,
  /**
 Maximum number of rows to display when multiline option is set to true.
  */
  rowsmax: PropTypes.string,
  /**
    Start InputAdornment for this component, applies to filled  and outlined textfields only.
  */
  startAdornment: PropTypes.node,
  /**
    Render a Select element while passing the Input element to Select as input parameter. If this option is set you must pass the options of the select as children.
  */
  select: PropTypes.bool,
  /**
    The size of the textfield
  */
  size: PropTypes.oneOf(Object.values(SIZE)),
  /**
    Type of the input element. It should be a valid HTML5 input type.
  */
  type: PropTypes.string,
  /**
The value of the input element, required for a controlled component.
  */
  value: PropTypes.any,
  /**
The variant to use.
  */
  variant: PropTypes.any,
};

RadioButtons.defaultProps = {
  color: COLOR.PRIMARY,
  disabled: false,
  fullWidth: false,
  select: false,
  autoFocus: false,
  variant: VARIANT.STANDARD,
};
