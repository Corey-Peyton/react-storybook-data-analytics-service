import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Menu as MUIMenu} from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <MUIMenu
    disableScrollLock={false}
    elevation={4}
    getContentAnchorEl={null}
    {...props}
  />
));

export function Menu(props) {
  // const classes = useStyles();
  const {
    content,
    id,
    open,
    anchorEl,
    handleClose,
    anchorVertical,
    anchorHorizontal,
    transformVertical,
    transformHorizontal,
  } = props;

  return (
    <React.Fragment>
      <StyledMenu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        disablePortal
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorVertical,
          horizontal: anchorHorizontal,
        }}
        transformOrigin={{
          vertical: transformVertical,
          horizontal: transformHorizontal,
        }}
      >
        {content}
      </StyledMenu>
    </React.Fragment>
  );
}

Menu.propTypes = {
  /**
   Menu id used for a11y
  */
  id: PropTypes.string.isRequired,
  /**
   Menu default state, true = open, false = closed
  */
  open: PropTypes.bool,
  /**
   Menu content
   */
  content: PropTypes.node.isRequired,
  /**
   The vertical origin point on the button
   */
  anchorVertical: PropTypes.string.isRequired,
  /**
   The horizontal origin point of the button
   */
  anchorHorizontal: PropTypes.string.isRequired,
  /**
   The vertical origin point of the menu
  */
  transformVertical: PropTypes.string.isRequired,
  /**
   The horizontal origin point of the menu
   */
  transformHorizontal: PropTypes.string.isRequired,
};

Menu.defaultProps = {
  open: false,
};
