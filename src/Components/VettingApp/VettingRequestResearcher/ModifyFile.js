import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
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
  Grid,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  marginHelperText: {
    marginBottom: theme.spacing(1),
  },
  inputMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  lineHeight: {
    lineHeight: 'normal',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  hiddenRow: {
    display: 'none',
  },
  appBar: {
    'backgroundColor': theme.palette.common.white,
    'margin': theme.spacing(0, -3, 3, -3),
    'boxShadow': theme.shadows[0],
    'borderBottom': '1px solid',
    'borderBottomColor': theme.palette.divider,
    'position': 'fixed',
    'top': 0,
    'zIndex': 500,
    'width': '400px',
    '& .MuiToolbar-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(0, 3),
    },
  },
  body: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2, 3, 2, 0),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    position: 'fixed',
    bottom: 0,
    width: '400px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
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

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
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

export function AddFile(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Add output file
          </Typography>
          <IconButton
            aria-label="Close add output file"
            className={classes.margin}
            edge="end"
            onClick={(e) => props.toggleDrawer(e, 'addFile', false)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <OutputFileForm {...props} />
      </div>
      <div className={classes.footer}>
        <Button
          className="mr-2"
          variant="outlined"
          color="primary"
          onClick={(e) => props.toggleDrawer(e, 'addFile', false)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={props.createFile}>
          Create
        </Button>
      </div>
    </React.Fragment>
  );
}

export function ModifyFile(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            Edit output file
          </Typography>
          <IconButton
            aria-label="Close edit output file"
            className={classes.margin}
            edge="end"
            onClick={(e) => props.toggleDrawer(e, 'editFile', false)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <OutputFileForm {...props} />
      </div>
      <div className={classes.footer}>
        <Button
          className="mr-2"
          variant="outlined"
          color="primary"
          onClick={(e) => props.toggleDrawer(e, 'editFile', false)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={props.updateFile}>
          Update
        </Button>
      </div>
    </React.Fragment>
  );
}

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function OutputFileForm(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    includeWeightVariable: null,
    linkedData: null,
    descriptiveStats: null,
    modifiedWeights: null,
    covariance: null,
    sheetname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText:
        'Each sheet for a spreadsheet file should be listed separately',
    },
    survey: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    outputmethod: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    weightvariable: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    sample: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText:
        'Example: males 50 years of age or older. Required if you subsetted or selected only a certain set of respondents from the data for all or part of the analysis',
    },
    geography: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'Examples: national, provincial',
    },
    linkage: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'Examples: person-based, record-based, matching geographies',
    },
    modified: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    rounding: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contents: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    notes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contents2: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    notes2: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
  });
  const [selected, setSelected] = React.useState('');

  const initial = {
    // blank object used to reset state
    sheetname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText:
        'Each sheet for a spreadsheet file should be listed separately',
    },
    survey: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    outputmethod: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    weightvariable: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    sample: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText:
        'Example: males 50 years of age or older. Required if you subsetted or selected only a certain set of respondents from the data for all or part of the analysis',
    },
    geography: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'Examples: national, provincial',
    },
    linkage: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'Examples: person-based, record-based, matching geographies',
    },
    modified: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    rounding: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contents: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    notes: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    contents2: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    notes2: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
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

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <>
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
        <FormHelperText></FormHelperText>
      </FormControl>
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="sheetName"
        label="Sheet name"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'sheetname')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'sheetname')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'sheetname')}
        onChange={(e) => handleChange(e, 'info')}
        onClick={() => toggleHelperText('sheetname')}
        onBlur={() => toggleHelperText('sheetname')}
        onFocus={() => toggleHelperText('sheetname')}
        defaultValue={state.sheetname.text}
        error={Boolean(state.sheetname.errorText)}
        helperText={state.sheetname.helperText}
      />
      <TextField
        className={classes.inputMargin}
        margin="dense"
        id="datasetName"
        label="Survey or dataset name and cycle(s)"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'survey')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'survey')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'survey')}
        onClick={() => toggleHelperText('survey')}
        onBlur={() => toggleHelperText('survey')}
        onFocus={() => toggleHelperText('survey')}
        defaultValue={state.survey.text}
        error={Boolean(state.survey.errorText)}
        helperText={state.survey.errorText}
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
          label="Output Method"
          labelId="outputMethod-label"
          onChange={handleChange}
          value={selected}
          required
        >
          <MenuItem value="Descriptive">Descriptive</MenuItem>
          <MenuItem value="Scaling">Scaling</MenuItem>
          <MenuItem value="Graphs">Graphs</MenuItem>
          <MenuItem value="Multivariable regression analysis">
            Multivariable regression analysis
          </MenuItem>
          <MenuItem value="Complex modeling">Complex modeling</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
      <div
        className={clsx(classes.inputMargin, {
          [classes.hiddenRow]: selected !== 'Other',
        })}
      >
        <TextField
          className={classes.inputMargin}
          margin="dense"
          id="DescriptionOfOutputMethod"
          label="Description of output method"
          variant="outlined"
          fullWidth
          required
          multiline
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'outputmethod')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'outputmethod')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'outputmethod')}
          onChange={(e) => handleChange(e, 'info')}
          onClick={() => toggleHelperText('outputmethod')}
          onBlur={() => toggleHelperText('outputmethod')}
          onFocus={() => toggleHelperText('outputmethod')}
          defaultValue={state.outputmethod.text}
          error={Boolean(state.outputmethod.errorText)}
          helperText={state.outputmethod.errorText}
        />
      </div>
      <div className="emphasisBox minHeight">
        <Typography variant="subtitle2" component="p">
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
      <FormControl component="fieldset" required>
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
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.includeWeightVariable === 'Yes' && (
        <div className="minHeight2">
          <>
            <TextField
              className={classes.inputMargin}
              margin="dense"
              id="weightVariableName"
              label="Name of weight variable"
              variant="outlined"
              required
              fullWidth
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'weightvariable')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'weightvariable')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'weightvariable')}
              onChange={(e) => handleChange(e, 'info')}
              onClick={() => toggleHelperText('weightvariable')}
              onBlur={() => toggleHelperText('weightvariable')}
              onFocus={() => toggleHelperText('weightvariable')}
              defaultValue={state.weightvariable.text}
              error={Boolean(state.weightvariable.errorText)}
              helperText={state.weightvariable.errorText}
            />
            <FormControl component="fieldset" required>
              <FormLabel component="legend" className="screen-reader-text">
                Is the weight variable scaled or normalized?
              </FormLabel>
              <RadioGroup id="weightVariableType">
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
              <FormHelperText></FormHelperText>
            </FormControl>
          </>
        </div>
      )}
      <TextField
        className={classes.marginHelperText}
        margin="dense"
        id="sampleUsed"
        label="Sample, sub-sample or inclusions/exclusions used"
        variant="outlined"
        fullWidth
        required
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'sample')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'sample')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'sample')}
        onClick={() => toggleHelperText('sample')}
        onBlur={() => toggleHelperText('sample')}
        onFocus={() => toggleHelperText('sample')}
        defaultValue={state.sample.text}
        error={Boolean(state.sample.errorText)}
        helperText={state.sample.helperText}
      />
      <TextField
        className={classes.marginHelperText}
        margin="dense"
        id="geographyLevel"
        label="Level of Geography"
        variant="outlined"
        fullWidth
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'geography')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'geography')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'geography')}
        onClick={() => toggleHelperText('geography')}
        onBlur={() => toggleHelperText('geography')}
        onFocus={() => toggleHelperText('geography')}
        defaultValue={state.geography.text}
        error={Boolean(state.geography.errorText)}
        helperText={state.geography.helperText}
      />
      <Typography variant="subtitle2" className="mb-2 mt-1" component="h3">
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
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.linkedData === 'Yes' && (
        <TextField
          className={classes.inputMargin}
          margin="dense"
          id="linkageDescription"
          label="Describe how linkage was done"
          variant="outlined"
          fullWidth
          required
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'linkage')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'linkage')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'linkage')}
          onClick={() => toggleHelperText('linkage')}
          onBlur={() => toggleHelperText('linkage')}
          onFocus={() => toggleHelperText('linkage')}
          defaultValue={state.linkage.text}
          error={Boolean(state.linkage.errorText)}
          helperText={state.linkage.helperText}
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
          <BootstrapTooltip title="If no, future vetting release reuests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst.">
            <InfoIcon />
          </BootstrapTooltip>
        </FormLabel>
        <RadioGroup id="dollarIncluded">
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
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl className={classes.inputMargin} component="fieldset">
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
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.descriptiveStats === 'Yes' && (
        <FormControl className={classes.inputMargin} component="fieldset">
          <FormLabel component="legend" className={classes.lineHeight}>
            Is the output clearly labelled (tables have a title and every
            variable and category is labelled)?
          </FormLabel>
          <RadioGroup id="outpuLabelled">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText></FormHelperText>
          <FormLabel component="legend">
            Are minimum cell sizes met as per the rules for the data?
          </FormLabel>
          <RadioGroup id="minimumCellSizes">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      )}
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
        required
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Does this request include model output or graphs that are equivalent
          to a descriptive statistics?{' '}
          <BootstrapTooltip title="Examples: a model with a single independant variable, a model with all possible interactions, histograms.">
            <InfoIcon />
          </BootstrapTooltip>
        </FormLabel>
        <RadioGroup id="equivalentDescriptiveStats">
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
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
        required
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Did you apply modified (e.g. standardized) weights in the analysis?{' '}
          <BootstrapTooltip title="If yes, consult with your analyst about the vetting rules for modified weights.">
            <InfoIcon />
          </BootstrapTooltip>
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
        <FormHelperText></FormHelperText>
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
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'modified')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'modified')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'modified')}
          onClick={() => toggleHelperText('modified')}
          onBlur={() => toggleHelperText('modified')}
          onFocus={() => toggleHelperText('modified')}
          defaultValue={state.modified.text}
          error={Boolean(state.modified.errorText)}
          helperText={state.modified.errorText}
        />
      )}
      <FormControl className={classes.inputMargin} component="fieldset">
        <FormLabel component="legend">
          Does this output include a correlation or covariance matrix?
        </FormLabel>
        <RadioGroup
          id="includeMatrix"
          value={state.covariance}
          name="covariance"
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
      </FormControl>
      {state.covariance === 'Yes' && (
        <FormControl className={classes.inputMargin} component="fieldset">
          <FormLabel component="legend">
            Does the matrix include continuous variables?
          </FormLabel>
          <RadioGroup id="continuousVariables" className={classes.inputMargin}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormLabel component="legend">
            Does the matrix inclue dichotomous variables?
          </FormLabel>
          <RadioGroup id="dichotomousVariables" className={classes.inputMargin}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormLabel component="legend" className={classes.lineHeight}>
            Does the matrix include a dichotomous variable correlated with a
            continuous variable?
          </FormLabel>
          <RadioGroup id="dichotomousVariable">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      )}
      <FormControl
        className={classes.inputMargin}
        component="fieldset"
        required
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Is rounding of output required for this vetting request?{' '}
          <BootstrapTooltip title="If yes, ensure that any forced rounding to zero is shown.">
            <InfoIcon />
          </BootstrapTooltip>
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
        <FormHelperText></FormHelperText>
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
          onCut={(e) => disableCutCopyPaste(e, 'cut', 'rounding')}
          onCopy={(e) => disableCutCopyPaste(e, 'copy', 'rounding')}
          onPaste={(e) => disableCutCopyPaste(e, 'paste', 'rounding')}
          onClick={() => toggleHelperText('rounding')}
          onBlur={() => toggleHelperText('rounding')}
          onFocus={() => toggleHelperText('rounding')}
          defaultValue={state.rounding.text}
          error={Boolean(state.rounding.errorText)}
          helperText={state.rounding.errorText}
        />
      )}
      <div className="emphasisBox minHeight3">
        <Typography variant="subtitle2" className="mb-2" component="h3">
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
        <Typography variant="subtitle2" component="p">
          NOTE: supporting files will not be released. Please name your support
          files to allow easy pairing of the corresponding output file.
        </Typography>
      </div>
      <div className={classes.buttonTooltip}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.handleClickOpen('dialogAddSupporting')}
        >
          Add Supporting File
        </Button>
        <BootstrapTooltip title="In addition to the mandatory files listed, include other files as required by the Survey Specific Guidelines, syntax files or other files requested by the analyst.">
          <InfoIcon />
        </BootstrapTooltip>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2" component="h3">
            Supporting file #1
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
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'contents')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'contents')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'contents')}
        onClick={() => toggleHelperText('contents')}
        onBlur={() => toggleHelperText('contents')}
        onFocus={() => toggleHelperText('contents')}
        defaultValue={state.contents.text}
        error={Boolean(state.contents.errorText)}
        helperText={state.contents.errorText}
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
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes')}
        onClick={() => toggleHelperText('notes')}
        onBlur={() => toggleHelperText('notes')}
        onFocus={() => toggleHelperText('notes')}
        defaultValue={state.notes.text}
        error={Boolean(state.notes.errorText)}
        helperText={state.notes.errorText}
      />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2" component="h3">
            Supporting file #2
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
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'contents2')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'contents2')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'contents2')}
        onClick={() => toggleHelperText('contents2')}
        onBlur={() => toggleHelperText('contents2')}
        onFocus={() => toggleHelperText('contents2')}
        defaultValue={state.contents2.text}
        error={Boolean(state.contents2.errorText)}
        helperText={state.contents2.errorText}
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
        onCut={(e) => disableCutCopyPaste(e, 'cut', 'notes2')}
        onCopy={(e) => disableCutCopyPaste(e, 'copy', 'notes2')}
        onPaste={(e) => disableCutCopyPaste(e, 'paste', 'notes2')}
        onClick={() => toggleHelperText('notes2')}
        onBlur={() => toggleHelperText('notes2')}
        onFocus={() => toggleHelperText('notes2')}
        defaultValue={state.notes2.text}
        error={Boolean(state.notes2.errorText)}
        helperText={state.notes2.errorText}
      />
    </>
  );
}
