import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {DialogWithdraw} from '../CommonComponents/DialogBox';
import {
  SnackbarSaveRequest,
  SnackbarSubmitRequest,
} from '../CommonComponents/Snackbars';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
}));

function ToolBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    snackbarSave: false,
    snackbarSubmit: false,
    dialogWithdraw: false,
  });

  const handleOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClose = (element) => {
    setState({...state, [element]: false});
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
      <Button
        color="default"
        className={classes.headerBtn}
        startIcon={<ExitToAppIcon />}
        onClick={() => handleOpen('dialogWithdraw')}
      >
        Withdraw
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
        onClick={() => handleOpen('snackbarSave')}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SendIcon />}
        onClick={() => handleOpen('snackbarSubmit')}
      >
        Submit request
      </Button>
      {/* Save request snackbar */}
      <SnackbarSaveRequest
        open={state.snackbarSave}
        handleClose={() => handleClose('snackbarSave')}
      />
      {/* Submit request snackbar */}
      <SnackbarSubmitRequest
        open={state.snackbarSubmit}
        handleClose={() => handleClose('snackbarSubmit')}
      />
      {/* Withdraw request dialog */}
      <DialogWithdraw
        toggleDialog={() => handleClose('dialogWithdraw')}
        open={state.dialogWithdraw}
      />
    </Toolbar>
  );
}

export default ToolBar;
