import React from 'react';
import PropTypes from 'prop-types';
import {Button as MUIButton} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'contained': {
    'boxShadow': theme.shadows[0],
    '& $startIcon': {
      marginLeft: theme.spacing(-1),
    },
    '& $endIcon': {
      marginRight: theme.spacing(-1),
    },
    '&:active': {
      boxShadow: theme.shadows[0],
    },
    '&:hover': {
      boxShadow: theme.shadows[0],
    },
    '&$focusVisible': {
      boxShadow: theme.shadows[0],
    },
    '&$disabled': {
      color: fade(theme.palette.common.black, 0.4),
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  'containedPrimary': {
    '&$focusVisible': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  'outlined': {
    '& $startIcon': {
      marginLeft: theme.spacing(-1),
    },
    '& $endIcon': {
      marginRight: theme.spacing(-1),
    },
    '&$disabled': {
      color: fade(theme.palette.common.black, 0.4),
      borderColor: fade(theme.palette.common.black, 0.12),
    },
  },
  'outlinedPrimary': {
    'borderColor': fade(theme.palette.primary.main, 0.4),
    '&:hover': {
      borderColor: fade(theme.palette.primary.main, 0.4),
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
    '&$focusVisible': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  'text': {
    'color': fade(theme.palette.common.black, 0.6),
    '& $startIcon': {
      marginLeft: theme.spacing(0),
    },
    '& $endIcon': {
      marginRight: theme.spacing(0),
    },
    '&$disabled': {
      color: fade(theme.palette.common.black, 0.4),
    },
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    '&$focusVisible': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
  },
  'textPrimary': {
    'color': theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
    '&$focusVisible': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  'label': {
    textTransform: 'none',
  },
  'startIcon': {},
  'endIcon': {},
  'focusVisible': {},
  'disabled': {},
}));

export function Button(props) {
  const classes = useStyles();
  return (
    <MUIButton
      classes={{
        contained: classes.contained,
        containedPrimary: classes.containedPrimary,
        disabled: classes.disabled,
        focusVisible: classes.focusVisible,
        label: classes.label,
        outlined: classes.outlined,
        outlinedPrimary: classes.outlinedPrimary,
        text: classes.text,
        textPrimary: classes.textPrimary,
        startIcon: classes.startIcon,
        endIcon: classes.endIcon,
      }}
      {...props}
      disableFocusRipple={true}
    ></MUIButton>
  );
}

const COLOR = {
  DEFAULT: 'default',
  INHERIT: 'inherit',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const VARIANT = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  TEXT: 'text',
};

Button.propTypes = {
  /**
    The color of the button
  */
  color: PropTypes.oneOf(Object.values(COLOR)),
  /**
    If true, the button will be disabled.
  */
  disabled: PropTypes.bool,
  /**
    If true, the button will take up the full width of its container.
  */
  fullWidth: PropTypes.bool,
  /**
    The size of the button
  */
  size: PropTypes.oneOf(Object.values(SIZE)),
  /**
    The button variant
  */
  variant: PropTypes.oneOf(Object.values(VARIANT)),
  /**
    Icon placed before text
  */
  startIcon: PropTypes.element,
  /**
    Icon placed after text
  */
  endIcon: PropTypes.element,
};

Button.defaultProps = {
  color: COLOR.DEFAULT,
  disabled: false,
  fullWidth: false,
  size: SIZE.MEDIUM,
  variant: VARIANT.TEXT,
};
