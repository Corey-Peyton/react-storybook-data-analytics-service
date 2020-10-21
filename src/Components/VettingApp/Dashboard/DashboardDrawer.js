import React from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Typography,
  Drawer,
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {makeStyles} from '@material-ui/styles';
import {HEAD_H} from '../../../Theme/constants';
import {DRAWER_WIDTH} from './VettingDashboardDeveloper';

const useStyles = makeStyles((theme) => ({
  drawer: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    flexShrink: 0,
    zIndex: '10 !important',
  },
  drawerPaper: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    height: `100vh`,
    paddingTop: `calc(${HEAD_H}px - 13px)`,
    paddingRight: '10px',
    zIndex: '10 !important',
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
  }, root: {
    'color': theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `#1A73E82B`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    'color': theme.palette.text.secondary,
    'borderTopRightRadius': theme.spacing(2),
    'borderBottomRightRadius': theme.spacing(2),
    'fontWeight': theme.typography.fontWeightMedium,
    '$expanded > &': {
      'fontWeight': theme.typography.fontWeightRegular,
    },
  },
  group: {
    'marginLeft': 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0, 0.5, 0.5),
  },
  labelIcon: {
    PaddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useStyles();
  const {labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other} = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}
        >
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

function handleProjectChange(event, value) {
  // restructer the array that populates the table
};

export default function DashboardDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography>
          {t('Projects')}
        </Typography>
      </div>
      <TreeView
        className={classes.root}
        defaultSelected={['1']}
        onNodeSelect={handleProjectChange}
      >
        <StyledTreeItem nodeId="1" selected labelText={t('All projects')} labelIcon={FolderOpenIcon}/>
        <StyledTreeItem nodeId="2" labelText={t('Project 1')} labelIcon={FolderOpenIcon} />
        <StyledTreeItem nodeId="3" labelText={t('Project 2')} labelIcon={FolderOpenIcon} />
        <StyledTreeItem nodeId="4" labelText={t('Project 3')} labelIcon={FolderOpenIcon} />
      </TreeView>
    </Drawer>
  );
}
