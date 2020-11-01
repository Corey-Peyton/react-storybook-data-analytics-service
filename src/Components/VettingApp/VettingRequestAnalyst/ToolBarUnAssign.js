import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import Icon from '@mdi/react';
// import {mdiaccountremove} from '@mdi/js';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountRemoveOutline} from '@mdi/js';


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

function ToolBarUnassign() {
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
      <Icon path={mdiAccountRemoveOutline} className="icon-grey" />
      <Typography>Unassign from me</Typography>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<ReplayIcon />}
      >
              Request an update
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
              Save
      </Button>
      {/*  <Button
        variant="contained"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SendIcon />}
      >
              Submit request
      </Button> */}
      <span class="mdi mdi-name"></span>
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

export default ToolBarUnassign;

