import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '@mdi/react';
import {mdiFileTableOutline} from '@mdi/js';
import {
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {EXP_HEAD_H} from '../../Theme/constants';
import {DRAWER_WIDTH} from './index';

const useStyles = makeStyles((theme) => ({
  drawer: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    height: `calc(100vh - ${EXP_HEAD_H}px)`,
    marginTop: EXP_HEAD_H,
    zIndex: 1000,
  },
  drawerHeader: {
    'display': 'flex',
    'alignItems': 'center',
    'zIndex': 10,
    'height': '4rem',
    'minHeight': '4rem',
    'position': 'sticky',
    'top': 0,
    'background': 'white',
    'borderBottom': '1px solid rgba(0, 0, 0, 0.12)',
    '& > svg': {
      marginRight: theme.spacing(2),
    },
    'padding': theme.spacing(0, 2),
  },
  drawerSection: {
    padding: theme.spacing(3, 2, 0, 2),
  },
  drawerSectionIndex: {
    zIndex: -10,
  },
  closeBtn: {
    flexGrow: 1,
    textAlign: 'right',
  },
}));

export default function ProjectDatasets(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton
          onClick={props.toggleDatasetsDrawer}
          edge="start"
          id="datasets-back-btn"
          aria-label={t('Datasets panel - Go back to details')}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h2" variant="h6">{t('Datasets')}</Typography>
        <div className={classes.closeBtn}>
          <IconButton
            onClick={props.toggleAllDrawers}
            edge="end"
            aria-label={t('Datasets panel - close all panels')}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Divider />
      <div className={classes.drawerSection}>
        <Typography variant="body1">{t('Dataset list')}</Typography>
      </div>
      <div className={classes.drawerSectionIndex}>
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <Icon path={mdiFileTableOutline } size={1} />
            </ListItemIcon>
            <ListItemText primary="DatasetOne" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon path={mdiFileTableOutline } size={1} />
            </ListItemIcon>
            <ListItemText primary="DatasetTwo" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon path={mdiFileTableOutline } size={1} />
            </ListItemIcon>
            <ListItemText primary="DatasetThree" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
