import React from 'react';
import {useTranslation} from 'react-i18next';
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
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {AddFile, ModifyFile} from './ModifyFile';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import Icon from '@mdi/react';
import {mdiFileDocumentOutline} from '@mdi/js';
import {
  SnackbarAddOutputFile,
  SnackbarAddSupportFile,
  SnackbarDeleteOutputFile,
  SnackbarUpdateOutputFile,
} from '../Snackbars';
import {DialogDelete} from '../DialogBox';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const useStyles = makeStyles((theme) => ({
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
  cardTitle: {
    marginTop: theme.spacing(0.25),
  },
  dialogFooter: {
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
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
  emphasisBox: {
    background: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderLeftStyle: 'solid',
    borderLeftWidth: '5px',
    borderLeftColor: theme.palette.primary.main,
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
      paddingLeft: theme.spacing(1),
    },
  },
  tooltip: {
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
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

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function FilesList(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    notes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
    },
  });
  const [open, setOpen] = React.useState({
    dialogAddSupporting: false,
    snackbarAddSupporting: false,
    snackbarCreate: false,
    snackbarUpdate: false,
    snackbarDelete: false,
    addFile: false,
    editFile: false,
    dialogDelete: false,
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
    setOpen({...open, snackbarCreate: true, addFile: false});
  };

  const updateFile = () => {
    setOpen({...open, snackbarUpdate: true, editFile: false});
  };

  const deleteFile = () => {
    setOpen({...open, snackbarDelete: true, dialogDelete: false});
  };

  const addSupportingFile = () => {
    setOpen({
      ...open,
      dialogAddSupporting: false,
      snackbarAddSupporting: true,
    });
  };

  const {t} = useTranslation();

  const disableCutCopyPaste = (e, command, value) => {
    // display error if user tries to cut/copy/paste
    let msg;
    e.preventDefault();
    switch (command) {
      case 'cut':
        msg = t('Cut has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'copy':
        msg = t('Copy has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'paste':
        msg = t('Paste has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      default:
        break;
    }
  };

  const toggleHelperText = (value) => {
    if (state[value].commands === state[value].errorText) {
      if (Boolean(state[value].invalid)) {
        // set error text back to invalid error
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: state[value].invalid,
          },
        });
      } else {
        // clear error text if no invalid error exists
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: '',
          },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Typography>
        Please provide some information about this request as well as your
        output and supporting files.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" className="mb-2">
        Screening questions
      </Typography>
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2" component="h3" className="mb-3">
          Please consider the following guidelines:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              Check your output against the vetting guidelines.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Delete values you do not need released at this time.
            </Typography>
          </li>
        </ul>
        <Typography variant="body2" className="mt-3">
          This request will be stored as part of the request record.
        </Typography>
      </div>
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <FormLabel component="legend">
          Is the requested output consistent with the approved proposal for this
          project?
        </FormLabel>
        <RadioGroup id="approvedProposal" name="approvedProposal">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <FormLabel component="legend">
          Have you checked the vetting rules to determine if there are
          geographical, institutional, household size and/or population
          requirements for your output?
        </FormLabel>
        <RadioGroup id="vettingRules" name="vettingRules">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Is the requested output your final output?
          <BootstrapTooltip title="If no, future vetting release requests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your Analyst.">
            <InfoIcon />
          </BootstrapTooltip>
        </FormLabel>
        <RadioGroup id="finalOutput" name="finalOutput">
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      <Typography component="h2" variant="h6" className="mb-2">
        File location
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            variant="outlined"
            fullWidth
            required
          >
            <InputLabel id="outputFolder-label">Output folder</InputLabel>
            <Select
              id="outputFolder"
              label="Output folder"
              labelId="outputFolder-label"
            >
              <MenuItem>Folder 1</MenuItem>
              <MenuItem>Folder 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <BootstrapTooltip
            className={classes.tooltip}
            title="Please indicate the folder that contains your files for release for this request."
          >
            <InfoIcon />
          </BootstrapTooltip>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            variant="outlined"
            fullWidth
            required
          >
            <InputLabel id="supportFolder-label">Supporting folder</InputLabel>
            <Select
              id="supportFolder"
              label="Supporting folder"
              labelId="supportFolder-label"
            >
              <MenuItem>Folder 1</MenuItem>
              <MenuItem>Folder 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <BootstrapTooltip
            className={classes.tooltip}
            title=" Please indicate the folder that contains your supporting files for this request."
          >
            <InfoIcon />
          </BootstrapTooltip>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className="mb-2"
      >
        <Grid item>
          <Typography display="inline" component="h2" variant="h6">
            File details
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleDrawer(e, 'addFile', true)}
          >
            Add file
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
              <Grid container wrap="nowrap" alignItems="flex-start">
                <Grid item>
                  <Icon
                    className={classes.icon}
                    path={mdiFileDocumentOutline}
                    size={1}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    component="h3"
                    className={classes.cardTitle}
                  >
                    {file.name}
                  </Typography>
                </Grid>
              </Grid>
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
              <Button
                color="primary"
                onClick={() => handleClickOpen('dialogDelete')}
              >
                Delete
              </Button>
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
        fullWidth
        className={classes.root}
        scroll="paper"
      >
        <DialogTitle
          id="form-dialog-title"
          className={classes.vettingContainerTitle}
          disableTypography
        >
          <Typography variant="h6" component="h2">
            Add supporting file
          </Typography>
          <IconButton
            onClick={() => handleClickClose('dialogAddSupporting')}
            edge="end"
            aria-label="Close add supporting file"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.vettingSection}>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <FormControl required variant="outlined" fullWidth>
                  <InputLabel id="supportingFilesFolder-label">
                    Supporting folder
                  </InputLabel>
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
              </div>
            </div>
            <Typography variant="subtitle2">File #1 *</Typography>
            <Typography variant="subtitle2">
              Residual tables (see the vetting orientation)
            </Typography>
            <div className={classes.vettingRow}>
              <div className={classes.vettingColumn}>
                <TextField
                  id="notes2"
                  label="Notes"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  required
                  onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes')}
                  onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes')}
                  onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes')}
                  onClick={() => toggleHelperText('notes')}
                  onBlur={() => toggleHelperText('notes')}
                  onFocus={() => toggleHelperText('notes')}
                  defaultvalue={state.notes.text}
                  error={Boolean(state.notes.errorText)}
                  helperText={state.notes.errorText}
                />
              </div>
            </div>
          </div>
        </DialogContent>
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
      {/* Delete dialog */}
      <DialogDelete
        submitDialog={deleteFile}
        open={open.dialogDelete}
        toggleDialog={() => handleClickClose('dialogDelete')}
      />
      {/* Add supporting file snackbar */}
      <SnackbarAddSupportFile
        open={open.snackbarAddSupporting}
        handleClose={() => handleClickClose('snackbarAddSupporting')}
      />
      {/* Create output file snackbar */}
      <SnackbarAddOutputFile
        open={open.snackbarCreate}
        handleClose={() => handleClickClose('snackbarCreate')}
      />
      {/* Update output file snackbar */}
      <SnackbarUpdateOutputFile
        open={open.snackbarUpdate}
        handleClose={() => handleClickClose('snackbarUpdate')}
      />
      {/* Delete output file snackbar */}
      <SnackbarDeleteOutputFile
        open={open.snackbarDelete}
        handleClose={() => handleClickClose('snackbarDelete')}
      />
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
