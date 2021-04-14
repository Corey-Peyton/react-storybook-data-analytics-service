import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem as MUIMenuItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

export function MenuItem(props) {
  const {content, handleClick, key} = props;

  return (
    <MUIMenuItem onClick={handleClick} key={key}>
      <ListItemText
        primary={<Typography variant="body2">{content}</Typography>}
      />
    </MUIMenuItem>
  );
}

MenuItem.propTypes = {
  /**
    String of text that fills the menu item.
   */
  content: PropTypes.string.isRequired,
  /**
    The primary function of the menu item, when clicked.
   */
  handleClick: PropTypes.func,
  /**
    The key to establish the identifier of this particular item in the list.
   */
  key: PropTypes.number,
};
