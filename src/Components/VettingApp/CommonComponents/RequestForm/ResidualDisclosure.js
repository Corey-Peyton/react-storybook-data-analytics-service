import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  DialogTitle,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import {
  SnackbarAddSupportFile,
  SnackbarDeleteSupportFile,
} from '../Snackbars';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const useStyles = makeStyles((theme) => ({
  inputMarginBlock: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    display: 'block',
  },
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  emphasisBox: {
    background: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  indentedSection: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderLeft: '1px solid',
    borderLeftColor: theme.palette.divider,
  },
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
  dialogFooter: {
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function ResidualDisclosure(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    subset: false,
    versionpreviouslyReleased: false,
    subsetAddFile: false,
    subsetChanges: '',
    subsetNotes: '',
    subsetNotes2: '',
    subsetNotes3: '',
    addFile: false,
    changes: '',
    date: '',
    notes: '',
    notes2: '',
    notes3: '',
    snackbarAddFile: false,
    snackbarDelete: false,
    dialogDeleteFile: false,
  });

  const initial = {
    // blank object used to reset state
    subsetChanges: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    changes: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    subsetNotes: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    subsetNotes2: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    subsetNotes3: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    date: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    notes: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    notes2: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    notes3: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
            helperText: msg,
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
            helperText: msg,
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
            helperText: msg,
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
            helperText: state[value].invalid,
          },
        });
      } else {
        // clear error text if no invalid error exists
        setState({
          ...state,
          [value]: {
            ...state[value],
            helperText: initial[value].helperText,
            errorText: initial[value].errorText,
          },
        });
      }
    }
  };

  const handleAddFileSubset = () => {
    setState({...state, subsetAddFile: true, snackbarAddFile: true});
  };

  const handleAddFile = () => {
    setState({...state, addFile: true, snackbarAddFile: true});
  };

  const handleDeleteFile = () => {
    setState({...state, dialogDeleteFile: false, snackbarDelete: true});
  };

  const handleClickOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClickClose = (element) => {
    setState({...state, [element]: false});
  };

  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Typography>
        A re-release of the same output after slight modifications greatly
        increases the risk of residual disclosure. Statistics Canada strongly
        recommends that researchers submit as few versions of the output as
        possible.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" className="mb-2">
        Residual disclosure
      </Typography>
      <FormControl component="fieldset" className={classes.inputMargin}>
        <FormLabel component="legend" className={classes.tooltipLabel} required>
          For this request, have you subsetted any variables, where one or more
          variables is a subset of another?
        </FormLabel>
        <RadioGroup
          id="subset"
          onChange={handleRadioChange}
          value={state.subset}
          name="subset"
        >
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
      {state.subset === 'Yes' && (
        <div className={classes.indentedSection}>
          <FormControl
            component="fieldset"
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend">
              Compared to the other subset, have you changed the sub-sample of
              population of interest?
            </FormLabel>
            <RadioGroup id="subsetSubSample" name="subsetSubSample">
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
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend">
              Compared to the other subset, have you dropped individual cases or
              outliers?
            </FormLabel>
            <RadioGroup id="subsetDropped" name="subsetDropped">
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
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend">
              Compared to the other subset, have you imputed the missing data?
            </FormLabel>
            <RadioGroup id="subsetImputed" name="subsetImputed">
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
              Compared to the other subset, have you recoded or modified any
              variables even slightly?
            </FormLabel>
            <RadioGroup id="subsetRecoded" name="subsetRecoded">
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
          <Grid container>
            <Grid item xs={6}>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="subsetChanges"
                label="Explanation of changes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                required
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'subsetChanges')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'subsetChanges')}
                onPaste={(e) =>
                  disableCutCopyPaste(e, 'paste', 'subsetChanges')
                }
                onClick={() => toggleHelperText('subsetChanges')}
                onBlur={() => toggleHelperText('subsetChanges')}
                onFocus={() => toggleHelperText('subsetChanges')}
                value={state.subsetChanges.text}
                error={Boolean(state.subsetChanges.errorText)}
                helperText={state.subsetChanges.errorText}
              />
            </Grid>
          </Grid>
          <Typography component="h3" variant="subtitle1" className="mb-2">
            Supporting files
          </Typography>
          <div className={classes.emphasisBox}>
            <Typography variant="subtitle2" component="h4" className="mb-3">
              Required supporting files for residual disclosure:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Residual tables (see the vetting orientation)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Both sets of syntax and highlight or indicate the changes
                </Typography>
              </li>
            </ul>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    component="h4"
                    className="mb-2"
                  >
                    File 1
                  </Typography>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
                required
              >
                <InputLabel id="subsetFileName1-label">File name</InputLabel>
                <Select
                  id="subsetFileName1"
                  label="File name"
                  labelId="subsetFileName1-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="subsetFileContents1-label">
                  File contents
                </InputLabel>
                <Select
                  id="subsetFileContents1"
                  label="File contents"
                  labelId="subsetFileContents1-label"
                  value="res"
                  inputProps={{readOnly: true}}
                >
                  <MenuItem value="res">Residual tables</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="subsetNotes1"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'subsetNotes')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'subsetNotes')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'subsetNotes')}
                onClick={() => toggleHelperText('subsetNotes')}
                onBlur={() => toggleHelperText('subsetNotes')}
                onFocus={() => toggleHelperText('subsetNotes')}
                value={state.subsetNotes.text}
                error={Boolean(state.subsetNotes.errorText)}
                helperText={state.subsetNotes.errorText}
              />
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    component="h4"
                    className="mb-2"
                  >
                    File 2
                  </Typography>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
                required
              >
                <InputLabel id="subsetFileName2-label">File name</InputLabel>
                <Select
                  id="subsetFileName2"
                  label="File name"
                  labelId="subsetFileName2-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="subsetFileContents2-label">
                  File contents
                </InputLabel>
                <Select
                  id="subsetFileContents2"
                  label="File contents"
                  labelId="subsetFileContents2-label"
                  value="res"
                  inputProps={{readOnly: true}}
                >
                  <MenuItem value="res">
                    Both sets of syntax and highlight or indicate changes
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="subsetNotes2"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'subsetNotes2')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'subsetNotes2')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'subsetNotes2')}
                onClick={() => toggleHelperText('subsetNotes2')}
                onBlur={() => toggleHelperText('subsetNotes2')}
                onFocus={() => toggleHelperText('subsetNotes2')}
                value={state.subsetNotes2.text}
                error={Boolean(state.subsetNotes2.errorText)}
                helperText={state.subsetNotes2.errorText}
              />
              {state.subsetAddFile && (
                <>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className="mb-1"
                  >
                    <Grid item>
                      <Typography variant="subtitle2" component="h4">
                        File 3
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="delete file 3"
                        className={classes.margin}
                        edge="end"
                        onClick={() => handleClickOpen('dialogDeleteFile')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <FormControl
                    className={classes.inputMargin}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  >
                    <InputLabel id="subsetFileName3-label">
                      File name
                    </InputLabel>
                    <Select
                      id="subsetFileName3"
                      label="File name"
                      labelId="subsetFileName3-label"
                    >
                      <MenuItem>File 1</MenuItem>
                      <MenuItem>File 2</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.inputMargin}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="subsetFileContents3-label">
                      File contents
                    </InputLabel>
                    <Select
                      id="subsetFileContents3"
                      label="File contents"
                      labelId="subsetFileContents3-label"
                    >
                      <MenuItem>
                        Both sets of syntax and highlight or indicate changes
                      </MenuItem>
                      <MenuItem>Residual tables</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className={classes.inputMargin}
                    margin="dense"
                    id="subsetNotes3"
                    label="Notes"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'subsetNotes3')}
                    onCopy={(e) =>
                      disableCutCopyPaste(e, 'copy', 'subsetNotes3')
                    }
                    onPaste={(e) =>
                      disableCutCopyPaste(e, 'paste', 'subsetNotes3')
                    }
                    onClick={() => toggleHelperText('subsetNotes3')}
                    onBlur={() => toggleHelperText('subsetNotes3')}
                    onFocus={() => toggleHelperText('subsetNotes3')}
                    value={state.subsetNotes3.text}
                    error={Boolean(state.subsetNotes3.errorText)}
                    helperText={state.subsetNotes3.errorText}
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFileSubset}
          >
            Add file
          </Button>
        </div>
      )}
      <FormControl component="fieldset" className={classes.inputMargin}>
        <FormLabel component="legend" required>
          Has a version of this output, in part or in whole, been previously
          released for this project?
        </FormLabel>
        <RadioGroup
          id="versionpreviouslyReleased"
          onChange={handleRadioChange}
          value={state.versionpreviouslyReleased}
          name="versionpreviouslyReleased"
        >
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
      {state.versionpreviouslyReleased === 'Yes' && (
        <div className={classes.indentedSection}>
          <FormControl
            component="fieldset"
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend" required>
              Compared to the other output, have you changed the sub-sample of
              population of interest?
            </FormLabel>
            <RadioGroup id="subSample" name="subSample">
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
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend" required>
              Compared to the other output, have you dropped individual cases or
              outliers?
            </FormLabel>
            <RadioGroup id="Droppped">
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
            className={classes.inputMarginBlock}
            required
          >
            <FormLabel component="legend" required>
              Compared to the other output, have you imputed the missing data?
            </FormLabel>
            <RadioGroup id="Imputed" name="Imputed">
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
            <FormLabel component="legend" required>
              Compared to the other output, have you recoded or modified any
              variables even slightly?
            </FormLabel>
            <RadioGroup id="Recoded" name="Recoded">
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
          <Grid container>
            <Grid item xs={6}>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="changes"
                label="Explanation of changes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                required
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'changes')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'changes')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'changes')}
                onClick={() => toggleHelperText('changes')}
                onBlur={() => toggleHelperText('changes')}
                onFocus={() => toggleHelperText('changes')}
                value={state.changes.text}
                error={Boolean(state.changes.errorText)}
                helperText={state.changes.errorText}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="Date"
                label="Date relation"
                variant="outlined"
                fullWidth
                required
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'date')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'date')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'date')}
                onClick={() => toggleHelperText('date')}
                onBlur={() => toggleHelperText('date')}
                onFocus={() => toggleHelperText('date')}
                value={state.date.text}
                error={Boolean(state.date.errorText)}
                helperText={state.date.helperText}
              />
            </Grid>
            <Grid item>
              <BootstrapTooltip
                className={classes.tooltip}
                title="Indicate the date(s) of the previous vetting requests related to this request."
              >
                <InfoIcon />
              </BootstrapTooltip>
            </Grid>
          </Grid>
          <Typography component="h3" variant="subtitle1" className="mb-2">
            Supporting files
          </Typography>
          <div className={classes.emphasisBox}>
            <Typography variant="subtitle2" component="h4" className="mb-3">
              Required supporting files for residual disclosure:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Residual tables (see the vetting orientation)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Both sets of syntax and highlight or indicate the changes
                </Typography>
              </li>
            </ul>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    component="h4"
                    className="mb-2"
                  >
                    File 1
                  </Typography>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
                required
              >
                <InputLabel id="fileName1-label">File name</InputLabel>
                <Select
                  id="fileName1"
                  label="File name"
                  labelId="fileName1-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="fileContents1-label">File contents</InputLabel>
                <Select
                  id="fileContents1"
                  label="File contents"
                  labelId="fileContents1-label"
                  value="res"
                  inputProps={{readOnly: true}}
                >
                  <MenuItem value="res">Residual tables</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="notes1"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes')}
                onClick={() => toggleHelperText('notes')}
                onBlur={() => toggleHelperText('notes')}
                onFocus={() => toggleHelperText('notes')}
                value={state.notes.text}
                error={Boolean(state.notes.errorText)}
                helperText={state.notes.errorText}
              />
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    component="h4"
                    className="mb-2"
                  >
                    File 2
                  </Typography>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
                required
              >
                <InputLabel id="fileName2-label">File name</InputLabel>
                <Select
                  id="fileName2"
                  label="File name"
                  labelId="fileName2-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="fileContents2-label">File contents</InputLabel>
                <Select
                  id="fileContents2"
                  label="File contents"
                  labelId="fileContents2-label"
                  value="res"
                  inputProps={{readOnly: true}}
                >
                  <MenuItem value="res">
                    Both sets of syntax and highlight or indicate changes
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="notes2"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes2')}
                onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes2')}
                onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes2')}
                onClick={() => toggleHelperText('notes2')}
                onBlur={() => toggleHelperText('notes2')}
                onFocus={() => toggleHelperText('notes2')}
                value={state.notes2.text}
                error={Boolean(state.notes2.errorText)}
                helperText={state.notes2.errorText}
              />
              {state.addFile && (
                <>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className="mb-1"
                  >
                    <Grid item>
                      <Typography variant="subtitle2" component="h4">
                        File 3
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="delete file 3"
                        className={classes.margin}
                        edge="end"
                        onClick={() => handleClickOpen('dialogDeleteFile')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <FormControl
                    className={classes.inputMargin}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    required
                  >
                    <InputLabel id="fileName3-label">File name</InputLabel>
                    <Select
                      id="fileName3"
                      label="File name"
                      labelId="fileName3-label"
                    >
                      <MenuItem>File 1</MenuItem>
                      <MenuItem>File 2</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.inputMargin}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="fileContents3-label">
                      File contents
                    </InputLabel>
                    <Select
                      id="fileContents3"
                      label="File contents"
                      labelId="fileContents3-label"
                    >
                      <MenuItem>
                        Both sets of syntax and highlight or indicate changes
                      </MenuItem>
                      <MenuItem>Residual tables</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className={classes.inputMargin}
                    margin="dense"
                    id="notes3"
                    label="Notes"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes3')}
                    onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes3')}
                    onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes3')}
                    onClick={() => toggleHelperText('notes3')}
                    onBlur={() => toggleHelperText('notes3')}
                    onFocus={() => toggleHelperText('notes3')}
                    value={state.notes3.text}
                    error={Boolean(state.notes3.errorText)}
                    helperText={state.notes3.errorText}
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAddFile}>
            Add file
          </Button>
        </div>
      )}
      {/* Add file snackbar */}
      <SnackbarAddSupportFile
        open={state.snackbarAddFile}
        handleClose={() => handleClickClose('snackbarAddFile')}
      />
      {/* Delete file snackbar */}
      <SnackbarDeleteSupportFile
        open={state.snackbarDelete}
        handleClose={() => handleClickClose('snackbarDelete')}
      />
      {/* Delete file dialog */}
      <Dialog
        open={state.dialogDeleteFile}
        aria-labelledby="delete-dialog-title"
        fullWidth
        className={classes.root}
        scroll="paper"
      >
        <DialogTitle
          id="delete-dialog-title"
          className={classes.vettingContainerTitle}
          disableTypography
        >
          <Typography variant="h6" component="h2">
            Delete this file?
          </Typography>
          <IconButton
            onClick={() => handleClickClose('dialogDeleteFile')}
            edge="end"
            aria-label="Close delete output file"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <div className={classes.vettingSection}>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Alert severity="warning">
                Deleting this file cannot be undone.
              </Alert>
            </div>
          </div>
        </div>
        <DialogActions className={classes.dialogFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClickClose('dialogDeleteFile')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDeleteFile}
            className={classes.footerBtns}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ResidualDisclosure;
