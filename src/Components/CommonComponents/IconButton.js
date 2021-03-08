import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton as MUIIconButton,
} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'iconRoot': {
    'padding': theme.spacing(1),
    'color': fade(theme.palette.common.black, 0.6),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    '&$disabled': {
      color: fade(theme.palette.common.black, 0.4),
    },
  },
  'colorPrimary': {
    'color': theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  'edgeStart': {
    marginLeft: theme.spacing(-1),
  },
  'edgeEnd': {
    marginRight: theme.spacing(-1),
  },
  'childPulsate': {
    animation: 'none',
  },
  'ripplePulsate': {
    animationDuration: '200ms !important',
  },
  'rippleVisible': {
    opacity: 0.2,
    animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes enter': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.2,
    },
  },
  'disabled': {},
}));

export function IconButton(props) {
  const classes = useStyles();
  return (
    <MUIIconButton
      className={props.className}
      classes={{
        root: classes.iconRoot,
        edgeStart: classes.edgeStart,
        edgeEnd: classes.edgeEnd,
        colorPrimary: classes.colorPrimary,
        disabled: classes.disabled,
        focusVisible: classes.focusVisible,
      }}
      {...props}
      TouchRippleProps={{
        classes: {
          childPulsate: classes.childPulsate,
          ripplePulsate: classes.ripplePulsate,
          rippleVisible: classes.rippleVisible,
        },
      }}
    ></MUIIconButton>
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

const EDGE = {
  NONE: false,
  START: 'start',
  END: 'end',
};

IconButton.propTypes = {
  /**
    The color of the button
  */
  color: PropTypes.oneOf(Object.values(COLOR)),
  /**
    If true, the button will be disabled.
  */
  disabled: PropTypes.bool,
  /**
    The size of the button
  */
  size: PropTypes.oneOf(Object.values(SIZE)),
  /**
    If given, uses a negative margin to counteract the padding on one side
  */
  edge: PropTypes.oneOf(Object.values(EDGE)),
};

IconButton.defaultProps = {
  color: COLOR.DEFAULT,
  disabled: false,
  size: SIZE.MEDIUM,
  edge: EDGE.NONE,
};
