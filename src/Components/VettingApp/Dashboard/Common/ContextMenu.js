import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@mdi/react';
import PageReloadIcon from '../../CommonComponents/PageReloadIcon';
import {mdiFileDocumentOutline, mdiPencil, mdiEye, mdiShare} from '@mdi/js';

import {Snackbar} from '../../../CommonComponents/Snackbar';
import {
  DialogWithdraw,
  DialogUnassign,
  DialogSupport,
  DialogAssign,
  DialogUpdate,
  DialogDenied,
  DialogApprove,
} from '../../CommonComponents/DialogBox';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    width: 'auto',
    minWidth: 0,
    paddingRight: theme.spacing(2),
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

// //////////////////////////// Dashboard actions menu
export function ActionsMenu(props) {
  const {
    role,
    status,
    contextStatusClick,
    contextSummaryClick,
    toggleManageTeamDrawer,
    controls,
  } = props;
  const {t} = useTranslation();
  let StyledMenuVar;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState({
    snackbar: false,
    dialogWithdraw: false,
    dialogManageTeam: false,
    dialogUnassign: false,
    dialogSupport: false,
    dialogAssign: false,
    dialogUpdate: false,
    dialogDenied: false,
    dialogApprove: false,
  });
  const [action, setAction] = React.useState({
    message: '',
    severity: '',
  });

  const actionList = {
    message: {
      withdraw: 'Vetting request has been withdrawn',
      reopen: 'Vetting request has been reopened',
      submit: 'Vetting request has been submitted',
      delete: 'Vetting request has been deleted',
    },
    severity: {
      withdraw: 'success',
      reopen: 'success',
      submit: 'success',
      delete: 'error',
    },
  };

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

  const triggerAction = (messageVal, severityVal, e) => {
    e.stopPropagation();
    setAction({...action, message: messageVal, severity: severityVal});
    setOpen({...open, snackbar: true});
    handleClose(e);
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

  const toggleSnackbar = (e) => {
    setOpen({...open, snackbar: !open.snackbar});
  };

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
    handleClose(e);
  };

  if (status === 'Draft') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiPencil} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Edit')}</Typography>}
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            triggerAction(
                actionList.message.submit,
                actionList.severity.submit,
                e,
            );
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2">{t('Submit request')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog('dialogWithdraw', !open.dialogWithdraw, e);
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
          />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon
              path={mdiFileDocumentOutline}
              size={1}
              className="icon-grey"
            />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Summary')}</Typography>}
          />
        </MenuItem>
      </StyledMenu>
    );
  } else if (status === 'Submitted') {
    if (role === 'analyst') {
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
            <ListItemIcon className={classes.listItemIcon}>
              <Icon path={mdiEye} size={1} className="icon-grey" />
            </ListItemIcon>
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
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon
                path={mdiFileDocumentOutline}
                size={1}
                className="icon-grey"
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'Update requested') {
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
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
            <ListItemIcon className={classes.listItemIcon}>
              <Icon path={mdiEye} size={1} className="icon-grey" />
            </ListItemIcon>
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
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              triggerAction(
                  actionList.message.submit,
                  actionList.severity.submit,
                  e,
              );
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Icon path={mdiShare} size={1} className="icon-grey" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">{t('Resubmit request')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon
                path={mdiFileDocumentOutline}
                size={1}
                className="icon-grey"
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem onClick={toggleSummary}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon
                path={mdiFileDocumentOutline}
                size={1}
                className="icon-grey"
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            triggerAction(
                actionList.message.reopen,
                actionList.severity.reopen,
                e,
            );
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PageReloadIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Reopen')}</Typography>}
          />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            triggerAction(
                actionList.message.delete,
                actionList.severity.delete,
                e,
            );
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Delete')}</Typography>}
          />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon
              path={mdiFileDocumentOutline}
              size={1}
              className="icon-grey"
            />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
          <MenuItem onClick={toggleSummary}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon
                path={mdiFileDocumentOutline}
                size={1}
                className="icon-grey"
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
            />
          </MenuItem>
        </StyledMenu>
      );
    }
  } else if (status === 'assigned to me') {
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
              <Typography variant="body2">{t('Request an update')}</Typography>
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
            primary={<Typography variant="body2">{t('Summary')}</Typography>}
          />
        </MenuItem>
      </StyledMenu>
    );
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
            primary={<Typography variant="body2">{t('Summary')}</Typography>}
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
          <MenuItem onClick={toggleSummary}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon
                path={mdiFileDocumentOutline}
                size={1}
                className="icon-grey"
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Summary')}</Typography>}
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

      <Snackbar
        open={open.snackbar}
        severity={action.severity}
        message={action.message}
        toggleSnackbar={toggleSnackbar}
        role="alert"
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
