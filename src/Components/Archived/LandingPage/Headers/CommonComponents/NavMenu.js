import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function NavMenu(props) {
  const [navAnchorEl, setNavAnchorEl] = React.useState(null);

  const navHandleClick = (event) => {
    setNavAnchorEl(event.currentTarget);
  };

  const navHandleClose = () => {
    setNavAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        color="inherit"
        // aria-label="main menu"
        aria-controls="navMenu"
        aria-haspopup={true}
        onClick={navHandleClick}
      >
        <MenuIcon />
        <span className="screen-reader-text">Main menu</span>
      </IconButton>
      <Menu
        id="navMenu"
        anchorEl={navAnchorEl}
        open={Boolean(navAnchorEl)}
        onClose={navHandleClose}
      >
        <MenuItem onClick={navHandleClose}>
          <Button href="https://www150.statcan.gc.ca/n1/en/type/data?subject_levels=25#tables">
            Datasets
          </Button>
        </MenuItem>
        <MenuItem onClick={navHandleClose}>
          <Button href="https://www.statcan.gc.ca/eng/interact/datavis">
            Visualizations
          </Button>
        </MenuItem>
        <MenuItem onClick={navHandleClose}>
          <Button href="#">
            Community
          </Button>
        </MenuItem>
        <MenuItem onClick={navHandleClose}>
          <Button href="#">
            Services
          </Button>
        </MenuItem>
        <MenuItem onClick={navHandleClose}>
          <Button href="#">
            Partners
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default withRouter(NavMenu);
