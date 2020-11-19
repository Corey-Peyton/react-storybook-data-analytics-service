import React from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Typography,
  Drawer,
  Tooltip,
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {makeStyles} from '@material-ui/styles';
import {createMuiTheme, MuiThemeProvider, fade} from '@material-ui/core/styles';

export const DRAWER_WIDTH = 240;

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
    height: `calc(100% - 70px)`,
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(10.5),
    paddingRight: theme.spacing(1.25),
    zIndex: '10 !important',
    overflowX: 'hidden',
  },
  drawerHeader: {
    'display': 'flex',
    'alignItems': 'center',
    'zIndex': 10,
    'position': 'sticky',
    'top': 0,
    'background': 'white',
    '& > svg': {
      marginRight: theme.spacing(2),
    },
    'padding': theme.spacing(3, 0, 2, 3),
  },
  drawerSection: {
    padding: theme.spacing(3, 2, 0, 2),
    flexShrink: 0,
  },
  drawerSectionIndex: {
    zIndex: -10,
  },
  treeItem: {
    '&:last-child': {
      paddingBottom: theme.spacing(10.5),
    },
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
      backgroundColor: fade(theme.palette.primary.main, 0.25),
      color: theme.palette.primary.main,
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
    '&>.MuiTreeItem-iconContainer': {
      width: 0,
      margin: 0,
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
    paddingLeft: 0,
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0, 0.5, 0.5),
    paddingLeft: 0,
  },
  labelIcon: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const theme = createMuiTheme((theme) => ({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '14px',
        color: 'white',
        backgroundColor: 'grey',
        border: '1px solid grey',
      },
    },
  },
}));

function StyledTreeItem(props) {
  const classes = useStyles();
  const {labelText, labelIcon: LabelIcon, labelInfo, tooltip, color, bgColor, ...other} = props;

  return (
    <TreeItem
      label={
        <MuiThemeProvider theme={theme}>
          <Tooltip title={labelText} placement="top" arrow>
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
          </Tooltip>
        </MuiThemeProvider>
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

export default function ProjectsDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const hashVar = window.location.hash.substring(2);

  const projectsArray = () => {
    if (hashVar === 'vetting-app/dashboard-researcher') {
      return ['Project 1', 'Project 2', 'Project 3'];
    } else {
      return ['All projects', 'Project 1', 'Project 2', 'Project 3'];
    }
  };

  function handleProjectChange(el, value) {
    let title = undefined;
    switch (value) {
      case '0':
        title = 'All projects';
        break;
      case '1':
        title = 'Project 1';
        break;
      case '2':
        title = 'Project 2';
        break;
      case '3':
        title = 'Project 3';
        break;
      default:
        title = 'All projects';
        break;
    }
    props.projectTitle(title);
  };

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
        <Typography variant='subtitle2'>
          {t('Projects')}
        </Typography>
      </div>
      <TreeView
        className={classes.root}
        defaultSelected={['0']}
        onNodeSelect={handleProjectChange}
      >
        {projectsArray().map((el, index) => (
          <StyledTreeItem
            nodeId={`${index}`}
            key={`${index}`}
            labelText={el}
            labelIcon={FolderOpenIcon}
            className={classes.treeItem}
            tooltip={el}
          />
        ),
        )}
      </TreeView>
    </Drawer>
  );
}
