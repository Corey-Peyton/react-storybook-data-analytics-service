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
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

import {AnalystMenu} from '../Dashboard/Common/ContextMenu';
import {analystList} from '../../../Data/fakeData';
import {
  DialogNoLead,
  DialogAssignAsLead,
  DialogAssignAsSupport,
} from './DialogBox';
import {SnackbarAssigneeChange} from './Snackbars';

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
    paddingLeft: theme.spacing(2),
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
  const [snackbar, setSnackbar] = React.useState({
    snackbarAssigneeChange: false,
  });
  const [assign, setAssign] = React.useState(() => {
    const current = analysts.filter((analyst) => analyst.current);
    if (!current[0].assigned) {
      return true;
    }
  });
  const [dialog, setOpen] = React.useState({
    noLead: false,
    assignAsLead: false,
    assignAsSupport: false,
  });

  const handleSnackbarOpen = (state) => {
    setSnackbar({...snackbar, [state]: true});
  };

  const handleSnackbarClose = (state) => {
    setSnackbar({...snackbar, [state]: false});
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

  const unassignLead = () => {
    toggleDialog('noLead', !dialog.noLead);
    toggleManageTeamDrawer();
    handleSnackbarOpen('snackbarAssigneeChange');
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

  const applyChanges = (e) => {
    let isLead = false;
    analysts.forEach((analyst) => {
      if (analyst.role === 'lead') {
        isLead = true;
      }
    });
    if (!isLead) {
      toggleDialog('noLead', !dialog.noLead);
    } else {
      setSnackbar(!snackbar);
      clickHandler();
    }
  };

  const toggleAssignMeMenu = (value) => {
    if (value.current && value.assigned) {
      setAssign(true);
    } else if (value.current && !value.assigned) {
      setAssign(false);
    }
  };

  const handleAssignMeAs = (value, role) => {
    const current = analysts.filter((analyst) => analyst.current);
    setAnalysts(
        analysts.map((item) =>
        item.role === 'lead' ?
          {...item, role: 'support'} :
          item.id === current[0].id ?
          {...item, assigned: true, role: role, phone: value} :
          item,
        ),
    );
    setAssign(false);
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
                  {analyst.current ? ' (You)' : false}
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
                current={analyst.current}
                toggleAssignMeMenu={() => toggleAssignMeMenu(analyst)}
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
          <Typography variant="body2" color="textSecondary" className="ml-2">
            {t('No lead assigned')}
          </Typography>
        </div>
      );
    }
  };

  const supportAnalysts = () => {
    const sortedAnalysts = analysts.sort((a, b) =>
      a.name.localeCompare(b.name),
    ); // sorts supported analysts alphabetically

    const content = sortedAnalysts
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
                  {analyst.current ? ' (You)' : false}
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
                current={analyst.current}
                toggleAssignMeMenu={() => toggleAssignMeMenu(analyst)}
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
          <Typography variant="body2" color="textSecondary" className="ml-2">
            {t('No support assigned')}
          </Typography>
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
              {assign && (
                <>
                  <Button
                    aria-controls="assign-as-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    className={clsx(
                        classes.textNowrap,
                        'MuiIconButton-edgeEnd',
                    )}
                    color="primary"
                  >
                    Assign me as
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="assign-as-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    disablePortal
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        toggleDialog('assignAsLead', !dialog.assignAsLead);
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            Assign me as lead
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        toggleDialog(
                            'assignAsSupport',
                            !dialog.assignAsSupport,
                        );
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            Assign me as support
                          </Typography>
                        }
                      />
                    </MenuItem>
                  </Menu>
                </>
              )}
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
          variant="outlined"
          color="primary"
          className={classes.footerBtns}
          onClick={clickHandler}
        >
          {t('Cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.footerBtns}
          onClick={(e) => {
            applyChanges(e);
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
        onBackdropClick={(e) => {
          e.preventDefault();
        }}
        variant="temporary"
        className={classes.drawer}
        disableBackdropClick
      >
        {content()}
      </Drawer>
      <DialogNoLead
        open={dialog.noLead}
        submitDialog={unassignLead}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
        origin="manageTeamDrawer"
      />
      <DialogAssignAsLead
        open={dialog.assignAsLead}
        toggleDialog={() => toggleDialog('assignAsLead', !dialog.assignAsLead)}
        handleAssignMeAs={handleAssignMeAs}
        origin="manageTeamDrawer"
      />
      <DialogAssignAsSupport
        open={dialog.assignAsSupport}
        toggleDialog={() =>
          toggleDialog('assignAsSupport', !dialog.assignAsSupport)
        }
        handleAssignMeAs={handleAssignMeAs}
        origin="manageTeamDrawer"
      />
      <SnackbarAssigneeChange
        open={snackbar.snackbarAssigneeChange}
        handleClose={() => handleSnackbarClose('snackbarAssigneeChange')}
      />
    </div>
  );
}
