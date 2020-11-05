import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
}));

function ToolBar() {
  const classes = useStyles();
  /* const setOpen = React.useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  }; */
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
        // onClick={props.handleDialogOpen}
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
    </Toolbar>
  );
}

export default ToolBar;


