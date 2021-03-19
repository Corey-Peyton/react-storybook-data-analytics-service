import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import Icon from '@mdi/react';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  SnackbarApproveRequest,
  SnackbarChangeRequest,
  SnackbarDenyRequest,
  SnackbarSaveRequest,
} from '../CommonComponents/Snackbars';
import {
  DialogDenied,
  DialogUpdate,
  DialogApprove,
} from '../CommonComponents/DialogBox';

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
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
}));

function ToolBarUnassign(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState({
  });

  const [state, setState] = React.useState({
  });

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const handleOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClose = (element) => {
    setState({...state, [element]: false});
  };

  const handleClosed = () => {
    setAnchorEl(null);
  };

  const {t} = useTranslation();

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
      <Button
        onClick={() => handleClickOpen('dialogUnAssign')}
        className={classes.headerBtn}
        startIcon={
          <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        }
      >
        Unassign from me
      </Button>
      <Dialog
        open={open.dialogUnAssign}
        aria-labelledby="alert-dialog-unassign"
        aria-describedby="alert-dialog-unassign"
        onClose={() => handleClickClose('dialogUnAssign')}
        scroll="paper"
        disableBackdropClick
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-update">
          <div className={classes.vettingContainerTitle}>
            Unassign from me
            <IconButton
              onClick={() => handleClickClose('dialogUnAssign')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <Typography variant="body2">
                  {t(
                      'If you choose to proceed, the request will no longer have a lead analyst and an email will be sent to the researcher notifying them of the change.',
                  )}
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions className={classes.dialogFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClickClose('dialogUnAssign')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              props.handleUnassignFromMe();
              handleClickClose('dialogUnassign');
            }}
            className={classes.footerBtns}
          >
            Unassign
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
        onClick={() => handleClickOpen('snackbarSave')}
      >
        Save
      </Button>
      <SnackbarSaveRequest
        open={open.snackbarSave}
        handleClose={() => handleClickClose('snackbarSave')}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<ReplayIcon />}
        onClick={() => handleOpen('dialogUpdate')}
      >
        Request changes
      </Button>
      <DialogUpdate
        toggleDialog={() => handleClose('dialogUpdate')}
        open={state.dialogUpdate}
      />
      <SnackbarChangeRequest
        open={open.snackbarChange}
        handleClose={() => handleClickClose('snackbarChange')}
      />
      <Button
        aria-controls="toolbar-unassign-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
        className={classes.headerBtn}
      >
        Resolve
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="toolbar-unassign-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClosed}
      >
        <MenuItem onClick={() => handleOpen('dialogApprove')}>Approve</MenuItem>
        <MenuItem onClick={() => handleOpen('dialogDenied')}>Deny</MenuItem>
      </Menu>
      <DialogApprove
        toggleDialog={() => handleClose('dialogApprove')}
        open={state.dialogApprove}
      />
      <DialogDenied
        toggleDialog={() => handleClose('dialogDenied')}
        open={state.dialogDenied}
      />
      <SnackbarApproveRequest
        open={open.snackBarApprove}
        handleClose={() => handleClickClose('snackBarApprove')}
      />
      <SnackbarDenyRequest
        open={open.snackBarDeny}
        handleClose={() => handleClickClose('snackBarDeny')}
      />
    </Toolbar>
  );
}

export default ToolBarUnassign;
