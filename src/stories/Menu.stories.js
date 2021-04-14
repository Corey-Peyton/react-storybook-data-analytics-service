import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '../Components/CommonComponents/Button';
import {Menu} from '../Components/CommonComponents/Menu';
import {
  Typography,
  MenuItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiMenuDown} from '@mdi/js';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default {
  title: 'Molecules/Menu',
  component: Menu,
};

export const IconButtonMenu = (args) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  // ////////////////////// MENU ITEMS
  const primaryMenuItem = () => {
    return (
      <MenuItem onClick={handleClose} key="1">
        <ListItemText
          primary={<Typography variant="body2">{t('Option 1')}</Typography>}
        />
      </MenuItem>
    );
  };

  const secondaryMenuItem = () => {
    return (
      <MenuItem onClick={handleClose} key="2">
        <ListItemText
          primary={<Typography variant="body2">{t('Option 2')}</Typography>}
        />
      </MenuItem>
    );
  };

  const menuItems = () => {
    return [primaryMenuItem(), secondaryMenuItem()];
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls="icon-button-menu"
        aria-haspopup="true"
        aria-label="Icon button menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="icon-button-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        content={menuItems()}
        handleClose={handleClose}
        anchorVertical="bottom"
        anchorHorizontal="right"
        transformVertical="top"
        transformHorizontal="right"
      />
    </>
  );
};

export const ButtonMenu = (args) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  // ////////////////////// MENU ITEMS
  const primaryMenuItem = () => {
    return (
      <MenuItem onClick={handleClose} key="1">
        <ListItemText
          primary={<Typography variant="body2">{t('Option 1')}</Typography>}
        />
      </MenuItem>
    );
  };

  const secondaryMenuItem = () => {
    return (
      <MenuItem onClick={handleClose} key="2">
        <ListItemText
          primary={<Typography variant="body2">{t('Option 2')}</Typography>}
        />
      </MenuItem>
    );
  };

  const menuItems = () => {
    return [primaryMenuItem(), secondaryMenuItem()];
  };

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls="button-menu"
        aria-haspopup="true"
        aria-label="Button menu"
        variant="contained"
        color="primary"
        endIcon={<Icon path={mdiMenuDown} size={1} />}
      >
        Open menu
      </Button>
      <Menu
        id="button-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        content={menuItems()}
        handleClose={handleClose}
        anchorVertical="bottom"
        anchorHorizontal="right"
        transformVertical="top"
        transformHorizontal="right"
      />
    </>
  );
};
