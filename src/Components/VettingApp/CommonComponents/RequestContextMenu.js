import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  SnackbarAssignSupport,
  SnackbarDeleteRequest,
  SnackbarUnassign,
} from './Snackbars';
import {
  DialogInfo,
  DialogAssignAsSupport,
  DialogNoLead,
  DialogAssignAsLead,
} from './DialogBox';
import SummaryDrawer from './SummaryDrawer';
import {loggedInUser} from '../../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  menu: {
    paddingLeft: theme.spacing(1),
    borderLeft: '1px solid',
    borderLeftColor: theme.palette.divider,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    disableScrollLock={false}
    elevation={4}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export function ActionsMenu(props) {
  const classes = useStyles();
  const {role, status, toggleManageTeamDrawer, controls, request} = props;
  const {t} = useTranslation();
  const currentUser = loggedInUser();
  let StyledMenuVar;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState({
    snackbarDelete: false,
    snackbarUnassign: false,
    dialogAssign: false,
    dialogInfoAssignee: false,
    dialogInfoRequester: false,
    dialogNoLeadAssignSupport: false,
    dialogAssignAsSupport: false,
    dialogNoLeadUnassign: false,
    summaryDrawer: false,
  });

  const ariaControls = `actions-menu-${controls}`;

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleSnackbarOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleSnackbarClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const toggleSummary = (e) => {
    e.stopPropagation();
    handleClose(e);
    setOpen({...open, summaryDrawer: !open.summaryDrawer});
  };

  const contextManageTeam = (e) => {
    e.stopPropagation();
    handleClose(e);
    toggleManageTeamDrawer(e);
  };

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
    handleClose(e);
  };

  const assignAsSupport = (e) => {
    setOpen({
      ...open,
      dialogNoLeadAssignSupport: !open.dialogNoLeadAssignSupport,
      snackbarAssignSupport: true,
    });
  };

  const unassignLead = (e) => {
    setOpen({
      ...open,
      dialogNoLeadUnassign: !open.dialogNoLeadUnassign,
      snackbarUnassign: true,
    });
  };

  const assigneeDetailsMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogInfoAssignee', !open.dialogInfo, e);
        }}
      >
        <ListItemText
          primary={
            <Typography variant="body2">{t('Assignee details')}</Typography>
          }
        />
      </MenuItem>
    );
  };

  const requesterDetailsMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogInfoRequester', !open.dialogInfo, e);
        }}
      >
        <ListItemText
          primary={
            <Typography variant="body2">{t('Requester details')}</Typography>
          }
        />
      </MenuItem>
    );
  };

  const deleteMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleClose(e);
          handleSnackbarOpen('snackbarDelete');
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{t('Delete')}</Typography>}
        />
      </MenuItem>
    );
  };

  const assignAsLeadMenuItem = () => {
    if (request.lead !== currentUser) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogAssign', !open.dialogAssign, e);
          }}
          open={open.dialogAssign}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Assign me as lead')}</Typography>
            }
          />
        </MenuItem>
      );
    }
  };

  const assignAsSupportMenuItem = () => {
    const supports = request.support.includes(currentUser);

    if (currentUser === request.lead) {
      // if logged in user IS assigned as lead
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog(
                'dialogNoLeadAssignSupport',
                !open.dialogNoLeadAssignSupport,
                e,
            );
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">
                {t('Assign me as support')}
              </Typography>
            }
          />
        </MenuItem>
      );
    } else if (!supports) {
      // if logged in user is NOT assigned as lead OR support
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog(
                'dialogAssignAsSupport',
                !open.dialogAssignAsSupport,
                e,
            );
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">
                {t('Assign me as support')}
              </Typography>
            }
          />
        </MenuItem>
      );
    }
  };

  const unassignMenuItem = () => {
    const supports = request.support.includes(currentUser);

    if (currentUser === request.lead) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogNoLeadUnassign', !open.dialogNoLeadUnassign, e);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Unassign myself')}</Typography>
            }
          />
        </MenuItem>
      );
    } else if (supports) {
      return (
        <MenuItem
          onClick={(e) => {
            handleClose(e);
            handleSnackbarOpen('snackbarUnassign');
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Unassign myself')}</Typography>
            }
          />
        </MenuItem>
      );
    }
  };

  const manageAssigneesMenuItem = () => {
    return (
      <MenuItem onClick={contextManageTeam}>
        <ListItemText
          primary={
            <Typography variant="body2">{t('Manage assignees')}</Typography>
          }
        />
      </MenuItem>
    );
  };

  const summaryMenuItem = () => {
    return (
      <MenuItem onClick={toggleSummary}>
        <ListItemText
          primary={<Typography variant="body2">{t('Summary')}</Typography>}
        />
      </MenuItem>
    );
  };

  if (role === 'analyst') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {assignAsLeadMenuItem()}
        {assignAsSupportMenuItem()}
        {unassignMenuItem()}
        {manageAssigneesMenuItem()}
        {requesterDetailsMenuItem()}
        {summaryMenuItem()}
      </StyledMenu>
    );
  } else {
    // ROLE = RESEARCHER
    if (
      status === 'withdrawn' ||
      status === 'approved' ||
      status === 'denied'
    ) {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
          {deleteMenuItem()}
        </StyledMenu>
      );
    } else {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    }
  }

  return (
    <div className={classes.menu}>
      <IconButton
        onClick={handleClick}
        aria-controls={ariaControls}
        aria-haspopup="true"
        aria-label="Actions menu"
        edge="end"
        onKeyPress={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.key === 'Enter') {
            handleClick(e);
          }
        }}
      >
        <MoreVertIcon />
      </IconButton>
      {StyledMenuVar}
      {/* Delete request snackbar */}
      <SnackbarDeleteRequest
        open={open.snackbarDelete}
        handleClose={() => handleSnackbarClose('snackbarDelete')}
      />
      {/* Assign as support snackbar */}
      <SnackbarAssignSupport
        open={open.snackbarAssignSupport}
        handleClose={() => handleSnackbarClose('snackbarAssignSupport')}
      />
      {/* Unassign myself snackbar */}
      <SnackbarUnassign
        open={open.snackbarUnassign}
        handleClose={() => handleSnackbarClose('snackbarUnassign')}
      />
      {/* Assign as support dialog */}
      <DialogAssignAsSupport
        toggleDialog={(e) =>
          toggleDialog('dialogAssignAsSupport', !open.dialogAssignAsSupport, e)
        }
        open={open.dialogAssignAsSupport}
      />
      {/* Assign lead as support warning dialog */}
      <DialogNoLead
        toggleDialog={(e) =>
          toggleDialog(
              'dialogNoLeadAssignSupport',
              !open.dialogNoLeadAssignSupport,
              e,
          )
        }
        open={open.dialogNoLeadAssignSupport}
        submitDialog={(e) => assignAsSupport(e)}
      />
      {/* Unassign lead warning dialog */}
      <DialogNoLead
        toggleDialog={(e) =>
          toggleDialog('dialogNoLeadUnassign', !open.dialogNoLeadUnassign, e)
        }
        open={open.dialogNoLeadUnassign}
        submitDialog={(e) => unassignLead(e)}
      />
      {/* Assign as lead dialog */}
      <DialogAssignAsLead
        toggleDialog={(e) =>
          toggleDialog('dialogAssign', !open.dialogAssign, e)
        }
        open={open.dialogAssign}
      />
      {/* Assignee details dialog */}
      <DialogInfo
        toggleDialog={(e) =>
          toggleDialog('dialogInfoAssignee', !open.dialogInfoAssignee, e)
        }
        open={open.dialogInfoAssignee}
        header={'Assignee details'}
      />
      {/* Requester details dialog */}
      <DialogInfo
        toggleDialog={(e) =>
          toggleDialog('dialogInfoRequester', !open.dialogInfoRequester, e)
        }
        open={open.dialogInfoRequester}
        header={'Requester details'}
      />
      {/* Summary drawer */}
      <SummaryDrawer
        open={open.summaryDrawer}
        clickHandler={toggleSummary}
        status={status}
      />
    </div>
  );
}
