import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography, TextField, FormControl} from '@material-ui/core';
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
  Select,
  InputLabel,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const [snackbaropen, setSnackbarOpen] = React.useState(false);
  const [snackbardenyopen, setSnackbarDenyOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClickOpen = () => {
    setSnackbarOpen(true);
  };

  const handleClickDeny = () => {
    setSnackbarDenyOpen(true);
  };

  const handleClickDenyClose = () => {
    setSnackbarDenyOpen(false);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSnackbarClose = () => {
    setSnackbarOpen(false);
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
              Vetting requests dashboard
      </Typography>
      <Button
        color="primary"
        className={classes.headerBtn}>
        <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        <Typography variant="subtitle2" color="textSecondary">Unassign to me</Typography>
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
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<ReplayIcon />}
        onClick={handleClickOpen}
      >
              Request an update
      </Button>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="primary" className={classes.headerBtn}>
  Resolve<ArrowDropDownIcon />
      </Button>
      <Menu
        id="toolbar-unassign-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Approve</MenuItem>
        <MenuItem onClick={handleSnackbarClickOpen}>Deny</MenuItem>
      </Menu>


      <Dialog
        open={snackbaropen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-denied-request">Denied request</DialogTitle>
        <DialogContent className="pb-0">
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="Billable hours"
            label="Billable hours"
            variant="outlined"
            required
            placeholder="3.5"
            helperText="Only numbers"
          />
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            required
            variant="outlined"
            fullWidth
          >
            <InputLabel id="outputMethod-label">Denied reason</InputLabel>
            <Select
            >
              <MenuItem>Non-SSI project</MenuItem>
              <MenuItem>Confidentiality requirements are not met</MenuItem>
              <MenuItem>Request is missing information</MenuItem>
              <MenuItem>Output file(s) are not in line with the project proposal</MenuItem>
              <MenuItem>Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleDialogSnackbarClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            className="ml-2"
            onClick={() => {
              handleClickDeny();
              handleDialogSnackbarClose();
            }}>
          Submit
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-update">Request an update</DialogTitle>
        <DialogContent className="pb-0">
          <TextField
            className={classes.inputMargin}
            margin="dense"
            defaultValue="Please provide the supporting files requested."
            label="Comments"
            variant="outlined"
            fullWidth
            required
            multiline
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleDialogClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary" variant="contained" className="ml-2">
          Submit request
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbardenyopen} onClose={handleClickDenyClose} autoHideDuration={6000} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <Alert
          onClose={handleClickDenyClose}
          severity="success"
          className={classes.alert}
          variant="filled"
        >
                   The vetting request 10_2020_4564677 has been denied.
        </Alert>
      </Snackbar>
    </Toolbar>
  );
}

export default ToolBarUnassign;

