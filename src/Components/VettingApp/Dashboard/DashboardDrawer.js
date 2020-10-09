import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '@mdi/react';
import {mdiMonitorCellphone, mdiFileTableOutline} from '@mdi/js';
import {
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import AppsIcon from '@material-ui/icons/Apps';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {HEAD_H} from '../../../Theme/constants';
import {DRAWER_WIDTH} from './VettingDashboardDeveloper';

const useStyles = makeStyles((theme) => ({
  drawer: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    height: `calc(100vh - ${HEAD_H}px + 13px)`,
    marginTop: `calc(${HEAD_H}px - 13px)`,
    zIndex: 1,
  },
  drawerHeader: {
    'display': 'flex',
    'alignItems': 'center',
    'zIndex': 10,
    'height': '4em',
    'minHeight': '4em',
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
    flexShrink: 0,
  },
  drawerSectionIndex: {
    zIndex: -10,
  },
  closeBtn: {
    flexGrow: 1,
    textAlign: 'right',
  },
  listIcon: {
    color: theme.palette.common.black,
  },
}));

export default function DashboardDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Drawer
      id="details-drawer"
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Icon path={mdiMonitorCellphone} size={1} />
        <Typography component="h2" variant="h6">Project title example one</Typography>
        <div className={classes.closeBtn}>
          <IconButton
            onClick={props.toggleDetailsDrawer}
            edge="end"
            id="details-close"
            aria-label="Project information panel - close panel">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.drawerSection}>
        <Typography component="h3" variant="subtitle2" className="pb-3">{t('Details')}</Typography>
        <Typography variant="body2" className="pb-2">{t('ID')} 1219-000001</Typography>
        <Typography variant="body2" className="pb-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis vulputate mi. Praesent posuere eu elit in dictum. Maecenas
          sagittis commodo massa, id tincidunt elit viverra nec. Vivamus vel
          enim eros. Morbi commodo velit mauris, ac malesuada ante congue ut.
        </Typography>
      </div>
      <div className={classes.clearfix}></div>
      <div className={classes.drawerSectionIndex}>
        <List className="pt-0 pb-2">
          <ListItem button
            onClick={props.toggleAppsDrawer}
            id="apps-btn"
            aria-label={t('Go to Apps')}
          >
            <ListItemIcon>
              <AppsIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">{t('Apps')}</Typography>}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label={t('Go to Apps')}
                onClick={props.toggleAppsDrawer}
              >
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button
            onClick={props.toggleDatasetsDrawer}
            id="datasets-btn"
            aria-label={t('Go to Datasets')}
          >
            <ListItemIcon>
              <Icon
                path={mdiFileTableOutline}
                size={1}
                className={classes.listIcon}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">{t('Datasets')}</Typography>} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label={t('Go to Datasets')}
                onClick={props.toggleDatasetsDrawer}
              >
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
      <Divider />
      <div className="pt-3 pb-2 pl-2">
        <Typography component="h3" variant="subtitle2">{t('Team')}</Typography>
      </div>
      <div className={classes.drawerSectionIndex}>
        <List className="pb-2 pt-0">
          <ListItem>
            <ListItemAvatar>
              <Avatar className="avatar-purple">P</Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">Peter Parker</Typography>}
              secondary={<Typography variant="caption">peter.parker@gmail.com</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
                Owner
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar className="avatar-orange">B</Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">Bruce Banner</Typography>}
              secondary={<Typography variant="caption">bruce.banner@gmail.com</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
                Contributor
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar className="avatar-green">T</Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">Tony Stark</Typography>}
              secondary={<Typography variant="caption">tony.stark@gmail.com</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
                Contributor
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
