import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
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
  Divider,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
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

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6">
        Modify file
      </Typography>
      <Divider className={classes.divider} />
      <Typography className="mb-2" variant="subtitle2">
        Items marked with asterisk (*) are required.
      </Typography>
      <Typography variant="subtitle2">File Name</Typography>
      <Typography className="mb-2" variant="body2">
        Output file example with a very long name.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            required
            variant="outlined"
            fullWidth
            // error={
            //   errors.outputFiles && errors.outputFiles[index].outputFile
            //     ? true
            //     : false
            // }
          >
            <InputLabel id="outputFile-label">File For Release</InputLabel>
            {/* <Controller
                    render={({ onBlur, onChange, value }) => ( */}
            <Select
              id="outputFile"
              label="File for release *"
              labelId="outputFile-label"
              // onChange={onChange}
              // value={value}
            >
              {/* {files.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))} */}
              <MenuItem>File number 2</MenuItem>
            </Select>
            {/* )}
                    name={"outputFiles[" + index + "].outputFile"}
                    control={control}
                    rules={{ required: requiredErrorMessage }}
                  /> */}
            <FormHelperText>
              {/* {errors.outputFiles && errors.outputFiles[index].outputFile
                      ? errors.outputFiles[index].outputFile.message
                      : ''} */}
            </FormHelperText>
          </FormControl>
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="sheetName"
            // name={'outputFiles[' + index + '].sheetName'}
            label="Sheet Name"
            variant="outlined"
            helperText="Each sheet for a spreadsheet file should be listed separately."
            // inputRef={register}
            fullWidth
            required
          />
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="datasetName"
            // name={'outputFiles[' + index + '].datasetName'}
            label="Survey or Dataset Name and Cycle(s)"
            variant="outlined"
            // inputRef={register}
            fullWidth
            required
          />
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            variant="outlined"
            fullWidth
            required
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].outputMethod
            //     ? true
            //     : false
            // }
          >
            <InputLabel id="outputMethod-label">Output Method</InputLabel>
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <Select
              id="outputMethod"
              label="Output Method *"
              labelId="outputMethod-label"
              // onChange={(e) =>
              //   handleMandatoryChange(
              //       e,
              //       '3.Graphs',
              //       ['supporting tabulations for graphs'],
              //       onChange
              //   )
              // }
              // value={value}
            >
              {/* {Object.keys(outputMethods).map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))} */}
              <MenuItem>Descriptive</MenuItem>
            </Select>
            {/* )}
                      name={"outputFiles[" + index + "].outputMethod"}
                      control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].outputMethod
                        ? errors.outputFiles[index].outputMethod.message
                        : ''} */}
            </FormHelperText>
          </FormControl>
          <div className={classes.emphasisBox}>
            <Typography variant="subtitle2">
              If you are not sure about the Output Method above, you can search
              for the proper one below:
            </Typography>
            <Autocomplete
              id="outputMethodSearch"
              options={outputMethodsTerms}
              // onChange={(e, val) => {
              //   setValue('outputMethod', val.method);
              // }}
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
                  label="Search Output Method"
                  variant="outlined"
                />
              )}
              getOptionSelected={(option, value) => {
                return (
                  option.term === value.term && option.method === value.method
                );
              }}
            />
          </div>
          <FormControl
            component="fieldset"
            required
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].includeWeightVariable
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend">
              Does this output include a weight variable?
            </FormLabel>
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="includeWeightVariable"
              // onChange={onChange}
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary"/>} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
            </RadioGroup>
            {/* )}
                      name={"outputFiles[" + index + "].includeWeightVariable"}
                      control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].includeWeightVariable
                        ? errors.outputFiles[index].includeWeightVariable
                            .message
                        : ""} */}
            </FormHelperText>
          </FormControl>
          <div className={classes.emphasisBox}>
            {/* {watchFields[
                  "outputFiles[" + index + "].includeWeightVariable"
                ] === "Yes" && ( */}
            <>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="weightVariableName"
                // name={"outputFiles[" + index + "].weightVariableName"}
                label="Name of weight variable"
                variant="outlined"
                // inputRef={register({ required: requiredErrorMessage })}
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].weightVariableName
                //     ? true
                //     : false
                // }
                // helperText={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].weightVariableName
                //     ? errors.outputFiles[index].weightVariableName
                //         .message
                //     : ""
                // }
                required
                fullWidth
              />
              <FormControl
                component="fieldset"
                required
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].weightVariableType
                //     ? true
                //     : false
                // }
              >
                <FormLabel component="legend" className="screen-reader-text">
                  Is the weight variable scaled or normalized?
                </FormLabel>
                {/* <Controller
                          render={({onBlur, onChange, value}) => ( */}
                <RadioGroup
                  id="weightVariableType"
                  // onChange={onChange}
                  // value={value}
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
                {/* )}
                          name={'outputFiles[' + index + '].weightVariableType'}
                          control={control}
                          rules={{required: requiredErrorMessage}}
                        /> */}
                <FormHelperText>
                  {/* {errors.outputFiles &&
                          errors.outputFiles[index].weightVariableType
                            ? errors.outputFiles[index].weightVariableType
                                .message
                            : ""} */}
                </FormHelperText>
              </FormControl>
            </>
          </div>
          {/* )} */}
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="sampleUsed"
            // name={"outputFiles[" + index + "].sampleUsed"}
            label="Sample, sub-sample or inclusions/exclusions used"
            variant="outlined"
            helperText="Example: males 50 years of age or older. Required if you subsetted or selected only a certain set of respondents from the data for all or part of the analysis"
            // inputRef={register}
            fullWidth
            required
          />
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="geographyLevel"
            // name={"outputFiles[" + index + "].geographyLevel"}
            label="Level of Geography"
            variant="outlined"
            helperText="Examples: national, provincial"
            // inputRef={register}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" className="mb-2">
            Output supporting files
          </Typography>
          <FormControl
            component="fieldset"
            className={classes.inputMargin}
            required
            // error={
            //   errors.outputFiles && errors.outputFiles[index].linkedData
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend">Is linked data used?</FormLabel>
            {/* <Controller
                      render={({onBlur, onChange, value}) => ( */}
            <RadioGroup
              id="linkedData"
              // onChange={onChange}
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )}
                      name={'outputFiles[' + index + '].linkedData'}
                      control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].linkedData
                        ? errors.outputFiles[index].linkedData.message
                        : false} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            required
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].dollarIncluded
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend" className={classes.tooltipLabel}>
              Are variables related to income, earnings, tax and/or dollar
              values included?{' '}
              <Tooltip
                title="If no, future vetting release reuests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst."
                arrow
                placement="right"
              >
                <InfoIcon />
              </Tooltip>
            </FormLabel>
            {/* <Controller
                    render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="dollarIncluded"
              // onChange={(e) =>
              //   handleMandatoryChange(
              //     e,
              //     "Yes",
              //     [
              //       "unweighted supporting sample counts",
              //       "syntax used for variable creation, analysis and running the vetting tests",
              //       "vetting test results (e.g. test of magnitude, dominance, etc)",
              //     ],
              //     onChange
              //   )
              // }
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )} name={"outputFiles[" + index + "].dollarIncluded"}
                  control={control}
                  /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                    errors.outputFiles[index].dollarIncluded
                      ? errors.outputFiles[index].dollarIncluded.message
                      : ""} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].descriptiveStats
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend">
              Does the request include descriptive statistics?
            </FormLabel>
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="descriptiveStats"
              // onChange={(e) =>
              //   handleMandatoryChange(
              //     e,
              //     "Yes",
              //     [
              //       "correct supporting documentation according to the vetting rules (e.g. counts are unweighted / weighted / weighted and rounded)",
              //     ],
              //     onChange
              //   )
              // }
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="NA" control={<Radio />} label="N/A" />
            </RadioGroup>
            {/* )} name={"outputFiles[" + index + "].descriptiveStats"}
                    control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].descriptiveStats
                        ? errors.outputFiles[index].descriptiveStats.message
                        : ""} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].equivalentDescriptiveStats
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend" className={classes.tooltipLabel}>
              Does this request include model output or graphs that are
              equivalent to a descriptive statistics?{' '}
              <Tooltip
                title="Examples: a model with a single independant variable, a model with all possible interactions, histograms"
                arrow
                placement="right"
              >
                <InfoIcon />
              </Tooltip>
            </FormLabel>
            {/* <Controller
                    render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="equivalentDescriptiveStats"
              // onChange={(e) =>
              //   handleMandatoryChange(
              //     e,
              //     "Yes",
              //     ["unweighted frequency table for respondent counts"],
              //     onChange
              //   )
              // }
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )} name=
                  {"outputFiles[" + index + "].equivalentDescriptiveStats"}
                  control={control}
                  /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                    errors.outputFiles[index].equivalentDescriptiveStats
                      ? errors.outputFiles[index].equivalentDescriptiveStats
                          .message
                      : ""} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].modifiedWeights
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend" className={classes.tooltipLabel}>
              Did you apply modified (e.g. standardized) weights in the
              analysis?{' '}
              <Tooltip
                title="If yes, consult with your analyst about the vetting rules for modified weights."
                arrow
                placement="right"
              >
                <InfoIcon />
              </Tooltip>
            </FormLabel>
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="modifiedWeights"
              // onChange={onChange}
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )} name={"outputFiles[" + index + "].modifiedWeights"}
                    control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].modifiedWeights
                        ? errors.outputFiles[index].modifiedWeights
                        : ""} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].includeMatrix
            //     ? true
            //     : false
            // }
          >
            <FormLabel component="legend">
              Does this output include a correlation or covariance matrix?
            </FormLabel>
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="includeMatrix"
              // onChange={onChange}
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )} name={"outputFiles[" + index + "].includeMatrix"}
                    control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].includeMatrix
                        ? errors.outputFiles[index].includeMatrix.message
                        : ""} */}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputMargin}
            component="fieldset"
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].roundingOutput
            //     ? true
            //     : false
            // }
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
            {/* <Controller
                      render={({ onBlur, onChange, value }) => ( */}
            <RadioGroup
              id="roundingOutput"
              // onChange={(e) =>
              //   handleMandatoryChange(
              //     e,
              //     "Yes",
              //     ["unrounded version of this output"],
              //     onChange
              //   )
              // }
              // value={value}
            >
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="NA" control={<Radio color="primary" />} label="N/A" />
            </RadioGroup>
            {/* )} name={"outputFiles[" + index + "].roundingOutput"}
                    control={control}
                    /> */}
            <FormHelperText>
              {/* {errors.outputFiles &&
                      errors.outputFiles[index].roundingOutput
                        ? errors.outputFiles[index].roundingOutput.message
                        : ""} */}
            </FormHelperText>
          </FormControl>
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
              NOTE: supporting files will not be released. Please name your
              support files to allow easy pairing of the corresponding output
              file.
            </Typography>
          </div>
          <div className={classes.buttonTooltip}>
            <Button variant="outlined" color="primary">
              Add Supporting File
            </Button>
            <Tooltip
              title="In addition to the mandatory files listed, include other files as required by the Survey Specific Guidelines, syntax files or other files requested by the analyst."
              arrow
              placement="right"
            >
              <InfoIcon />
            </Tooltip>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
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
                // name={'outputFiles[' + index + '].sheetName'}
                label="File Contents"
                variant="outlined"
                // inputRef={register}
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
                // name={'outputFiles[' + index + '].sheetName'}
                label="File Contents"
                variant="outlined"
                // inputRef={register}
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
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <ActionBar /> */}
      {/* ); } */}
    </React.Fragment>
  );
}

export default ModifyFile;
