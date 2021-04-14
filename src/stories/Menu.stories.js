import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '../Components/CommonComponents/Button';
import {Menu} from '../Components/CommonComponents/Menu';
import {MenuItem} from '../Components/CommonComponents/MenuItem';
import {Typography, ListItemText, IconButton} from '@material-ui/core';
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
  const menuItems = [
    <MenuItem handleClick={handleClose} key="1" content={t('Option 1')} />,
    <MenuItem handleClick={handleClose} key="2" content={t('Option 2')} />,
  ];

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
        content={menuItems}
        handleClose={handleClose}
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
  const menuItems = [
    <MenuItem handleClick={handleClose} key="1" content={t('Option 1')} />,
    <MenuItem handleClick={handleClose} key="2" content={t('Option 2')} />,
  ];

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
        content={menuItems}
        handleClose={handleClose}
      />
    </>
  );
};
