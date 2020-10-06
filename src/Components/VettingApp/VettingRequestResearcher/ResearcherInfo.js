import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Divider,
  Link,
} from '@material-ui/core';
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
    'display': 'flex',
    'alignItems': 'center',
    '& svg': {
      paddingLeft: theme.spacing(1),
    },
  },
  pt0: {
    paddingTop: [0, '!important'],
  },
}));

function ResearcherInfo(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography>
        Vetting disclosure requests are required by Statistics Canada’s to
        ensure data protection. Disclosure analysts will review all external
        users vetting requests for accessing to confidential microdata. These
        vetting requests are subject to a risk-based assessment of potential
        disclosure based on established rules and procedures. For more
        information please visit the “
        <Link href="#">Vetting guidelines website</Link>.”
      </Typography>
      <Divider className={classes.divider} />
      <Typography className="mb-2" variant="subtitle2">
        Items marked with asterisk (*) are required.
      </Typography>
      <Typography component="h2" variant="h6">
        Project information
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="project"
            name="project"
            label="Project title"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            // error={!!errors.project}
            // helperText={errors.project?.message}
            className={classes.inputMargin}
          />
          <TextField
            id="contract"
            name="contract"
            label="Contract number"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            // error={!!errors.contract}
            // helperText={errors.contract?.message}
            className={classes.inputMargin}
          />
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            // error={!!errors.outputFilesFolder}
            className={classes.inputMargin}
          >
            <InputLabel id="outputFilesFolder-label">Output folder</InputLabel>
            {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
            <Select
              id="outputFilesFolder"
              label="Output folder *"
              labelId="outputFilesFolder-label"
              // onChange={(e) => handleFileChange(e, onChange)}
              // value={value}
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
              {/* {fileLocations.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))
                  } */}
            </Select>
            {/* )}
                    name="outputFilesFolder"
                    // control={control}
                    // rules={{ required: requiredErrorMessage }} */}
            {/* /> */}
            {/* <FormHelperText>{errors.outputFilesFolder?.message}</FormHelperText> */}
          </FormControl>
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            // error={!!errors.supportingFilesFolder}
            // disabled={fileDisabled}
            className={classes.inputMargin}
          >
            <InputLabel id="supportingFilesFolder-label">
              Supporting folder
            </InputLabel>
            {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
            <Select
              id="supportingFilesFolder"
              label="Supporting folder *"
              labelId="supportingFilesFolder-label"
              // onChange={onChange}
              // value={value}
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
              {/* {fileLocations.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))
                  } */}
            </Select>
            {/* )}
                      name="supportingFilesFolder"
                      // control={control}
                      // rules={{required: requiredErrorMessage}}
                    /> */}
            {/* <FormHelperText>{errors.supportingFilesFolder?.message}</FormHelperText> */}
          </FormControl>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6">
        Basic information
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="first-name"
            name="first-name"
            label="First name"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            // error={!!errors.name}
            // helperText={errors.name?.message}
            defaultValue="Rose"
            className={classes.inputMargin}
            InputProps={{readOnly: true}}
          />
          <TextField
            id="last-name"
            name="last-name"
            label="Last name"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            // error={!!errors.name}
            // helperText={errors.name?.message}
            defaultValue="Temple"
            className={classes.inputMargin}
            InputProps={{readOnly: true}}
          />
          <TextField
            id="date"
            name="date"
            label="Date"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            // error={!!errors.date}
            // helperText={errors.date?.message}
            defaultValue="Aug. 28, 2020"
            InputProps={{readOnly: true}}
            className={classes.inputMargin}
          />
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            // inputRef={register({required: requiredErrorMessage})}
            required
            fullWidth
            margin="dense"
            InputProps={{readOnly: true}}
            defaultValue="rose_temple"
            // error={!!errors.username}
            // helperText={errors.username?.message}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" gutterBottom={true}>
        Additional information
      </Typography>
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2" gutterBottom={true}>
          Please consider the following guidelines:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Check your output against the vetting guidelines.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" gutterBottom={true}>
              Delete values you do not need released at this time.
            </Typography>
          </li>
        </ul>
        <Typography variant="subtitle2">
          A completed request form will be stored as part of the request record.
        </Typography>
      </div>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
        // error={!!errors.consistentOutput}
      >
        <FormLabel component="legend">
          Is the requested output consistent with the approved proposal for this
          project?
        </FormLabel>
        {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
        <RadioGroup
          id="consistentOutput"
          // onChange={onChange}
          // value={value}
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
        {/* )} */}
        {/* name="consistentOutput"
              // control={control}
              // rules={{ required: requiredErrorMessage }}
            /> */}
        {/* <FormHelperText>{errors.consistentOutput?.message}</FormHelperText> */}
      </FormControl>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
        // error={!!errors.vettingRules}
      >
        <FormLabel component="legend">
          Have you checked the vetting rules to determine if there are
          geographical, institutional, household size and/or population
          requirements for your output?
        </FormLabel>
        {/* <Controller
              render={({onBlur, onChange, value}) => ( */}
        <RadioGroup
          id="vettingRules"
          // onChange={onChange}
          // value={value}
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
        {/* )}
              name="vettingRules"
              // control={control}
              // rules={{ required: requiredErrorMessage }}
            /> */}
        {/* <FormHelperText>{errors.vettingRules?.message}</FormHelperText> */}
      </FormControl>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
        // error={!!errors.finalOutput}
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          Is the requested output your final output?
          <Tooltip
            title="If no, future vetting release requests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst."
            arrow
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </FormLabel>
        {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
        <RadioGroup
          id="finalOutput"
          // onChange={onChange}
          // value={value}
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
        {/* )}
                      name="finalOutput"
                      // control={control}
                      // rules={{ required: requiredErrorMessage }}
                    /> */}
        {/* <FormHelperText>{errors.finalOutput?.message}</FormHelperText> */}
      </FormControl>
      {/* <ActionBar
                    navigationNextCaption={
                      state.requestFormData.tabsDisabled ? "Next section" : "Submit"
                    }
                  /> */}
    </React.Fragment>
  );
}
export default ResearcherInfo;
