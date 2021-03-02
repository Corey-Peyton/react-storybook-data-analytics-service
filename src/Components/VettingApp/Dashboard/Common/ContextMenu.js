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

import CustomizedSnackbar from './CustomizedSnackbar';
import {
  DialogWithdraw,
  DialogManageTeam,
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    contextStatusClick(status);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const triggerAction = (messageVal, severityVal) => {
    setAction({...action, message: messageVal, severity: severityVal});
    setOpen({...open, snackbar: true});
    handleClose();
  };

  const toggleSummary = () => {
    handleClose();
    contextSummaryClick();
  };

  const contextManageTeam = () => {
    handleClose();
    toggleManageTeamDrawer();
  };

  const toggleSnackbar = (value) => {
    setOpen({...open, snackbar: !open.snackbar});
    handleClose();
  };

  const toggleDialog = (state, value) => {
    setOpen({...open, [state]: value});
    handleClose();
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
          onClick={() =>
            triggerAction(actionList.message.submit, actionList.severity.submit)
          }
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
          onClick={() => toggleDialog('dialogWithdraw', !open.dialogWithdraw)}
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
            onClick={() => toggleDialog('dialogAssign', !open.dialogAssign)}
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
            onClick={() => toggleDialog('dialogWithdraw', !open.dialogWithdraw)}
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
            onClick={() => toggleDialog('dialogAssign', !open.dialogAssign)}
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
            onClick={() => toggleDialog('dialogWithdraw', !open.dialogWithdraw)}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{t('Withdraw')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={() =>
              triggerAction(
                  actionList.message.submit,
                  actionList.severity.submit,
              )
            }
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
            onClick={() => toggleDialog('dialogApprove', !open.dialogApprove)}
            open={open.dialogApprove}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Approve')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={() => toggleDialog('dialogDenied', !open.dialogDenied)}
            open={open.dialogDenied}
          >
            <ListItemText
              primary={<Typography variant="body2">{t('Deny')}</Typography>}
            />
          </MenuItem>
          <MenuItem
            onClick={() => toggleDialog('dialogUpdate', !open.dialogUpdate)}
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
            onClick={() => toggleDialog('dialogUnassign', !open.dialogUnassign)}
            open={open.dialogUnassign}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{t('Unassign from me')}</Typography>
              }
            />
          </MenuItem>
          <MenuItem
            onClick={() => toggleDialog('dialogSupport', !open.dialogSupport)}
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
                <Typography variant="body2">{t('Manage team')}</Typography>
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
            onClick={() => toggleDialog('dialogWithdraw', !open.dialogWithdraw)}
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
          onClick={() =>
            triggerAction(actionList.message.reopen, actionList.severity.reopen)
          }
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PageReloadIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('Reopen')}</Typography>}
          />
        </MenuItem>
        <MenuItem
          onClick={() =>
            triggerAction(actionList.message.delete, actionList.severity.delete)
          }
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
          onClick={() => toggleDialog('dialogApprove', !open.dialogApprove)}
          open={open.dialogApprove}
        >
          <ListItemText
            primary={<Typography variant="body2">{t('Approve')}</Typography>}
          />
        </MenuItem>
        <MenuItem
          onClick={() => toggleDialog('dialogDenied', !open.dialogDenied)}
          open={open.dialogDenied}
        >
          <ListItemText
            primary={<Typography variant="body2">{t('Deny')}</Typography>}
          />
        </MenuItem>
        <MenuItem
          onClick={() => toggleDialog('dialogUpdate', !open.dialogUpdate)}
          open={open.dialogUpdate}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Request an update')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => toggleDialog('dialogUnassign', !open.dialogUnassign)}
          open={open.dialogUnassign}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Unassign from me')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => toggleDialog('dialogSupport', !open.dialogSupport)}
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
              <Typography variant="body2">{t('Manage team')}</Typography>
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
          onClick={() => toggleDialog('dialogAssign', !open.dialogAssign)}
          open={open.dialogAssign}
        >
          <ListItemText
            primary={
              <Typography variant="body2">{t('Assign to me')}</Typography>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => toggleDialog('dialogSupport', !open.dialogSupport)}
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
              <Typography variant="body2">{t('Manage team')}</Typography>
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
      >
        <MoreVertIcon />
      </IconButton>
      {StyledMenuVar}

      <CustomizedSnackbar
        open={open.snackbar}
        severity={action.severity}
        message={action.message}
        toggleSnackbar={toggleSnackbar}
        role="alert"
      />
      <DialogWithdraw
        toggleDialog={() =>
          toggleDialog('dialogWithdraw', !open.dialogWithdraw)
        }
        open={open.dialogWithdraw}
      />
      <DialogManageTeam
        toggleDialog={() =>
          toggleDialog('dialogManageTeam', !open.dialogManageTeam)
        }
        open={open.dialogManageTeam}
      />
      <DialogUnassign
        toggleDialog={() =>
          toggleDialog('dialogUnassign', !open.dialogUnassign)
        }
        open={open.dialogUnassign}
      />
      <DialogSupport
        toggleDialog={() => toggleDialog('dialogSupport', !open.dialogSupport)}
        open={open.dialogSupport}
      />
      <DialogAssign
        toggleDialog={() => toggleDialog('dialogAssign', !open.dialogAssign)}
        open={open.dialogAssign}
      />
      <DialogUpdate
        toggleDialog={() => toggleDialog('dialogUpdate', !open.dialogUpdate)}
        open={open.dialogUpdate}
      />
      <DialogDenied
        toggleDialog={() => toggleDialog('dialogDenied', !open.dialogDenied)}
        open={open.dialogDenied}
      />
      <DialogApprove
        toggleDialog={() => toggleDialog('dialogApprove', !open.dialogApprove)}
        open={open.dialogApprove}
      />
    </div>
  );
}

// //////////////////////////// Analyst role dialog box context menu
export function AnalystMenu(props) {
  const {role, makeSupport, makeLead, unassignRequest, controls} = props;
  const {t} = useTranslation();
  let StyledMenuVar;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const ariaControls = `context-menu-${controls}`;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  if (role === 'lead') {
    StyledMenuVar = (
      <StyledMenu
        id={ariaControls}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeSupport}>
          <ListItemText
            primary={
              <Typography variant="body2">
                {t('Assign user as support')}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem>
          <ListItemText
            primary={
              <Typography variant="body2" onClick={unassignRequest}>
                {t('Unassign user')}
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={makeLead}>
          <ListItemText
            primary={
              <Typography variant="body2">
                {t('Assign user as lead')}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem>
          <ListItemText
            primary={
              <Typography variant="body2" onClick={unassignRequest}>
                {t('Unassign user')}
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
      >
        <MoreVertIcon />
      </IconButton>
      {StyledMenuVar}
    </div>
  );
}
