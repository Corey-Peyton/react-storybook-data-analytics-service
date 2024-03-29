import React from 'react';
import {useTranslation} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  SnackbarDeleteRequest,
  SnackbarReactivateRequest,
  SnackbarSubmitRequest,
  SnackbarAssignLead,
  SnackbarAssignSupport,
  SnackbarUnassign,
} from '../../CommonComponents/Snackbars';
import {
  DialogUnassign,
  DialogSupport,
  DialogUpdate,
  DialogDenied,
  DialogApprove,
  DialogAssigneeDetails,
  DialogRequesterDetails,
  DialogNoLead,
  DialogAssignAsLead,
  DialogAssignAsSupport,
  DialogDelete,
  DialogWithdraw,
} from '../../CommonComponents/DialogBox';
import {loggedInUser} from '../../../../Data/fakeData';

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
    statusHead,
    status,
    contextStatusClick,
    contextSummaryClick,
    toggleManageTeamDrawer,
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
    snackbarAssignLead: false,
    snackbarAssignSupport: false,
    snackbarUnassign: false,
    dialogManageTeam: false,
    dialogUnassign: false,
    dialogSupport: false,
    dialogAssign: false,
    dialogUpdate: false,
    dialogDenied: false,
    dialogApprove: false,
    dialogAssigneeDetails: false,
    dialogRequesterDetails: false,
    dialogNoLeadUnassign: false,
    dialogNoLeadAssignSupport: false,
    dialogAssignAsLead: false,
    dialogAssignAsSupport: false,
    dialogDelete: false,
    dialogWithdraw: false,
  });

  const ariaControls = `actions-menu-${controls}`;

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    contextStatusClick(status);
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
    contextSummaryClick();
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

  const unassignLead = (e) => {
    setOpen({
      ...open,
      dialogNoLeadUnassign: !open.dialogNoLeadUnassign,
      snackbarUnassign: true,
    });
  };

  const assignSupportNoLead = (e) => {
    setOpen({
      ...open,
      dialogNoLeadAssignSupport: !open.dialogNoLeadAssignSupport,
      snackbarAssignSupport: true,
    });
  };

  const deleteRequest = (e) => {
    e.stopPropagation();
    setOpen({...open, dialogDelete: false, snackbarDelete: true});
  };

  const viewRequestMenuItem = () => {
    return (
      <MenuItem onClick={handleClose}>
        <ListItemText
          primary={<Typography variant="body2">{t('View request')}</Typography>}
        />
      </MenuItem>
    );
  };

  const editMenuItem = () => {
    return (
      <MenuItem onClick={handleClose}>
        <ListItemText
          primary={<Typography variant="body2">{t('Edit')}</Typography>}
        />
      </MenuItem>
    );
  };

  const submitMenuItem = (e) => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleClose(e);
          handleSnackbarOpen('snackbarSubmit');
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{t('Submit')}</Typography>}
        />
      </MenuItem>
    );
  };

  const withdrawMenuItem = (e) => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleClose(e);
          toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
        />
      </MenuItem>
    );
  };

  const assigneeDetailsMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogAssigneeDetails', !open.dialogAssigneeDetails, e);
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
          toggleDialog(
              'dialogRequesterDetails',
              !open.dialogRequesterDetails,
              e,
          );
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
          toggleDialog('dialogDelete', !open.dialogDelete, e);
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{t('Delete')}</Typography>}
        />
      </MenuItem>
    );
  };

  const assignAsLeadMenuItem = () => {
    const supports = request.support.includes(currentUser);

    if (supports) {
      // if logged in user IS assigned as support
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleClose(e);
            handleSnackbarOpen('snackbarAssignLead');
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Assign me as lead')}</Typography>
            }
          />
        </MenuItem>
      );
    } else if (currentUser !== request.lead) {
      // if logged in user is NOT assigned as lead OR support
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogAssignAsLead', !open.dialogAssignAsLead, e);
          }}
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

  const startReviewHandler = () => {
    if (currentUser === request.lead) {
      return (
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('Start review')}</Typography>
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

  const approveMenuItem = () => {
    if (currentUser === request.lead) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogApprove', !open.dialogApprove, e);
          }}
        >
          <ListItemText
            primary={<Typography variant="body2">{t('Approve')}</Typography>}
          />
        </MenuItem>
      );
    }
  };

  const denyMenuItem = () => {
    if (currentUser === request.lead) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogDenied', !open.dialogDenied, e);
          }}
        >
          <ListItemText
            primary={<Typography variant="body2">{t('Deny')}</Typography>}
          />
        </MenuItem>
      );
    }
  };

  const requestChangesMenuItem = () => {
    if (currentUser === request.lead) {
      return (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogUpdate', !open.dialogUpdate, e);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Request changes')}</Typography>
            }
          />
        </MenuItem>
      );
    }
  };

  const reactivateMenuItem = () => {
    return (
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleSnackbarOpen('snackbarReopen');
          handleClose(e);
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{t('Reactivate')}</Typography>}
        />
      </MenuItem>
    );
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
    if (statusHead === 'assigned to me') {
      if (status === 'draft') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'submitted') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {startReviewHandler()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'under review') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {approveMenuItem()}
            {denyMenuItem()}
            {requestChangesMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'changes requested') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      }
    } else if (statusHead === 'unassigned') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
          {assignAsLeadMenuItem()}
          {assignAsSupportMenuItem()}
          {manageAssigneesMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    } else if (statusHead === 'active') {
      if (status === 'draft') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'submitted') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {startReviewHandler()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'under review') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {approveMenuItem()}
            {denyMenuItem()}
            {requestChangesMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {unassignMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'changes requested') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {assignAsLeadMenuItem()}
            {assignAsSupportMenuItem()}
            {manageAssigneesMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      }
    } else if (statusHead === 'approved') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
          {reactivateMenuItem()}
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    } else if (statusHead === 'denied') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
          {reactivateMenuItem()}
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    }
  } else {
    // ROLE = RESEARCHER
    if (statusHead === 'active') {
      if (status === 'draft') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {editMenuItem()}
            {submitMenuItem()}
            {assigneeDetailsMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
            {deleteMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'submitted') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {withdrawMenuItem()}
            {assigneeDetailsMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'under review') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {viewRequestMenuItem()}
            {withdrawMenuItem()}
            {assigneeDetailsMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      } else if (status === 'changes requested') {
        StyledMenuVar = (
          <StyledMenu
            id={ariaControls}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {editMenuItem()}
            {submitMenuItem()}
            {withdrawMenuItem()}
            {assigneeDetailsMenuItem()}
            {requesterDetailsMenuItem()}
            {summaryMenuItem()}
          </StyledMenu>
        );
      }
    } else if (statusHead === 'withdrawn') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
          {reactivateMenuItem()}
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    } else if (statusHead === 'approved') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
          {assigneeDetailsMenuItem()}
          {requesterDetailsMenuItem()}
          {summaryMenuItem()}
        </StyledMenu>
      );
    } else if (statusHead === 'denied') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {viewRequestMenuItem()}
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

      <SnackbarReactivateRequest
        open={open.snackbarReopen}
        handleClose={() => handleSnackbarClose('snackbarReopen')}
      />
      <SnackbarSubmitRequest
        open={open.snackbarSubmit}
        handleClose={() => handleSnackbarClose('snackbarSubmit')}
      />
      <SnackbarDeleteRequest
        open={open.snackbarDelete}
        handleClose={() => handleSnackbarClose('snackbarDelete')}
      />
      <SnackbarAssignLead
        open={open.snackbarAssignLead}
        handleClose={() => handleSnackbarClose('snackbarAssignLead')}
      />
      <SnackbarAssignSupport
        open={open.snackbarAssignSupport}
        handleClose={() => handleSnackbarClose('snackbarAssignSupport')}
      />
      <SnackbarUnassign
        open={open.snackbarUnassign}
        handleClose={() => handleSnackbarClose('snackbarUnassign')}
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
      <DialogAssignAsLead
        toggleDialog={(e) =>
          toggleDialog('dialogAssign', !open.dialogAssign, e)
        }
        open={open.dialogAssign}
      />
      <DialogUpdate
        toggleDialog={(e) =>
          toggleDialog('dialogUpdate', !open.dialogUpdate, e)
        }
        open={open.dialogUpdate}
      />
      <DialogDenied
        toggleDialog={(e) =>
          toggleDialog('dialogDenied', !open.dialogDenied, e)
        }
        open={open.dialogDenied}
      />
      <DialogApprove
        toggleDialog={(e) =>
          toggleDialog('dialogApprove', !open.dialogApprove, e)
        }
        open={open.dialogApprove}
      />
      <DialogWithdraw
        toggleDialog={(e) =>
          toggleDialog('dialogWithdraw', !open.dialogWithdraw, e)
        }
        open={open.dialogWithdraw}
      />
      <DialogRequesterDetails
        toggleDialog={(e) =>
          toggleDialog(
              'dialogRequesterDetails',
              !open.dialogRequesterDetails,
              e,
          )
        }
        open={open.dialogRequesterDetails}
      />
      <DialogAssigneeDetails
        toggleDialog={(e) =>
          toggleDialog('dialogAssigneeDetails', !open.dialogAssigneeDetails, e)
        }
        open={open.dialogAssigneeDetails}
        role={role}
        statusHead={statusHead}
      />
      <DialogNoLead
        toggleDialog={(e) =>
          toggleDialog('dialogNoLeadUnassign', !open.dialogNoLeadUnassign, e)
        }
        open={open.dialogNoLeadUnassign}
        submitDialog={unassignLead}
      />
      <DialogNoLead
        toggleDialog={(e) =>
          toggleDialog(
              'dialogNoLeadAssignSupport',
              !open.dialogNoLeadAssignSupport,
              e,
          )
        }
        open={open.dialogNoLeadAssignSupport}
        submitDialog={assignSupportNoLead}
      />
      <DialogAssignAsLead
        open={open.dialogAssignAsLead}
        toggleDialog={(e) =>
          toggleDialog('dialogAssignAsLead', !open.dialogAssignAsLead, e)
        }
        origin="actionsMenu"
      />
      <DialogAssignAsSupport
        open={open.dialogAssignAsSupport}
        toggleDialog={(e) =>
          toggleDialog('dialogAssignAsSupport', !open.dialogAssignAsSupport, e)
        }
        origin="actionsMenu"
      />
      <DialogDelete
        submitDialog={deleteRequest}
        open={open.dialogDelete}
        toggleDialog={(e) => {
          toggleDialog('dialogDelete', !open.dialogDelete, e);
        }}
      />
    </div>
  );
}

// //////////////////////////// Analyst role dialog box context menu
export function AnalystMenu(props) {
  const {
    role,
    makeSupport,
    makeLead,
    unassignRequest,
    controls,
    current,
    toggleAssignMeMenu,
  } = props;
  const {t} = useTranslation();
  let StyledMenuVar;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const ariaControls = `context-menu-${controls}`;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  if (role === 'lead') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        disablePortal
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeSupport}>
          <ListItemText
            primary={
              <Typography variant="body2">
                {current ?
                  t('Assign me as support') :
                  t('Assign user as support')}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            unassignRequest();
            toggleAssignMeMenu();
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">
                {current ? t('Unassign myself') : t('Unassign user')}
              </Typography>
            }
          />
        </MenuItem>
      </StyledMenu>
    );
  } else if (role === 'support') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        disablePortal
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeLead}>
          <ListItemText
            primary={
              <Typography variant="body2">
                {current ? t('Assign me as lead') : t('Assign user as lead')}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            unassignRequest();
            toggleAssignMeMenu();
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body2">
                {current ? t('Unassign myself') : t('Unassign user')}
              </Typography>
            }
          />
        </MenuItem>
      </StyledMenu>
    );
  }
  return (
    <div>
      <IconButton
        onClick={handleClick}
        aria-controls={ariaControls}
        aria-haspopup="true"
        aria-label="Actions menu"
        edge="end"
      >
        <MoreVertIcon />
      </IconButton>
      {StyledMenuVar}
    </div>
  );
}
