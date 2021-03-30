import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Grid,
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
    margin: theme.spacing(0, -3),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  title: {
    paddingLeft: theme.spacing(1),
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
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
        <Button
          className={classes.headerBtn}
          variant="text"
          color="primary"
          startIcon={<Icon path={mdiRestore} size={1} />}
          onClick={() => handleClickOpen('snackbarReactivate')}
        >
          Reactivate
        </Button>
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
        <>
          <Button
            className={classes.headerBtn}
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
        </>
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
        <Button
          className={classes.headerBtn}
          variant="contained"
          color="primary"
          startIcon={<Icon path={mdiPlaySpeed} size={1} />}
          onClick={() => handleClickOpen('snackbarStart')}
        >
          Start review
        </Button>
      );
    }
  };

  const submitButton = () => {
    if (status === 'draft' || status === 'changes requested') {
      return (
        <Button
          className={classes.headerBtn}
          variant="contained"
          color="primary"
          startIcon={<Icon path={mdiInboxArrowDown} size={1} />}
          onClick={() => handleClickOpen('snackbarSubmit')}
        >
          Submit
        </Button>
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
        <Button
          className={classes.headerBtn}
          variant="text"
          color="primary"
          startIcon={<Icon path={mdiUndo} size={1} />}
          onClick={() => handleClickOpen('dialogWithdraw')}
        >
          Withdraw
        </Button>
      );
    }
  };

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="Back to dashboard"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="body2"
              component="span"
              className={classes.title}
            >
              Dashboard
            </Typography>
          </Grid>
          <Grid item className={classes.actions}>
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
          </Grid>
        </Grid>
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
