import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography, TextField} from '@material-ui/core';
import Icon from '@mdi/react';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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

function ToolBarAssign(props) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
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
      <Typography variant="subtitle1" className={classes.title}>
              Vetting requests dashboard
      </Typography>
      <Button
        color="primary"
        className={classes.headerBtn} onClick={handleClickOpen}>
        <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        <Typography variant="subtitle2" color="textSecondary">Assign to me</Typography>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
              Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Assign vetting request to me</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Provide a phone number</Typography>
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="Phone number"
            label="+1 343-455-6767"
            variant="outlined"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
          <Button onClick={handleClose} color="primary" variant="contained">Assign to me</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

export default ToolBarAssign;

