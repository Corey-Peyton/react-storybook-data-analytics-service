import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Typography,
  IconButton,
  Drawer,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

import {AnalystMenu} from '../../Dashboard/Common/ContextMenu';
import {analystList} from '../../../../Data/fakeData';
import {
  DialogNoLead,
  DialogAssignAsLead,
  DialogAssignAsSupport,
} from '../../CommonComponents/DialogBox';
import CustomizedSnackbar from './CustomizedSnackbar';

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiLink-root:focus': {
      border: 'none',
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[0],
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    zIndex: 500,
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    padding: theme.spacing(1.5, 3),
  },
  drawerLabel: {
    textTransform: 'uppercase',
  },
  drawerContent: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: `calc(100vh - ${theme.spacing(16)}px)`,
  },
  drawerSection: {
    'paddingTop': theme.spacing(3),
    'flexShrink': 0,
    '&:first-child': {
      padding: 0,
    },
  },
  listIcon: {
    color: theme.palette.common.black,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    width: '400px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  footerBtns: {
    marginLeft: theme.spacing(2),
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'padding': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': 'auto',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  vettingText: {
    paddingLeft: theme.spacing(1),
  },
  analystListing: {
    display: 'flex',
    flexFlow: 'column',
    marginRight: 'auto',
  },
  avatar: {
    color: theme.palette.grey[100],
  },
  widthAuto: {
    width: 'auto !important',
  },
  textNowrap: {
    whiteSpace: 'nowrap',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
}));

export default function ManageTeamDrawer(props) {
  const classes = useStyles();
  const {clickHandler, open, toggleManageTeamDrawer} = props;
  const {t} = useTranslation();
  const [analysts, setAnalysts] = React.useState(analystList);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(false);
  const [dialog, setOpen] = React.useState({
    noLead: false,
    assignAsLead: false,
    assignAsSupport: false,
  });

  const SnackbarClose = () => {
    setSnackbar(false);
  };

  const makeLead = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.role === 'lead' ?
          {...item, role: 'support'} :
          item.id === value.id ?
          {...item, role: 'lead'} :
          item,
        ),
    );
  };

  const makeSupport = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ? {...item, role: 'support'} : item,
        ),
    );
  };

  const unassignRequest = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ?
          {...item, assigned: false, role: 'support'} :
          item,
        ),
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarStyle = (value) => {
    return {
      backgroundColor: value,
    };
  };

  const toggleDialog = (state, value) => {
    setOpen({...dialog, [state]: value});
    handleClose();
  };

  const applyChanges = () => {
    let isLead = false;
    analysts.forEach((analyst) => {
      if (analyst.role === 'lead') {
        isLead = true;
      }
    });
    if (!isLead) {
      toggleDialog('noLead', !dialog.noLead);
      clickHandler();
    } else {
      setSnackbar(!snackbar);
      clickHandler();
    }
  };

  const leadAnalysts = () => {
    const content = analysts
        .filter((analyst) => analyst.assigned && analyst.role === 'lead')
        .map((analyst, index) => {
          return (
            <div className={classes.vettingRow} key={analyst.id}>
              <Avatar
                style={handleAvatarStyle(analyst.avatar)}
                className={classes.avatar}
              >
                {handleInitials(analyst.name)}
              </Avatar>
              <div className={classes.analystListing}>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.name}
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.email}
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.phone}
                </Typography>
              </div>
              <AnalystMenu
                role={'lead'}
                makeSupport={makeSupport(analyst)}
                unassignRequest={unassignRequest(analyst)}
                controls={index}
              />
            </div>
          );
        });
    if (content.length > 0) {
      return content;
    } else {
      return (
        <div className={clsx(classes.vettingRow, classes.justifyStart)}>
          <Avatar className={classes.pink}>
            <PersonIcon />
          </Avatar>
          <Box fontStyle="italic" className={classes.box}>
            <Typography variant="body2" color="textSecondary" className="ml-1">
              {t('No lead assigned')}
            </Typography>
          </Box>
        </div>
      );
    }
  };

  const supportAnalysts = () => {
    const content = analysts
        .filter((analyst) => analyst.assigned && analyst.role === 'support')
        .map((analyst, index) => {
          return (
            <div className={classes.vettingRow} key={analyst.id}>
              <Avatar
                style={handleAvatarStyle(analyst.avatar)}
                className={classes.avatar}
              >
                {handleInitials(analyst.name)}
              </Avatar>
              <div className={classes.analystListing}>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.name}
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.email}
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.phone}
                </Typography>
              </div>
              <AnalystMenu
                role={'support'}
                makeLead={makeLead(analyst)}
                unassignRequest={unassignRequest(analyst)}
                controls={index}
              />
            </div>
          );
        });
    if (content.length > 0) {
      return content;
    } else {
      return (
        <div className={clsx(classes.vettingRow, classes.justifyStart)}>
          <Avatar className={classes.pink}>
            <PersonIcon />
          </Avatar>
          <Box fontStyle="italic" className={classes.box}>
            <Typography variant="body2" color="textSecondary" className="ml-1">
              {t('No support assigned')}
            </Typography>
          </Box>
        </div>
      );
    }
  };

  const handleInitials = (value) => {
    const name = value;
    const splitName = name.split(' ');
    const initA = splitName[0].charAt(0).toUpperCase();
    const initB = splitName[1].charAt(0).toUpperCase();
    return initA.concat(initB);
  };

  const content = () => (
    <div className={classes.root}>
      <div className={classes.drawerHeader}>
        <Typography component="h2" variant="h6">
          {t('Manage assignees')}
        </Typography>
        <IconButton
          onClick={clickHandler}
          edge="end"
          id="details-close"
          aria-label={t('Project information panel - close panel')}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.drawerContent}>
        <div className={classes.vettingSection}>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Typography variant="subtitle1">{t('Assignees')}</Typography>
            </div>
            <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.textNowrap}
                color="primary"
              >
                Assign me as
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="assign-as-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* This menu is only visible if the current user is NOT already assigned to the request */}
                <MenuItem
                  onClick={() => {
                    toggleDialog('assignAsLead', !dialog.assignAsLead);
                  }}
                >
                  Assign me as lead
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toggleDialog('assignAsSupport', !dialog.assignAsSupport);
                  }}
                >
                  Assign me as support
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Typography variant="subtitle2">{t('Lead')}</Typography>
            </div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>{leadAnalysts()}</div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Typography variant="subtitle2">{t('Support')}</Typography>
            </div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>{supportAnalysts()}</div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <Button
          variant="contained"
          color="default"
          className={classes.footerBtns}
          onClick={clickHandler}
        >
          {t('Cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.footerBtns}
          onClick={() => {
            applyChanges();
          }}
        >
          {t('Apply')}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onEscapeKeyDown={clickHandler}
        onBackdropClick={clickHandler}
        variant="temporary"
        className={classes.drawer}
      >
        {content()}
      </Drawer>
      <DialogNoLead
        open={dialog.noLead}
        toggleDialog={() => toggleDialog('noLead', !dialog.noLead)}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <DialogAssignAsLead
        open={dialog.assignAsLead}
        toggleDialog={() => toggleDialog('assignAsLead', !dialog.assignAsLead)}
      />
      <DialogAssignAsSupport
        open={dialog.assignAsSupport}
        toggleDialog={() =>
          toggleDialog('assignAsSupport', !dialog.assignAsSupport)
        }
      />
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message={t('Assignee changes applied to request 0000-00001')}
        toggleSnackbar={SnackbarClose}
      />
    </div>
  );
}
