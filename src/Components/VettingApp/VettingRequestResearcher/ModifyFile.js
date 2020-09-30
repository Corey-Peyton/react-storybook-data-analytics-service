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
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  emphasisBox: {
    background: '#ECEEF1',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tooltipLabel: {
    'display': 'flex',
    'alignItems': 'center',
    '& svg': {
      paddingLeft: theme.spacing(1),
    },
  },
}));

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
            classname={classes.inputMargin}
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
            classname={classes.inputMargin}
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
            classname={classes.inputMargin}
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
            classname={classes.inputMargin}
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
              // options={outputMethodsTerms}
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
          {/* {watchFields['outputFiles[' + index + '].outputMethod'] ===
                  '6.Other' && ( */}
          {/* <TextField
            classname={classes.inputMargin}
            margin="dense"
            id="outputMethodDescription"
            // name={
            //   'outputFiles[' + index + '].outputMethodDescription'
            // }
            label="Description of output Method"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].outputMethodDescription
            //     ? true
            //     : false
            // }
            // helperText={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].outputMethodDescription
            //     ? errors.outputFiles[index].outputMethodDescription
            //         .message
            //     : ''
            // }
            required
            fullWidth
            multiline
          /> */}
          {/* )} */}
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
              row
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
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
                  row
                >
                  <FormControlLabel
                    value="Scaled"
                    control={<Radio />}
                    label="Scaled"
                  />
                  <FormControlLabel
                    value="Normalized"
                    control={<Radio />}
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
          <Typography variant="subtitle2" className="mb-2">Output supporting files</Typography>
          <FormControl
            component="fieldset"
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
              row
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
              />
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="N/A"
              />
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
          {/* {watchFields["outputFiles[" + index + "].linkedData"] ===
                  "Yes" && ( */}
          {/* <TextField
            id="linkedDataDescription"
            // name={"outputFiles[" + index + "].linkedDataDescription"}
            label="Describe how linkage was done"
            variant="outlined"
            // inputRef={register({ required: requiredErrorMessage })}
            // error={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].linkedDataDescription
            //     ? true
            //     : false
            // }
            // helperText={
            //   errors.outputFiles &&
            //   errors.outputFiles[index].linkedDataDescription
            //     ? errors.outputFiles[index].linkedDataDescription
            //         .message
            //     : "Examples: person-based, record-based, matching geographies"
            // }
            required
            fullWidth
            multiline
          /> */}
          {/* )} */}
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
                  values included?
              <Tooltip
                title="If yes, check the vetting guidelines and requirements for these kinds of variables. Consult your analyst if needed."
                arrow
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
              row
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="NA" control={<Radio />} label="N/A" />
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
              row
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
              />
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="N/A"
              />
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
          {/* {watchFields["outputFiles[" + index + "].descriptiveStats"] ===
                  "Yes" && ( */}
              <>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    // error={
                    //   errors.outputFiles &&
                    //   errors.outputFiles[index].outputLabelled
                    //     ? true
                    //     : false
                    // }
                    required
                  >
                    <FormLabel component="legend">
                      Is the output clearly labelled (tables have a title and
                      every variable and category is labelled)?
                    </FormLabel>
                    {/* <Controller
                          render={({ onBlur, onChange, value }) => ( */}
                    <RadioGroup
                      id="outputLabelled"
                      // onChange={onChange}
                      // value={value}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* )} name={"outputFiles[" + index + "].outputLabelled"}
                      control={control}
                      rules={{ required: requiredErrorMessage }}
                      /> */}
                    <FormHelperText>
                      {/* {errors.outputFiles &&
                        errors.outputFiles[index].outputLabelled
                          ? errors.outputFiles[index].outputLabelled.message
                          : ""} */}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    // error={
                    //   errors.outputFiles &&
                    //   errors.outputFiles[index].minCellSize
                    //     ? true
                    //     : false
                    // }
                    required
                  >
                    <FormLabel component="legend">
                      Are minimum cell sizes met as per the rules for the data?
                    </FormLabel>
                    {/* <Controller
                        render={({ onBlur, onChange, value }) => ( */}
                    <RadioGroup
                      id="minCellSize"
                      // onChange={onChange}
                      // value={value}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* )} name={"outputFiles[" + index + "].minCellSize"}
                      control={control}
                      rules={{ required: requiredErrorMessage }}
                      /> */}
                    <FormHelperText>
                      {/* {errors.outputFiles &&
                        errors.outputFiles[index].minCellSize
                          ? errors.outputFiles[index].minCellSize.message
                          : ""} */}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </>
              {/* )} */}
              <FormControl
                component="fieldset"
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].equivalentDescriptiveStats
                //     ? true
                //     : false
                // }
              >
                <FormLabel component="legend">
                  Does this request include model output or graphs that are
                  equivalent to a descriptive statistics?
                  <Tooltip
                    title="Examples: a model with a single independant variable, a model with all possible interactions, histograms"
                    arrow
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
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel value="NA" control={<Radio />} label="N/A" />
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
                component="fieldset"
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].modifiedWeights
                //     ? true
                //     : false
                // }
              >
                <FormLabel component="legend">
                    Did you apply modified (e.g. standardized) weights in the
                    analysis?
                  <Tooltip
                    title="If yes, consult with your analyst about the vetting rules for modified weights."
                    arrow
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
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value="NA"
                    control={<Radio />}
                    label="N/A"
                  />
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
              {/* {watchFields["outputFiles[" + index + "].modifiedWeights"] ===
                  "Yes" && ( */}
              <TextField
                id="modifiedWeightsDescription"
                // name={
                //   "outputFiles[" + index + "].modifiedWeightsDescription"
                // }
                label="Describe why and how the weights were modified"
                variant="outlined"
                // inputRef={register({ required: requiredErrorMessage })}
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].modifiedWeightsDescription
                //     ? true
                //     : false
                // }
                // helperText={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].modifiedWeightsDescription
                //     ? errors.outputFiles[index].modifiedWeightsDescription
                //         .message
                //     : ""
                // }
                required
                fullWidth
                multiline
              />
              {/* )} */}
              <FormControl
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
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value="NA"
                    control={<Radio />}
                    label="N/A"
                  />
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
              {/* {watchFields["outputFiles[" + index + "].includeMatrix"] ===
                  "Yes" && ( */}
              <>
                  <FormControl
                    component="fieldset"
                    // error={
                    //   errors.outputFiles &&
                    //   errors.outputFiles[index].continuousVariables
                    //     ? true
                    //     : false
                    // }
                    required
                  >
                    <FormLabel component="legend">
                      Does the matrix include continuous variables?
                    </FormLabel>
                    {/* <Controller
                          render={({ onBlur, onChange, value }) => ( */}
                    <RadioGroup
                      id="continuousVariables"
                      // onChange={(e) =>
                      //   handleMandatoryChange(
                      //     e,
                      //     "Yes",
                      //     ["unweighted sample size"],
                      //     onChange
                      //   )
                      // }
                      // value={value}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* )} name={"outputFiles[" + index + "].continuousVariables"}
                      control={control}
                      rules={{ required: requiredErrorMessage }}
                      /> */}
                    <FormHelperText>
                      {/* {errors.outputFiles &&
                        errors.outputFiles[index].continuousVariables
                          ? errors.outputFiles[index].continuousVariables
                              .message
                          : ""} */}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    component="fieldset"
                    // error={
                    //   errors.outputFiles &&
                    //   errors.outputFiles[index].dichotomousVariables
                    //     ? true
                    //     : false
                    // }
                    required
                  >
                    <FormLabel component="legend">
                      Does the matrix inclue dichotomous variables?
                    </FormLabel>
                    {/* <Controller
                        render={({ onBlur, onChange, value }) => ( */}
                    <RadioGroup
                      id="dichotomousVariables"
                      // onChange={(e) =>
                      //   handleMandatoryChange(
                      //     e,
                      //     "Yes",
                      //     ["unweighted cross-tabulation table"],
                      //     onChange
                      //   )
                      // }
                      // value={value}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* )} name=
                      {"outputFiles[" + index + "].dichotomousVariables"}
                      control={control}
                      rules={{ required: requiredErrorMessage }}
                      /> */}
                    <FormHelperText>
                      {/* {errors.outputFiles &&
                        errors.outputFiles[index].dichotomousVariables
                          ? errors.outputFiles[index].dichotomousVariables
                              .message
                          : ""} */}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    component="fieldset"
                    // error={
                    //   errors.outputFiles &&
                    //   errors.outputFiles[index].correlatedVariables
                    //     ? true
                    //     : false
                    // }
                    required
                  >
                    <FormLabel component="legend">
                      Does the matrix include a dichotomous variable correlated
                      with a continuous variable
                    </FormLabel>
                    {/* <Controller
                        render={({ onBlur, onChange, value }) => ( */}
                    <RadioGroup
                      id="correlatedVariables"
                      // onChange={(e) =>
                      //   handleMandatoryChange(
                      //     e,
                      //     "Yes",
                      //     [
                      //       "unweighted sub-totals for the categories of the dichotomous variable correlated with a continuous variable",
                      //     ],
                      //     onChange
                      //   )
                      // }
                      // value={value}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* )} name={"outputFiles[" + index + "].correlatedVariables"}
                      control={control}
                      rules={{ required: requiredErrorMessage }}
                      /> */}
                    <FormHelperText>
                      {/* {errors.outputFiles &&
                        errors.outputFiles[index].correlatedVariables
                          ? errors.outputFiles[index].correlatedVariables
                              .message
                          : ""} */}
                    </FormHelperText>
                  </FormControl>
              </>
              {/* )} */}
              <FormControl
                component="fieldset"
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].roundingOutput
                //     ? true
                //     : false
                // }
              >
                <FormLabel component="legend">
                    Is rounding of output required for this vetting request?
                  <Tooltip
                    title="If yes, ensure that any forced rounding to zero is shown."
                    arrow
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
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value="NA"
                    control={<Radio />}
                    label="N/A"
                  />
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
              {/* {watchFields["outputFiles[" + index + "].roundingOutput"] ===
                  "Yes" && ( */}
              <TextField
                id="roundingOutputDescription"
                // name={
                //   "outputFiles[" + index + "].roundingOutputDescription"
                // }
                label="Describe the approach to rounding and rounding base"
                variant="outlined"
                // inputRef={register({ required: requiredErrorMessage })}
                // error={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].roundingOutputDescription
                //     ? true
                //     : false
                // }
                // helperText={
                //   errors.outputFiles &&
                //   errors.outputFiles[index].roundingOutputDescription
                //     ? errors.outputFiles[index].roundingOutputDescription
                //         .message
                //     : ""
                // }
                required
                fullWidth
                multiline
              />
              {/* )} */}
              {/* <RequestSupportingFilesList
                  control={control}
                  errors={errors}
                  mandatories={mandatories}
                  files={files}
                  index={index}
                /> */}
        </Grid>
      </Grid>
      {/* <ActionBar /> */}
      {/* ); } */}
    </React.Fragment>
  );
}

export default ModifyFile;
