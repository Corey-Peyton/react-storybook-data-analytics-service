import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles';
import {Avatar} from './Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    'padding': theme.spacing(0.5),
    'color': fade(theme.palette.common.black, 0.6),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    '&:focus-visible': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
  },
}));

export function AvatarButton(props) {
  const classes = useStyles();
  const {className, disabled, ...avatarProps} = props;
  return (
    <IconButton
      className={className}
      disabled={disabled}
      classes={{
        root: classes.root,
      }}
    >
      <Avatar {...avatarProps} disabled={disabled} />
    </IconButton>
  );
}

const COLOR = {
  DEFAULT: 'default',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
};

AvatarButton.propTypes = {
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
  /**
    If true, the button will be disabled.
  */
  disabled: PropTypes.bool,
};

AvatarButton.defaultProps = {
  color: COLOR.DEFAULT,
  disabled: false,
};
