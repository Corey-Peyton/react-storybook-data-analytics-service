import React from 'react';
import {useTranslation} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {SnackbarDeleteRequest} from './Snackbars';
import {
  DialogUnassign,
  DialogSupport,
  DialogAssign,
  DialogInfo,
} from './DialogBox';
import SummaryDrawer from './SummaryDrawer';
import {loggedInUser} from '../../../Data/fakeData';

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

// //////////////////////////// Dashboard actions menu
export function ActionsMenu(props) {
  const {
    role,
    status,
    // contextStatusClick,
    // contextSummaryClick,
    // toggleManageTeamDrawer,
    controls,
    request,
  } = props;
  const {t} = useTranslation();
  const currentUser = loggedInUser();
  let StyledMenuVar;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState({
    snackbarReopen: false,
    snackbarSubmit: false,
    snackbarDelete: false,
    dialogWithdraw: false,
    dialogManageTeam: false,
    dialogUnassign: false,
    dialogSupport: false,
    dialogAssign: false,
    dialogUpdate: false,
    dialogDenied: false,
    dialogApprove: false,
    dialogInfo: false,
    summaryDrawer: false,
    role: '',
  });

  const ariaControls = `actions-menu-${controls}`;

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    // contextStatusClick(status);
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
    // contextSummaryClick();
  };
  const contextManageTeam = (e) => {
    e.stopPropagation();
    handleClose(e);
    // toggleManageTeamDrawer(e);
  };

  const toggleDialog = (state, value, e, role) => {
    e.stopPropagation();
    setOpen({...open, [state]: value, role: role});
    handleClose(e);
  };

  const assigneeDetailsMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogInfo', !open.dialogInfo, e, 'assignee');
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
          toggleDialog('dialogInfo', !open.dialogInfo, e, 'requester');
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

    if (currentUser === request.lead || !supports) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogSupport', !open.dialogSupport, e);
          }}
          open={open.dialogSupport}
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

    if (currentUser === request.lead || supports) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogUnassign', !open.dialogUnassign, e);
          }}
          open={open.dialogUnassign}
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
    <div>
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

      <SnackbarDeleteRequest
        open={open.snackbarDelete}
        handleClose={() => handleSnackbarClose('snackbarDelete')}
      />
      <DialogUnassign
        toggleDialog={(e) =>
          toggleDialog('dialogUnassign', !open.dialogUnassign, e)
        }
        open={open.dialogUnassign}
      />
      <DialogSupport
        toggleDialog={(e) =>
          toggleDialog('dialogSupport', !open.dialogSupport, e)
        }
        open={open.dialogSupport}
      />
      <DialogAssign
        toggleDialog={(e) =>
          toggleDialog('dialogAssign', !open.dialogAssign, e)
        }
        open={open.dialogAssign}
      />
      <DialogInfo
        toggleDialog={(e) => toggleDialog('dialogInfo', !open.dialogInfo, e)}
        open={open.dialogInfo}
        header={
          open.role === 'assignee' ? 'Assignee details' : 'Requester details'
        }
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
