import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Avatar as MUIAvatar} from '@material-ui/core';
import {deepOrange, green, deepPurple} from '@material-ui/core/colors';
import {makeStyles, fade} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    letterSpacing: theme.typography.caption.letterSpacing,
  },
  colorDefault: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[600],
  },
  colorOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  colorGreen: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
  },
  colorPurple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  colorDisabled: {
    'color': fade(theme.palette.common.black, 0.4),
    'backgroundColor': fade(theme.palette.common.black, 0.12),
    '& img': {
      opacity: 0.4,
    },
  },
}));

export function Avatar(props) {
  const classes = useStyles();
  return (
    <MUIAvatar
      {...props}
      className={clsx(classes.avatar, props.className, {
        [classes.colorGreen]: props.color === 'green',
        [classes.colorOrange]: props.color === 'orange',
        [classes.colorPurple]: props.color === 'purple',
        [classes.colorDisabled]: props.disabled === true,
      })}
      classes={{
        colorDefault: classes.colorDefault,
      }}
    >
      {props.content}
    </MUIAvatar>
  );
}

const COLOR = {
  DEFAULT: 'default',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
};

Avatar.propTypes = {
  /**
    Used to render icon or text elements inside the Avatar if src is not set. This can be an element, or just a string.
   */
  content: PropTypes.node,
  /**
    The src attribute for the img element.
   */
  src: PropTypes.string,
  /**
    Used in combination with src to provide an alt attribute for the rendered img element.
   */
  alt: PropTypes.string,
  /**
    Color of avatar if text or icon content.
   */
  color: PropTypes.oneOf(Object.values(COLOR)),
};

Avatar.defaultProps = {
  color: COLOR.DEFAULT,
};
