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
} from '../../CommonComponents/Snackbars';
import {
  DialogWithdraw,
  DialogUnassign,
  DialogSupport,
  DialogAssign,
  DialogUpdate,
  DialogDenied,
  DialogApprove,
} from '../../CommonComponents/DialogBox';
import {analystList} from '../../../../Data/fakeData';

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
    contextStatusClick,
    contextSummaryClick,
    toggleManageTeamDrawer,
    controls,
    analyst,
  } = props;
  const {t} = useTranslation();
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

  const assignAsHandler = () => {
    for (let i = 0; i < analystList.length; i++) {
      const person = analystList[i].name;
      const supports = analyst.support.filter((val) => val === person);

      if (person === analyst.lead) {
        return (
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  {t('Assign me as support')}
                </Typography>
              }
            />
          </MenuItem>
        );
      } else if (supports.length !== 0) {
        return (
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">
                  {t('Assign me as lead')}
                </Typography>
              }
            />
          </MenuItem>
        );
      }
    }
  };

  const startReviewHandler = () => {
    for (let i = 0; i < analystList.length; i++) {
      const person = analystList[i].name;

      if (person === analyst.lead) {
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
    }
  };

  if (status === 'draft') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>

          {assignAsHandler()}

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
          <MenuItem onClick={contextManageTeam}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Manage assignees')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={<Typography variant="body2">{t('Edit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleSnackbarOpen('snackbarSubmit');
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Submit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'submitted') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>

          {startReviewHandler()}

          {assignAsHandler()}

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
          <MenuItem onClick={contextManageTeam}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Manage assignees')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'under review') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogApprove', !open.dialogApprove, e);
            }}
            open={open.dialogApprove}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Approve')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogDenied', !open.dialogDenied, e);
            }}
            open={open.dialogDenied}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Deny')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogUpdate', !open.dialogUpdate, e);
            }}
            open={open.dialogUpdate}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{t('Request changes')}</Typography>
              }
            />
          </MenuItem>

          {assignAsHandler()}

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
          <MenuItem onClick={contextManageTeam}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Manage assignees')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={<Typography variant="body2">{t('Edit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleSnackbarOpen('snackbarSubmit');
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Submit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  }
  if (status === 'changes requested') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>

          {assignAsHandler()}

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
          <MenuItem onClick={contextManageTeam}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Manage assignees')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={<Typography variant="body2">{t('Edit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleSnackbarOpen('snackbarSubmit');
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Submit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'Changes requested') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogAssign', !open.dialogAssign, e);
            }}
            open={open.dialogAssign}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{t('Assign to me')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={<Typography variant="body2">{t('Edit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleSnackbarOpen('snackbarSubmit');
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Submit')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'Disclosure analysis') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogApprove', !open.dialogApprove, e);
            }}
            open={open.dialogApprove}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Approve')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogDenied', !open.dialogDenied, e);
            }}
            open={open.dialogDenied}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Deny')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogUpdate', !open.dialogUpdate, e);
            }}
            open={open.dialogUpdate}
          >
            <ListItemText
              primary={
                <Typography variant="body2">
                  {t('Request an update')}
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogUnassign', !open.dialogUnassign, e);
            }}
            open={open.dialogUnassign}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{t('Unassign from me')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogSupport', !open.dialogSupport, e);
            }}
            open={open.dialogSupport}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{t('Make me support')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={contextManageTeam}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Manage assignees')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'Withdrawn') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('View request')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleSnackbarOpen('snackbarReopen');
          }}
        >
          <ListItemText
            primary={<Typography variant="body2">{t('Reactivate')}</Typography>}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('View assignee')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('View summary')}</Typography>
            }
          />
        </MenuItem>
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
      </StyledMenu>
    );
  } else if (status === 'Approved') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'unassigned') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('View request')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogAssign', !open.dialogAssign, e);
          }}
          open={open.dialogAssign}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Assign to me')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogSupport', !open.dialogSupport, e);
          }}
          open={open.dialogSupport}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Make me support')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem onClick={contextManageTeam}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('Manage assignees')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemText
            primary={
              <Typography variant="body2">{t('View summary')}</Typography>
            }
          />
        </MenuItem>
      </StyledMenu>
    );
  } else if (status === 'Denied') {
    if (role === 'analyst') {
      StyledMenuVar = (
        <StyledMenu
          id={ariaControls}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View assignee')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemText
              primary={
                <Typography variant="body2">{t('View summary')}</Typography>
              }
            />
          </MenuItem>
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
      <DialogWithdraw
        toggleDialog={(e) =>
          toggleDialog('dialogWithdraw', !open.dialogWithdraw, e)
        }
        open={open.dialogWithdraw}
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
