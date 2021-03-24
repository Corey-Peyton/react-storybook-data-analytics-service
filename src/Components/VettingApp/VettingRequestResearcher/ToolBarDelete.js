import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  SnackbarDeleteRequest,
} from '../CommonComponents/Snackbars';

const useStyles = makeStyles((theme) => ({
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

function ToolBarDelete(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    snackbarDelete: false,
  });

  const handleSnackbarOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleSnackbarClose = (state) => {
    setOpen({...open, [state]: false});
  };

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="body2" className={classes.title}>
              Dashboard
      </Typography>
      <Button
        color="default"
        className={classes.headerBtn}
        startIcon={<ExitToAppIcon />}
      >
              Withdraw
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
              Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SendIcon />}
      >
              Submit request
      </Button>
      <Button
        color="default"
        className={classes.headerBtn}
        startIcon={<DeleteIcon />}
        onClick={(e) => {
          e.stopPropagation();
          handleSnackbarOpen('snackbarDelete');
        }}
      >
              Delete
      </Button>
      <SnackbarDeleteRequest
        open={open.snackbarDelete}
        handleClose={() => handleSnackbarClose('snackbarDelete')}
      />
    </Toolbar>
  );
}

export default ToolBarDelete;

