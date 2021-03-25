import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Icon from '@mdi/react';
import {
  mdiAccountPlus,
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
  SnackbarChangeRequest,
  SnackbarDenyRequest,
  SnackbarSaveRequest,
} from './Snackbars';
import {
  DialogDenied,
  DialogUpdate,
  DialogApprove,
  DialogUnassign,
} from './DialogBox';
import {ActionsMenu} from './RequestContextMenu';
import {loggedInUser} from '../../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
    '& .MuiSelect-select': {
      height: [theme.spacing(7), '!important'],
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
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
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  headerBtnEnd: {
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
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
    dialogUnAssign: false,
    snackbarSave: false,
    dialogUpdate: false,
    snackbarChange: false,
    snackBarDeny: false,
    snackBarApprove: false,
    dialogDenied: false,
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
            // onClick={() => handleClickOpen('dialogUpdate')}
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
            // onClick={() => handleClickOpen('dialogUpdate')}
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
            // onClick={() => handleClickOpen('dialogUpdate')}
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
            // onClick={() => handleClickOpen('dialogUpdate')}
          >
            Withdraw
          </Button>
        </div>
      );
    }
  };

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Back to vetting requests dashboard"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        Vetting requests dashboard
      </Typography>
      {/* <Button
        onClick={() => handleClickOpen('dialogUnAssign')}
        className={classes.headerBtn}
        startIcon={
          <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        }
      >
        Unassign from me
      </Button> */}
      {/* <DialogUnassign
        toggleDialog={() => handleClickClose('dialogUnAssign')}
        open={open.dialogUnAssign}
      /> */}
      {/* Request an update snackbar */}
      {/* <SnackbarChangeRequest
        open={open.snackbarChange}
        handleClose={() => handleClickClose('snackbarChange')}
      /> */}
      {/* */}
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
        // contextSummaryClick={contextSummaryClick}
        // contextStatusClick={contextStatusClick}
        // toggleManageTeamDrawer={toggleManageTeamDrawer}
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
      {/* Approve request snackbar */}
      <SnackbarApproveRequest
        open={open.snackBarApprove}
        handleClose={() => handleClickClose('snackBarApprove')}
      />
      {/* Deny request snackbar */}
      <SnackbarDenyRequest
        open={open.snackBarDeny}
        handleClose={() => handleClickClose('snackBarDeny')}
      />
      {/* Save request snackbar */}
      <SnackbarSaveRequest
        open={open.snackbarSave}
        handleClose={() => handleClickClose('snackbarSave')}
      />
    </Toolbar>
  );
}

export default RequestToolbar;
