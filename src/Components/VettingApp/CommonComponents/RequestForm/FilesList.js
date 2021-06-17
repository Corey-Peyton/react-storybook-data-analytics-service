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
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
} from '@material-ui/core';
import {AddFile, ModifyFile, ViewFile} from './ModifyFile';
import {Card} from '../../../CommonComponents/Card';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@mdi/react';
import {mdiFile, mdiFolderOpen, mdiTableLarge} from '@mdi/js';
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
  addCard: {
    'borderStyle': 'dashed',
    'justifyContent': 'start',
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
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
  iconText: {
    'display': 'flex',
    'alignItems': 'center',
    '& svg': {
      paddingRight: theme.spacing(1),
      width: '1.25rem',
      height: '1.25rem',
    },
  },
}));

const files = [
  {
    name: 'File for output',
    sheet: '{SheetName}',
    path: [
      '{ProjectFolderName}',
      '{RequestFolderName}',
      '{FolderName}',
      '{FolderName}',
      '{OutputFileName}.xls',
    ],
    emptyFields: 0,
    error: false,
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
    viewFile: false,
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
      <Typography component="h2" variant="h6" className="mb-2">
        Files for output
      </Typography>
      <Typography>
        Please add and prepare your files for vetting. You will not have access
        to your files from within the request and are simply adding the file
        path to help Analyst locate the file on your virtual machince. If your
        request is approved you will be granted access to your files outside of
        your secure enviroment.
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
      <Typography display="inline" variant="body2">
        Add file for output *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one file must be added
      </Typography>
      {files.map((file, index) => {
        return (
          <Card
            key={index}
            title={`${index + 1}. ${file.name}`}
            error={file.error}
            primaryButton={
              props.role === 'researcher' ? 'Edit' : 'View details'
            }
            secondaryButton={props.role === 'researcher' ? 'Delete' : ''}
            primaryClick={
              props.role === 'researcher' ?
                (e) => toggleDrawer(e, 'editFile', true) :
                (e) => toggleDrawer(e, 'viewFile', true)
            }
            secondaryClick={() => handleClickOpen('dialogDelete')}
            content={
              <>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                >
                  File path
                </Typography>
                <div className={`mb-3`}>
                  <ul className="list-horizontal">
                    {file.path.map((folder, index) => {
                      const len = file.path.length;
                      if (index === len - 1) {
                        return (
                          <li key={index}>
                            <Typography
                              variant="body2"
                              className={classes.iconText}
                            >
                              <Icon path={mdiFile} /> {folder}
                            </Typography>
                          </li>
                        );
                      }
                      return (
                        <li key={index}>
                          <Typography
                            variant="body2"
                            className={classes.iconText}
                          >
                            <Icon path={mdiFolderOpen} /> {folder}
                            <span className="ml-1 mr-1">&gt;</span>
                          </Typography>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                >
                  Sheet name
                </Typography>
                <Typography variant="body2" className={classes.iconText}>
                  <Icon path={mdiTableLarge} /> {file.sheet}
                </Typography>
              </>
            }
          />
        );
      })}
      {props.role === 'researcher' && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth={true}
          className={clsx(classes.addCard, 'mt-2')}
          onClick={(e) => toggleDrawer(e, 'addFile', true)}
        >
          Add file for output
        </Button>
      )}
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
      {/* View output file drawer */}
      <Drawer anchor="right" open={open.viewFile} className={classes.drawer}>
        <ViewFile
          toggleDrawer={toggleDrawer}
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
export default FilesList;
