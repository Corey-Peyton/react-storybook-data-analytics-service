import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  appBar: {
    'backgroundColor': theme.palette.common.white,
    'margin': theme.spacing(0, -3, 3, -3),
    'width': 'auto',
    '& .MuiToolbar-root': {
      justifyContent: 'space-between',
    },
  },
  emphasisBox: {
    background: '#ECEEF1',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderLeftStyle: 'solid',
    borderLeftWidth: '5px',
    borderLeftColor: theme.palette.primary.main,
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  buttonTooltip: {
    'display': 'flex',
    'alignItems': 'center',
    'marginBottom': theme.spacing(3),
    '& svg': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const outputMethods = {
  '1.Descriptive': [
    'ANOVA',
    'Correlation matrix',
    'Cross-tabular analysis',
    'Distributions',
    'Frequencies',
    'Kurtosis',
    'Means',
    'Medians',
    'Modes',
    'Percentages',
    'Quartiles',
    'Ranges',
    'Ratios',
    'Regression models with only one independent variable',
    'Skewness',
    'Standard deviations',
    'Totals',
    'Variances',
  ],
  '2.Scaling': ['Factor Analysis'],
  '3.Graphs': ['Histograms'],
  '4.Multivariable regression analysis': [
    'Logistic Regression',
    'OLS',
    'Poisson',
    'Probit',
    'Tobit',
  ],
  '5.Complex modeling': [
    'Event History Analysis',
    'Fixed Effects Models',
    'Growth Analysis',
    'Hierarchical Linear Modeling',
    'Random Effects Models',
    'Simultaneous-Equations Models',
    'Structural equation modeling',
    'Survival Analysis',
  ],
  '6.Other': [],
};

const outputMethodsTerms = [];
for (const [key, value] of Object.entries(outputMethods)) {
  if (value.length > 0) {
    for (const term of value) {
      outputMethodsTerms.push({method: key, term: term});
    }
  }
}

function ModifyFile(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    includeWeightVariable: null,
    linkedData: null,
    descriptiveStats: null,
    modifiedWeights: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const snackbarhandleClose = () => {
    setOpenSnackbar(false);
  };

  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Modify file
          </Typography>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            edge="end"
            onClick={props.toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <FormControl
        className={classes.inputMargin}
        margin="dense"
        required
        variant="outlined"
        fullWidth
      >
        <InputLabel id="outputFile-label">File for release</InputLabel>
        <Select
          id="outputFile"
          label="File for release *"
          labelId="outputFile-label"
        >
          <MenuItem>File number 2</MenuItem>
        </Select>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="sheetName"
        label="Sheet name"
        variant="outlined"
        helperText="Each sheet for a spreadsheet file should be listed separately."
        fullWidth
        required
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="datasetName"
        label="Survey or dataset name and cycle(s)"
        variant="outlined"
        fullWidth
        required
      />
      <FormControl
        className={classes.inputMargin}
        margin="dense"
        variant="outlined"
        fullWidth
        required
      >
        <InputLabel id="outputMethod-label">Output method</InputLabel>
        <Select
          id="outputMethod"
          label="Output Method *"
          labelId="outputMethod-label"
        >
          <MenuItem>Descriptive</MenuItem>
        </Select>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2">
          If you are not sure about the Output Method above, you can search for
          the proper one below:
        </Typography>
        <Autocomplete
          id="outputMethodSearch"
          options={outputMethodsTerms}
          getOptionLabel={(option) => option.term}
          renderOption={(option) => (
            <>
              {option.term} - {option.method}
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              name="outputMethodSearch"
              label="Search output method"
              variant="outlined"
            />
          )}
          getOptionSelected={(option, value) => {
            return option.term === value.term && option.method === value.method;
          }}
        />
      </div>
      <FormControl
        component="fieldset"
        required
      >
        <FormLabel component="legend">
          Does this output include a weight variable?
        </FormLabel>
        <RadioGroup
          id="includeWeightVariable"
          value={state.includeWeightVariable}
          name="includeWeightVariable"
          onChange={handleRadioChange}
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
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      {state.includeWeightVariable === 'Yes' && (
        <div className={classes.emphasisBox}>
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="weightVariableName"
            label="Name of weight variable"
            variant="outlined"
            required
            fullWidth
          />
          <FormControl
            component="fieldset"
            required
          >
            <FormLabel component="legend" className="screen-reader-text">
             Is the weight variable scaled or normalized?
            </FormLabel>
            <RadioGroup
              id="weightVariableType"
            >
              <FormControlLabel
                value="Scaled"
                control={<Radio color="primary" />}
                label="Scaled"
              />
              <FormControlLabel
                value="Normalized"
                control={<Radio color="primary" />}
                label="Normalized"
              />
            </RadioGroup>
            <FormHelperText>
            </FormHelperText>
          </FormControl>
        </div>
      )}
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="sampleUsed"
        label="Sample, sub-sample or inclusions/exclusions used"
        variant="outlined"
        helperText="Example: males 50 years of age or older. Required if you subsetted or selected only a certain set of respondents from the data for all or part of the analysis"
        fullWidth
        required
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="geographyLevel"
        label="Level of Geography"
        variant="outlined"
        helperText="Examples: national, provincial"
        fullWidth
      />
      <Typography variant="subtitle2" className="mb-2">
        Output supporting files
      </Typography>
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        required
      >
        <FormLabel component="legend">Is linked data used?</FormLabel>
        <RadioGroup
          id="linkedData"
          value={state.linkedData}
          name="linkedData"
          onChange={handleRadioChange}
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      {state.linkedData === 'Yes' && (
        <TextField
          className={classes.inputMargin}
          margin="dense"
          id="linkageDescription"
          label="Describe how linkage was done"
          variant="outlined"
          helperText="Examples: person-based, record-based, matching geographies"
          fullWidth
          required
        />
      )}
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
        required
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Are variables related to income, earnings, tax and/or dollar values
          included?{' '}
          <Tooltip
            title="If no, future vetting release reuests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst."
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </FormLabel>
        <RadioGroup
          id="dollarIncluded"
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
      >
        <FormLabel component="legend">
          Does the request include descriptive statistics?
        </FormLabel>
        <RadioGroup
          id="descriptiveStats"
          value={state.descriptiveStats}
          name="descriptiveStats"
          onChange={handleRadioChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          <FormControlLabel value="NA" control={<Radio />} label="N/A" />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      {state.descriptiveStats === 'Yes' && (
        <FormControl className={classes.inputMargin} component="fieldset">
          <FormLabel component="legend">
            Is the output clearly labelled (tables have a title and every
            variable and category is labelled)?
          </FormLabel>
          <RadioGroup id="outpuLabelled">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      )}
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Does this request include model output or graphs that are equivalent
          to a descriptive statistics?{' '}
          <Tooltip
            title="Examples: a model with a single independant variable, a model with all possible interactions, histograms"
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </FormLabel>
        <RadioGroup
          id="equivalentDescriptiveStats"
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Did you apply modified (e.g. standardized) weights in the analysis?{' '}
          <Tooltip
            title="If yes, consult with your analyst about the vetting rules for modified weights."
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </FormLabel>
        <RadioGroup
          id="modifiedWeights"
          value={state.modifiedWeights}
          name="modifiedWeights"
          onChange={handleRadioChange}
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      {state.modifiedWeights === 'Yes' && (
        <TextField
          className={classes.inputMargin}
          margin="dense"
          id="modifiedDesc"
          label="Describe why and how the weights were modified"
          variant="outlined"
          fullWidth
          required
        />
      )}
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
      >
        <FormLabel component="legend">
          Does this output include a correlation or covariance matrix?
        </FormLabel>
        <RadioGroup
          id="includeMatrix"
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Is rounding of output required for this vetting request?{' '}
          <Tooltip
            title="If yes, ensure that any forced rounding to zero is shown."
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </FormLabel>
        <RadioGroup
          id="roundingOutput"
          value={state.roundingOutput}
          name="roundingOutput"
          onChange={handleRadioChange}
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
          <FormControlLabel
            value="NA"
            control={<Radio color="primary" />}
            label="N/A"
          />
        </RadioGroup>
        <FormHelperText>
        </FormHelperText>
      </FormControl>
      {state.roundingOutput === 'Yes' && (
        <TextField
          className={classes.inputMargin}
          margin="dense"
          id="roundingDesc"
          label="Describe the approach to rounding and rounding base"
          variant="outlined"
          fullWidth
          required
        />
      )}
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2" className="mb-2">
          Mandatory supporting files:
        </Typography>
        <ul className="mb-3">
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Unweighted supporting sample counts.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Syntax used for variable creation, analysis and running the
              vetting tests.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Vetting the results (e..g. test of magnitude, dominance, etc).
            </Typography>
          </li>
        </ul>
        <Typography variant="subtitle2">
          NOTE: supporting files will not be released. Please name your support
          files to allow easy pairing of the corresponding output file.
        </Typography>
      </div>
      <div className={classes.buttonTooltip}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Supporting File
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"

        >
          <DialogTitle id="form-dialog-title">Add supporting file</DialogTitle>
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
                variant="standard"
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
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleClick}>Add supporting file</Button>
          </DialogActions>
        </Dialog>

        <Tooltip
          title="In addition to the mandatory files listed, include other files as required by the Survey Specific Guidelines, syntax files or other files requested by the analyst."
          arrow
          placement="right"
        >
          <InfoIcon />
        </Tooltip>
      </div>
      <Typography variant="subtitle2">Supporting file #1</Typography>
      <FormControl
        className={classes.inputMargin}
        margin="dense"
        required
        variant="outlined"
        fullWidth
      >
        <InputLabel id="outputFolder1-label">Output Folder Name</InputLabel>
        <Select
          id="outputFolder1"
          label="Output Folder Name *"
          labelId="outputFolder1-label"
        >
          <MenuItem>Folder 1</MenuItem>
          <MenuItem>Folder 2</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="fileContents1"
        label="File Contents"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="notes1"
        label="Notes"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        required
      />
      <Typography variant="subtitle2">Supporting file #2</Typography>
      <FormControl
        className={classes.inputMargin}
        margin="dense"
        required
        variant="outlined"
        fullWidth
      >
        <InputLabel id="outputFolder2-label">Output Folder Name</InputLabel>
        <Select
          id="outputFolder2"
          label="Output Folder Name *"
          labelId="outputFolder2-label"
        >
          <MenuItem>Folder 1</MenuItem>
          <MenuItem>Folder 2</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="fileContents2"
        label="File Contents"
        variant="outlined"
        fullWidth
        required
      />
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
      <Button variant="contained" className={classes.button} color="primary"
        onClick={props.toggleDrawer(false)}>
        Save Changes
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={snackbarhandleClose}>
        <Alert
          severity="success"
          className={classes.alert}
          variant="filled"
        >
          The supporting file has been added
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default ModifyFile;
