import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const style = {
  width: 304,
  display: 'block',
  marginBottom: 16,
};

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
  inputMarginBlock: {
    marginBottom: theme.spacing(2),
    display: 'block',
  },
  inputMargin: {
    marginBottom: theme.spacing(2),
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
  dialogFooter: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
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
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function ResidualDisclosure(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    weightVar: false,
    previouslyReleased: false,
    versionpreviouslyReleased: false,
    changes: '',
    output: {
      text: '',
      errorText: '',
      helperText:
        'Please describe how the output in this request relates to other output for this project.',
      invalid: '',
      commands: '',
    },
    date: {
      text: '',
      errorText: '',
      helperText:
        'Indicate the date(s) of the previous vetting requests related to this request.',
      invalid: '',
      commands: '',
    },
    content: '',
    notes: '',
    content2: '',
    notes2: '',
    dialognotes: '',
  });

  const initial = {
    // blank object used to reset state
    changes: {
      text: '',
      errorText: '',
      helperText: '',
      invalid: '',
      commands: '',
    },
    output: {
      text: '',
      errorText: '',
      helperText:
        'Please describe how the output in this request relates to other output for this project.',
      invalid: '',
      commands: '',
    },
    date: {
      text: '',
      errorText: '',
      helperText:
        'Indicate the date(s) of the previous vetting requests related to this request.',
      invalid: '',
      commands: '',
    },
    content: {
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
    content2: {
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
    dialognotes: {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Typography>
        A re-release of the same output after slight modifications greatly
        increases the risk of residual disclosure. Statistics Canada strongly
        recommends that researchers submit as few versions of the output as
        possible for release from the RDC.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" className="mb-2">
        Residual disclosure risk
      </Typography>
      <FormControl component="fieldset" className={classes.inputMargin}>
        <FormLabel component="legend">
          Have other outputs been previously released for this project?
        </FormLabel>
        <RadioGroup
          id="previouslyReleased"
          onChange={handleRadioChange}
          value={state.previouslyReleased}
          name="previouslyReleased"
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
      {state.previouslyReleased === 'Yes' && (
        <>
          <FormControl component="fieldset" className={classes.inputMargin}>
            <FormLabel component="legend" className={classes.tooltipLabel}>
              For this request, are any variables a subset of another variable?
              <BootstrapTooltip title="Examples: Had depression in the past 5 years and had depression in the previous year, had a chronic condition and had a respiratory chronic condition.">
                <InfoIcon />
              </BootstrapTooltip>
            </FormLabel>
            <RadioGroup id="subset" name="subset">
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
          <FormControl component="fieldset" className={classes.inputMargin}>
            <FormLabel component="legend">
              Has a version of this output, in part of in whole, been previously
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
            <>
              <Typography component="h2" variant="subtitle2" className="mb-2">
                Compared to other output for this project, have you:
              </Typography>
              <FormControl
                component="fieldset"
                className={classes.inputMarginBlock}
                required
              >
                <FormLabel component="legend">
                  Changed the sub-sample of population of interest?
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
                <FormLabel component="legend">
                  Droppped individual cases or outliers?
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
                <FormLabel component="legend">
                  Imputed the missing data?
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
                <FormLabel component="legend">
                  Recoded or modified any variables even slightly?
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
              <TextField
                style={style}
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
            </>
          )}
          <TextField
            style={style}
            margin="dense"
            id="Output"
            label="Output relation"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            required
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'output')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'output')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'output')}
            onClick={() => toggleHelperText('output')}
            onBlur={() => toggleHelperText('output')}
            onFocus={() => toggleHelperText('output')}
            value={state.output.text}
            error={Boolean(state.output.errorText)}
            helperText={state.output.helperText}
          />
          <TextField
            style={style}
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
        </>
      )}
      <React.Fragment>
        <Typography component="h2" variant="h6" className="mb-2">
          Residual disclosure supporting files
        </Typography>
        <div className={classes.emphasisBox}>
          <Typography variant="subtitle2" component="h3" className="mb-3">
            Supporting files for residual disclosure risk
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Residual tables (see the vetting orientation)
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Both sets of syntax and highlight or indicate the changes.
              </Typography>
            </li>
          </ul>
        </div>
        <FormControl
          className={classes.inputMargin}
          margin="dense"
          required
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          className="mb-3"
          onClick={handleClickOpen}
        >
          Add output file
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
          disableBackdropClick
        >
          <DialogTitle id="form-dialog-title">
            <div className={classes.vettingContainerTitle}>
              Add supporting file
              <IconButton
                onClick={() => handleClose('dialogUnAssign')}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <FormControl
                    required
                    variant="outlined"
                    fullWidth
                    className={classes.inputMargin}
                  >
                    <InputLabel id="outputFolder-label">
                      Output folder name
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
                  <Typography variant="subtitle2" component="h3">
                    File #1 *
                  </Typography>
                  <Typography variant="subtitle2" component="h3">
                    Residual tables (see the vetting orientation)
                  </Typography>
                  <div className={classes.vettingRow}>
                    <div className={classes.vettingColumn}>
                      {' '}
                      <TextField
                        id="notes2"
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        required
                        onCut={(e) =>
                          disableCutCopyPaste(e, 'cut', 'dialognotes')
                        }
                        onCopy={(e) =>
                          disableCutCopyPaste(e, 'copy', 'dialognotes')
                        }
                        onPaste={(e) =>
                          disableCutCopyPaste(e, 'paste', 'dialognotes')
                        }
                        onClick={() => toggleHelperText('dialognotes')}
                        onBlur={() => toggleHelperText('dialognotes')}
                        onFocus={() => toggleHelperText('dialognotes')}
                        value={state.dialognotes.text}
                        error={Boolean(state.dialognotes.errorText)}
                        helperText={state.dialognotes.errorText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions className={classes.dialogFooter}>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Add supporting file
            </Button>
          </DialogActions>
        </Dialog>
        <FormControl />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2" component="h3">
                  File #1
                </Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <FormControl
              className={classes.inputMargin}
              margin="dense"
              variant="outlined"
              fullWidth
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
            <TextField
              className={classes.inputMargin}
              margin="dense"
              id="fileContents1"
              label="File contents"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'content')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'content')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'content')}
              onClick={() => toggleHelperText('content')}
              onBlur={() => toggleHelperText('content')}
              onFocus={() => toggleHelperText('content')}
              value={state.content.text}
              error={Boolean(state.content.errorText)}
              helperText={state.content.errorText}
            />
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
                <Typography variant="subtitle2" component="h3">
                  File #2
                </Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <FormControl
              className={classes.inputMargin}
              margin="dense"
              variant="outlined"
              fullWidth
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
            <TextField
              className={classes.inputMargin}
              margin="dense"
              id="fileContents2"
              label="File contents"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'content2')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'content2')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'content2')}
              onClick={() => toggleHelperText('content2')}
              onBlur={() => toggleHelperText('content2')}
              onFocus={() => toggleHelperText('content2')}
              value={state.content2.text}
              error={Boolean(state.content2.errorText)}
              helperText={state.content2.errorText}
            />
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
          </Grid>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
}
export default ResidualDisclosure;
