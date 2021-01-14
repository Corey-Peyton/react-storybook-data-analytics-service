import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        'width': '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
      },
      '& .MuiInputBase-input': {
        'max-height': 130,
        'overflow': 'hidden auto !important',
      },
      '& .MuiAutocomplete-endAdornment': {
        'top': '5.5px',
      },
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
  });

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
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
      >
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
          <FormControl
            component="fieldset"
            className={classes.inputMargin}
          >
            <FormLabel component="legend" className={classes.tooltipLabel}>
            For this request, are any variables a subset of another variable?
              <BootstrapTooltip title="Examples: Had depression in the past 5 years and had depression in the previous year, had a chronic condition and had a respiratory chronic condition.">
                <InfoIcon />
              </BootstrapTooltip>
            </FormLabel>
            <RadioGroup
              id="subset"
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
          <FormControl
            component="fieldset"
            className={classes.inputMargin}
          >
            <FormLabel component="legend">
            Has a version of this output, in part of in whole, been previously released for this project?
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
              <Typography component="h2" variant="subtitle2" className="mb-2">Compared to other output for this project, have you:</Typography>
              <FormControl
                component="fieldset"
                className={classes.inputMarginBlock}
                required
              >
                <FormLabel component="legend">
                Changed the sub-sample of population of interest?
                </FormLabel>
                <RadioGroup
                  id="subSample"
                  name="subSample"
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
              <FormControl
                component="fieldset"
                className={classes.inputMarginBlock}
                required
              >
                <FormLabel component="legend">
                Droppped individual cases or outliers?
                </FormLabel>
                <RadioGroup
                  id="Droppped"
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
              <FormControl
                component="fieldset"
                className={classes.inputMarginBlock}
                required
              >
                <FormLabel component="legend">
                Imputed the missing data?
                </FormLabel>
                <RadioGroup
                  id="Imputed"
                  name="Imputed"
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
              <FormControl
                component="fieldset"
                className={classes.inputMargin}
                required
              >
                <FormLabel component="legend">
                Recoded or modified any variables even slightly?
                </FormLabel>
                <RadioGroup
                  id="Recoded"
                  name="Recoded"
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
            helperText="Please describe how the output in this request relates to other output for this project."
          />
          <TextField
            style={style}
            margin="dense"
            id="Date"
            label="Date relation"
            variant="outlined"
            fullWidth
            required
            helperText="Indicate the date(s) of the previous vetting requests related to this request."
          />
        </>
      )}
      <React.Fragment>
        <Typography component="h2" variant="h6" className="mb-2">
      Residual disclosure supporting files
        </Typography>
        <div className={classes.emphasisBox}>
          <Typography variant="subtitle2" className="mb-3">Supporting files for residual disclosure risk</Typography>
          <ul>
            <li>
              <Typography variant="body2">Residual tables (see the vetting orientation)</Typography>
            </li>
            <li>
              <Typography variant="body2">Both sets of syntax and highlight or indicate the changes.</Typography>
            </li>
          </ul>
        </div>
        <FormControl
          className={classes.inputMargin}
          margin="dense"
          required
          variant="outlined"
          fullWidth />
        <Button variant="contained" color="primary" className="mb-3" onClick={handleClickOpen}>
          Add output file
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <DialogTitle id="form-dialog-title">
            <div className={classes.dialogTitle}>Add supporting file
              <IconButton
                onClick={() => handleClose('dialogUnAssign')}
                edge='end'>
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
            <Typography variant="subtitle2">File #1 *</Typography>
            <Typography variant="subtitle2">Residual tables (see the vetting orientation)</Typography>
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
          <Divider className="mt-1" />
          <DialogActions className={classes.dialogFooter}>
            <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
            <Button onClick={handleClose} color="primary" variant="contained" className={classes.footerBtns}>Add supporting file</Button>
          </DialogActions>
        </Dialog>
        <FormControl />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">File #1</Typography>
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
            />
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">File #2</Typography>
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
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
}
export default ResidualDisclosure;
