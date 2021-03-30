import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react';
import {
  mdiContentSave,
  mdiEmailEditOutline,
  mdiInboxArrowDown,
  mdiMenuDown,
  mdiPlaySpeed,
  mdiProgressWrench,
  mdiRestore,
  mdiUndo,
} from '@mdi/js';
import {
  SnackbarApproveRequest,
  SnackbarDenyRequest,
  SnackbarReactivateRequest,
  SnackbarSaveRequest,
  SnackbarStartReview,
  SnackbarSubmitRequest,
} from './Snackbars';
import {
  DialogDenied,
  DialogUpdate,
  DialogApprove,
  DialogWithdraw,
} from './DialogBox';
import {ActionsMenu} from './RequestContextMenu';
import {loggedInUser} from '../../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: theme.spacing(0, -2),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  headerBtnEnd: {
    paddingRight: theme.spacing(2),
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
}));

function RequestToolbar(props) {
  const classes = useStyles();
  const currentUser = loggedInUser();
  const {status, role, assignees} = {...props};

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState({
    dialogApprove: false,
    dialogUpdate: false,
    dialogDenied: false,
    dialogWithdraw: false,
    snackbarReactivate: false,
    snackbarSubmit: false,
    snackbarSave: false,
    snackbarDeny: false,
    snackbarApprove: false,
    snackbarStart: false,
  });

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const reactivateButton = () => {
    if (
      status === 'approved' ||
      status === 'denied' ||
      status === 'withdrawn'
    ) {
      return (
        <div className={classes.headerBtnEnd}>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiRestore} size={1} />}
            onClick={() => handleClickOpen('snackbarReactivate')}
          >
            Reactivate
          </Button>
        </div>
      );
    }
  };

  const requestChangesButton = () => {
    if (status === 'under review') {
      return (
        <Button
          variant="outlined"
          color="primary"
          className={classes.headerBtn}
          startIcon={<Icon path={mdiEmailEditOutline} size={1} />}
          onClick={() => handleClickOpen('dialogUpdate')}
        >
          Request changes
        </Button>
      );
    }
  };

  const resolveButton = () => {
    if (status === 'under review') {
      return (
        <div className={classes.headerBtnEnd}>
          <Button
            aria-controls="resolve-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiProgressWrench} size={1} />}
            endIcon={<Icon path={mdiMenuDown} size={1} />}
          >
            Resolve
          </Button>
          <Menu
            id="resolve-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleClickOpen('dialogApprove')}>
              Approve
            </MenuItem>
            <MenuItem onClick={() => handleClickOpen('dialogDenied')}>
              Deny
            </MenuItem>
          </Menu>
        </div>
      );
    }
  };

  const saveButton = () => {
    if (status === 'draft' || status === 'changes requested') {
      return (
        <Button
          variant="outlined"
          color="primary"
          className={classes.headerBtn}
          startIcon={<Icon path={mdiContentSave} size={1} />}
          onClick={() => handleClickOpen('snackbarSave')}
        >
          Save
        </Button>
      );
    }
  };

  const startReviewButton = () => {
    if (status === 'submitted') {
      return (
        <div className={classes.headerBtnEnd}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiPlaySpeed} size={1} />}
            onClick={() => handleClickOpen('snackbarStart')}
          >
            Start review
          </Button>
        </div>
      );
    }
  };

  const submitButton = () => {
    if (status === 'draft' || status === 'changes requested') {
      return (
        <div className={classes.headerBtnEnd}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiInboxArrowDown} size={1} />}
            onClick={() => handleClickOpen('snackbarSubmit')}
          >
            Submit
          </Button>
        </div>
      );
    }
  };

  const withdrawButton = () => {
    if (
      status !== 'withdrawn' &&
      status !== 'approved' &&
      status !== 'denied'
    ) {
      return (
        <div
          className={clsx({
            [classes.headerBtnEnd]:
              status !== 'draft' && status !== 'changes requested',
          })}
        >
          <Button
            className={clsx({
              [classes.headerBtn]:
                status === 'draft' || status === 'changes requested',
            })}
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiUndo} size={1} />}
            onClick={() => handleClickOpen('dialogWithdraw')}
          >
            Withdraw
          </Button>
        </div>
      );
    }
  };

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="Back to dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" component="p" className={classes.title}>
          Dashboard
        </Typography>
        {role === 'analyst' && (
          <>
            {assignees.lead === currentUser && (
              <>
                {reactivateButton()}
                {requestChangesButton()}
                {resolveButton()}
                {startReviewButton()}
              </>
            )}
          </>
        )}
        {role === 'researcher' && (
          <>
            {withdrawButton()}
            {saveButton()}
            {submitButton()}
            {status === 'withdrawn' && reactivateButton()}
          </>
        )}
        <ActionsMenu
          toggleManageTeamDrawer={props.toggleManageTeamDrawer}
          status={props.status}
          role={props.role}
          request={props.assignees}
        />
        {/* Request changes dialog */}
        <DialogUpdate
          toggleDialog={() => handleClickClose('dialogUpdate')}
          open={open.dialogUpdate}
        />
        {/* Approve request dialog */}
        <DialogApprove
          toggleDialog={() => handleClickClose('dialogApprove')}
          open={open.dialogApprove}
        />
        {/* Deny request dialog */}
        <DialogDenied
          toggleDialog={() => handleClickClose('dialogDenied')}
          open={open.dialogDenied}
        />

        {/* Withdraw request dialog */}
        <DialogWithdraw
          toggleDialog={() => handleClickClose('dialogWithdraw')}
          open={open.dialogWithdraw}
        />
        {/* Approve request snackbar */}
        <SnackbarApproveRequest
          open={open.snackbarApprove}
          handleClose={() => handleClickClose('snackbarApprove')}
        />
        {/* Deny request snackbar */}
        <SnackbarDenyRequest
          open={open.snackbarDeny}
          handleClose={() => handleClickClose('snackbarDeny')}
        />
        {/* Save request snackbar */}
        <SnackbarSaveRequest
          open={open.snackbarSave}
          handleClose={() => handleClickClose('snackbarSave')}
        />
        {/* Start review snackbar */}
        <SnackbarStartReview
          open={open.snackbarStart}
          handleClose={() => handleClickClose('snackbarStart')}
        />
        {/* Reactivate request snackbar */}
        <SnackbarReactivateRequest
          open={open.snackbarReactivate}
          handleClose={() => handleClickClose('snackbarReactivate')}
        />
        {/* Submit request snackbar */}
        <SnackbarSubmitRequest
          open={open.snackbarSubmit}
          handleClose={() => handleClickClose('snackbarSubmit')}
        />
      </Toolbar>
    </AppBar>
  );
}

export default RequestToolbar;
