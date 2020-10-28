import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
}));

function ToolBarDelete() {
  const classes = useStyles();
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
              Vetting requests dashboard
      </Typography>
      <Button
        color="default"
        className={classes.headerBtn}
        startIcon={<ReplayIcon />}
      >
              Convert to draft
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
      >
              Delete
      </Button>
    </Toolbar>
  );
}

export default ToolBarDelete;

