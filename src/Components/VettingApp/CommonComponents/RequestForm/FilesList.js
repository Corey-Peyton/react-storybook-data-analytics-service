import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, fade} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Divider,
  Typography,
  IconButton,
  Button,
  Drawer,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
  Grid,
  Collapse,
  Paper,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Card} from '../../../CommonComponents/Card';
import {OutputFile} from './ModifyFile';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@mdi/react';
import {mdiChevronRight} from '@mdi/js';
import {
  SnackbarAddOutputFile,
  SnackbarDeleteOutputFile,
  SnackbarDeleteSupportFile,
  SnackbarUpdateOutputFile,
} from '../Snackbars';
import {DialogDelete, DialogAddFile} from '../DialogBox';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const useStyles = makeStyles((theme) => ({
  addCard: {
    'borderStyle': 'dashed',
    'justifyContent': 'start',
    'width': '100%',
    'textAlign': 'left',
    'borderColor': fade(theme.palette.common.black, 0.23),
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
  },
  cardContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderColor: fade(theme.palette.common.black, 0.08),
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: theme.spacing(50),
      boxSizing: 'border-box',
    },
  },
  alert: {
    '& .MuiAlert-action': {
      alignItems: 'start',
    },
  },
  legendInfoIcon: {
    marginTop: theme.spacing(-0.25),
    marginLeft: theme.spacing(1),
  },
  filePath: {
    display: 'flex',
    flexFlow: 'wrap',
    alignItems: 'flex-end',
  },
  filePathItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

// FAKE DATA
const outputFiles = [
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
    numErrors: 0,
  },
];

const syntaxFiles = [
  {
    name: 'Syntax file',
    path: [
      '{ProjectFolderName}',
      '{RequestFolderName}',
      '{FolderName}',
      '{FolderName}',
      '{SyntaxFileName}.doc',
    ],
    notes:
      'Notes section to include any details regarding the syntax file added. This will be helpful for the Researcher/Analyst during the vetting process.',
    numErrors: 0,
  },
];

const variableFiles = [
  {
    name: 'Variable file',
    path: [
      '{ProjectFolderName}',
      '{RequestFolderName}',
      '{FolderName}',
      '{FolderName}',
      '{VariableFileName}.doc',
    ],
    notes:
      'Notes section to include any details regarding the variable file added. This will be helpful for the Researcher/Analyst during the vetting process.',
    numErrors: 0,
  },
];

const additionalFiles = [];

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function FilesList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    snackbarAddSupporting: false,
    snackbarCreate: false,
    snackbarUpdate: false,
    snackbarOututputDelete: false,
    snackbarSupportDelete: false,
    outputFile: false,
    dialogOutputDelete: false,
    dialogSupportDelete: false,
    dialogAddSupporting: false,
    dialogEditSupporting: false,
    alert: true,
  });

  const toggleDrawer = (event, drawer) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen({...open, outputFile: !open.outputFile, drawerType: drawer});
  };

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const createFile = () => {
    setOpen({...open, snackbarCreate: true, outputFile: false});
  };

  const updateFile = () => {
    setOpen({...open, snackbarUpdate: true, outputFile: false});
  };

  const deleteOutputFile = () => {
    setOpen({...open, snackbarOutputDelete: true, dialogOutputDelete: false});
  };

  const deleteSupportFile = () => {
    setOpen({
      ...open,
      snackbarSupportDelete: true,
      dialogSupportDelete: false,
    });
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" className="mb-3">
        Files for output
      </Typography>
      <Typography component="p" variant="body1" className="mb-3">
        Please add and prepare your files for vetting. You will not have access
        to your files from within the request and are simply adding the file
        path to help Analyst locate the file on your virtual machince. If your
        request is approved you will be granted access to your files outside of
        your secure enviroment.
      </Typography>
      <Divider className="mb-3" />
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Screening questions
      </Typography>
      <Collapse in={open.alert}>
        <Alert
          severity="info"
          className={`mb-3 ${classes.alert}`}
          action={
            <IconButton
              aria-label="clear"
              color="inherit"
              size="small"
              onClick={() => {
                handleClickClose('alert');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography component="p" variant="body2" className="mb-2">
            Please consider the following guidelines:
          </Typography>
          <ul className="mb-2">
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
          <Typography component="p" variant="body2">
            This request will be stored as part of the request record.
          </Typography>
        </Alert>
      </Collapse>
      <FormControl component="fieldset" className="mb-2" required>
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
      <FormControl component="fieldset" className="mb-2" required>
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
      <FormControl component="fieldset" className="mb-2" required>
        <Grid component="span" container>
          <Grid component="span" xs item>
            <FormLabel component="legend">
              Is the requested output your final output?
            </FormLabel>
          </Grid>
          <Grid component="span" className={classes.legendInfoIcon} item>
            <BootstrapTooltip title="If no, future vetting release requests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your Analyst.">
              <InfoOutlinedIcon />
            </BootstrapTooltip>
          </Grid>
        </Grid>
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
      <Divider className="mb-3" />
      {/* OUTPUT FILES */}
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Output files
      </Typography>
      <Typography variant="body2">Add file for output *</Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one file must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        {outputFiles.length > 0 ? (
          outputFiles.map((file, index) => (
            <OutputFileCard
              key={`output-file-${index}`}
              file={file}
              index={index}
              role={props.role}
              toggleDrawer={toggleDrawer}
              handleClickOpen={handleClickOpen}
            />
          ))
        ) : (
          <Typography variant="body2" component="p" color="textSecondary">
            No files for output added
          </Typography>
        )}
      </Paper>
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
      <Divider className="mt-3 mb-3" />
      {/* MANDATORY SUPPORTING FILES */}
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Mandatory supporting files
      </Typography>
      <Typography variant="body2">Add file for syntax *</Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one file must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        {syntaxFiles.length > 0 ? (
          syntaxFiles.map((file, index) => (
            <SupportingFileCard
              key={`syntax-file-${index}`}
              file={file}
              index={index}
              role={props.role}
              handleClickOpen={handleClickOpen}
            />
          ))
        ) : (
          <Typography variant="body2" component="p" color="textSecondary">
            No files for support added
          </Typography>
        )}
      </Paper>
      {props.role === 'researcher' && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth={true}
          className={clsx(classes.addCard, 'mt-2')}
          onClick={(e) => handleClickOpen('dialogAddSupporting')}
        >
          Add file for support
        </Button>
      )}
      <Typography variant="body2" className="mt-3">
        Add file for variable list/description *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one file must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        {variableFiles.length > 0 ? (
          variableFiles.map((file, index) => (
            <SupportingFileCard
              key={`var-file-${index}`}
              file={file}
              index={index}
              role={props.role}
              handleClickOpen={handleClickOpen}
            />
          ))
        ) : (
          <Typography variant="body2" component="p" color="textSecondary">
            No files for support added
          </Typography>
        )}
      </Paper>
      {props.role === 'researcher' && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth={true}
          className={clsx(classes.addCard, 'mt-2')}
          onClick={(e) => handleClickOpen('dialogAddSupporting')}
        >
          Add file for support
        </Button>
      )}
      <Divider className="mt-3 mb-3" />
      <Typography component="h3" variant="subtitle2" className="mb-3">
        Additional supporting files
      </Typography>
      <Typography variant="body2" className="mb-2">
        Add file for additional details
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        {additionalFiles.length > 0 ? (
          additionalFiles.map((file, index) => (
            <SupportingFileCard
              key={`additional-file-${index}`}
              file={file}
              index={index}
              role={props.role}
              handleClickOpen={handleClickOpen}
            />
          ))
        ) : (
          <Typography variant="body2" component="p" color="textSecondary">
            No files for support added
          </Typography>
        )}
      </Paper>
      {props.role === 'researcher' && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth={true}
          className={clsx(classes.addCard, 'mt-2')}
          onClick={(e) => handleClickOpen('dialogAddSupporting')}
        >
          Add file for support
        </Button>
      )}
      {/* Output file drawer */}
      <Drawer anchor="right" open={open.outputFile} className={classes.drawer}>
        <OutputFile
          toggleDrawer={toggleDrawer}
          updateFile={updateFile}
          createFile={createFile}
          handleClickOpen={handleClickOpen}
          drawerType={open.drawerType}
        />
      </Drawer>
      {/* Add supporting file dialog */}
      <DialogAddFile
        submitDialog={() => handleClickClose('dialogAddSupporting')}
        toggleDialog={() => handleClickClose('dialogAddSupporting')}
        open={open.dialogAddSupporting}
        fileFunction="add"
      />
      {/* Edit supporting file dialog */}
      <DialogAddFile
        submitDialog={() => handleClickClose('dialogEditSupporting')}
        toggleDialog={() => handleClickClose('dialogEditSupporting')}
        open={open.dialogEditSupporting}
        fileFunction="edit"
      />
      {/* Delete output file dialog */}
      <DialogDelete
        submitDialog={deleteOutputFile}
        open={open.dialogOutputDelete}
        toggleDialog={() => handleClickClose('dialogOutputDelete')}
      />
      {/* Delete supporting file dialog */}
      <DialogDelete
        submitDialog={deleteSupportFile}
        open={open.dialogSupportDelete}
        toggleDialog={() => handleClickClose('dialogSupportDelete')}
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
        open={open.snackbarOutputDelete}
        handleClose={() => handleClickClose('snackbarOutputDelete')}
      />
      {/* Delete supporting file snackbar */}
      <SnackbarDeleteSupportFile
        open={open.snackbarSupportDelete}
        handleClose={() => handleClickClose('snackbarSupportDelete')}
      />
    </React.Fragment>
  );
}
export default FilesList;

function OutputFileCard(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {file, index, role, toggleDrawer, handleClickOpen} = props;
  return (
    <Card
      title={`${t('File')} ${index + 1} · ${file.name}`}
      error={file.numErrors > 0}
      totalErrors={file.numErrors}
      primaryButton={role === 'researcher' ? 'Edit' : 'View details'}
      secondaryButton={role === 'researcher' ? 'Delete' : ''}
      primaryClick={
        role === 'researcher' ?
          (e) => toggleDrawer(e, 'editFile', true) :
          (e) => toggleDrawer(e, 'viewFile', true)
      }
      secondaryClick={() => handleClickOpen('dialogOutputDelete')}
      content={
        <>
          <Typography variant="caption" component="p" color="textSecondary">
            {t('File path')}
          </Typography>
          <div className={clsx(classes.filePath, 'mb-2')}>
            {file.path.map((dir, index) => {
              const last = index === file.path.length - 1;
              return (
                <div
                  key={`output-path-${index}`}
                  className={classes.filePathItem}
                >
                  <Typography
                    variant="body2"
                    component="p"
                    className={clsx({
                      'mr-1': !last,
                    })}
                  >
                    {dir}
                  </Typography>
                  {!last && (
                    <Icon path={mdiChevronRight} size={0.5} className="mr-1" />
                  )}
                </div>
              );
            })}
          </div>
          <Typography variant="caption" color="textSecondary" component="p">
            Sheet name
          </Typography>
          <Typography variant="body2">{file.sheet}</Typography>
        </>
      }
    />
  );
}

function SupportingFileCard(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {file, index, role, handleClickOpen} = props;
  return (
    <Card
      title={`${t('File')} ${index + 1} · ${file.name}`}
      error={file.numErrors > 0}
      totalErrors={file.numErrors}
      primaryButton={role === 'researcher' ? 'Edit' : ''}
      secondaryButton={role === 'researcher' ? 'Delete' : ''}
      primaryClick={() => handleClickOpen('dialogEditSupporting')}
      secondaryClick={() => handleClickOpen('dialogSupportDelete')}
      content={
        <>
          <Typography variant="caption" component="p" color="textSecondary">
            {t('File path')}
          </Typography>
          <div className={clsx(classes.filePath, 'mb-2')}>
            {file.path.map((dir, index) => {
              const last = index === file.path.length - 1;
              return (
                <div
                  key={`support-path-${index}`}
                  className={classes.filePathItem}
                >
                  <Typography
                    variant="body2"
                    component="p"
                    className={clsx({
                      'mr-1': !last,
                    })}
                  >
                    {dir}
                  </Typography>
                  {!last && (
                    <Icon path={mdiChevronRight} size={0.5} className="mr-1" />
                  )}
                </div>
              );
            })}
          </div>
          <Typography variant="caption" component="p" color="textSecondary">
            {t('Notes')}
          </Typography>
          <Typography variant="body2" component="p">
            {file.notes}
          </Typography>
        </>
      }
    />
  );
}
