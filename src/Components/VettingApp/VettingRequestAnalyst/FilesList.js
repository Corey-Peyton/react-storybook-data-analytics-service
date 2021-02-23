import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Divider,
  Typography,
  IconButton,
  Button,
  Drawer,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {AddFile, ModifyFile} from './ModifyFile';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  cardActionsError: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.error.light,
  },
  cardError: {
    border: '1px solid',
    borderColor: theme.palette.error.light,
  },
  dialog: {},
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      padding: theme.spacing(0, 3, 3, 3),
    },
  },
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
}));

const files = [
  {
    name: 'Output file example with a very long name.',
    emptyFields: 0,
    error: false,
  },
  {
    name:
      'Another file with even a longer name for users who likes to be really descriptive. Yes, believe it happens!',
    emptyFields: 4,
    error: false,
  },
  {
    name: 'Example output file card name',
    emptyFields: 4,
    error: true,
  },
];

function FilesList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    dialogAddSupporting: false,
    snackbarAddSupporting: false,
    snackbarSave: false,
    addFile: false,
    editFile: false,
  });

  const toggleDrawer = (event, drawer, state) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen({...open, [drawer]: state});
  };

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const createFile = () => {
    setOpen({...open, snackbarSave: true, addFile: false});
  };

  const updateFile = (event) => {
    setOpen({...open, snackbarSave: true, editFile: false});
  };

  const addSupportingFile = () => {
    setOpen({
      ...open,
      dialogAddSupporting: false,
      snackbarAddSupporting: true,
    });
  };

  return (
    <React.Fragment>
      <Typography>
        A brief explanation is needed to explain to external users what and why
        they need to complete this section.
      </Typography>
      <Divider className={classes.divider} />
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className="mb-2"
      >
        <Grid item>
          <Typography display="inline" component="h2" variant="h6">
            Output files
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleDrawer(e, 'addFile', true)}
          >
            Add Output File
          </Button>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" className="mb-2">
        No output files
      </Typography>
      <Alert className="mt-2" severity="error">
        Request cannot be submitted without an output file
      </Alert>
      {files.map((file) => {
        return (
          <Card
            key={file.name}
            className={clsx(classes.card, {
              [classes.cardError]: file.error,
            })}
            variant="outlined"
          >
            <CardContent>
              <Typography>{file.name}</Typography>
              <FileValidationAlert
                emptyFields={file.emptyFields}
                error={file.error}
              />
            </CardContent>
            <CardActions
              className={clsx({
                [classes.cardActions]: file.error === false,
                [classes.cardActionsError]: file.error === true,
              })}
            >
              <Button
                color="primary"
                onClick={(e) => toggleDrawer(e, 'editFile', true)}
              >
                Edit
              </Button>
              <Button color="primary">Delete</Button>
            </CardActions>
          </Card>
        );
      })}
      {/* Add output file drawer */}
      <Drawer anchor="right" open={open.addFile} className={classes.drawer}>
        <AddFile
          toggleDrawer={toggleDrawer}
          createFile={createFile}
          handleClickOpen={handleClickOpen}
        />
      </Drawer>
      {/* Edit output file drawer */}
      <Drawer anchor="right" open={open.editFile} className={classes.drawer}>
        <ModifyFile
          toggleDrawer={toggleDrawer}
          updateFile={updateFile}
          handleClickOpen={handleClickOpen}
        />
      </Drawer>
      {/* Add supporting file dialog */}
      <Dialog
        open={open.dialogAddSupporting}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant="h6">Add supporting file</Typography>
            <IconButton
              onClick={() => handleClickClose('dialogAddSupporting')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <DialogContent>
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="outputFolder-label">Output folder name</InputLabel>
            <Select
              id="supportingFilesFolder"
              label="Supporting folder *"
              labelId="supportingFilesFolder-label"
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle2">File #1 *</Typography>
          <Typography variant="subtitle2">
            Residual tables (see the vetting orientation)
          </Typography>
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="notes2"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
        </DialogContent>
        <Divider className="mb-1 mt-2" />
        <DialogActions className={classes.dialogFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClickClose('dialogAddSupporting')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={addSupportingFile}
            className={classes.footerBtns}
          >
            Add supporting file
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add supporting file snackbar */}
      <Snackbar
        open={open.snackbarAddSupporting}
        autoHideDuration={6000}
        onClose={() => handleClickClose('snackbarAddSupporting')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => handleClickClose('snackbarAddSupporting')}
        >
          The supporting file has been added
        </Alert>
      </Snackbar>
      {/* Save output file snackbar */}
      <Snackbar
        open={open.snackbarSave}
        autoHideDuration={6000}
        onClose={() => handleClickClose('snackbarSave')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert
          severity="success"
          className={classes.alert}
          variant="filled"
          onClose={() => handleClickClose('snackbarSave')}
        >
          The output file has been saved
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

function FileValidationAlert(props) {
  const {emptyFields, error} = {...props};
  if (emptyFields > 0 && error) {
    return (
      <Alert className="mt-2" severity="error">
        {emptyFields} {emptyFields > 1 ? 'errors' : 'error'}
      </Alert>
    );
  } else if (emptyFields > 0 && !error) {
    return (
      <Alert severity="warning" className="mt-2">
        {emptyFields > 1 ?
          `There are ${emptyFields} remaining fields that must be filled before submitting.` :
          `There is ${emptyFields} remaining field that must be filled before submitting.`}
      </Alert>
    );
  } else if (emptyFields === 0) {
    return null;
  }
}
export default FilesList;
