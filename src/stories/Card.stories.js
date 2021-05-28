import React from 'react';
import {useTranslation} from 'react-i18next';
import {Card} from '../Components/CommonComponents/Card';
import {
  IconButton,
  ListItemText,
  Typography,
  MenuItem,
  Button,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiMenuDown} from '@mdi/js';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default {
  title: 'Molecules/Card',
  component: Card,
};

export const Card1 = (args) => {
  // const {t} = useTranslation();
  // const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <Card />
    </>
  );
};
