import React from 'react';
import {useStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, ArrowBackIcon, Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

const handleDialogOpen = () => {
  setOpen(true);
};

const setOpen = React.useState(false);

function ToolBar() {
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
        startIcon={<ExitToAppIcon />}
        onClick={handleDialogOpen}
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

