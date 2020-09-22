import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Paper,
  Container,
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
  Button,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: theme.spacing(16.5),
    paddingRight: theme.spacing(16.5),
    background: theme.palette.grey[100],
  },
  paper: {
    padding: theme.spacing(3),
  },
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  guidelinesBox: {
    background: '#ECEEF1',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  deleteBtn: {
    color: theme.palette.error.main,
  },
}));

function VettingRequestResearcher(props) {
  const classes = useStyles();

  return (
    <main className={classes.main} tabIndex="-1">
      <Container maxWidth="xl" className="page-container">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Typography component="h2" variant="h6">
                    Basic information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        id="first-name"
                        name="first-name"
                        label="First Name"
                        variant="outlined"
                        // inputRef={register({required: requiredErrorMessage})}
                        required
                        fullWidth
                        margin="dense"
                        // error={!!errors.name}
                        // helperText={errors.name?.message}
                        className={classes.inputMargin}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="last-name"
                        name="last-name"
                        label="Last Name"
                        variant="outlined"
                        // inputRef={register({required: requiredErrorMessage})}
                        required
                        fullWidth
                        margin="dense"
                        // error={!!errors.name}
                        // helperText={errors.name?.message}
                        className={classes.inputMargin}
                      />
                    </Grid>
                  </Grid>
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
                    inputProps={{readOnly: true}}
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
                    // error={!!errors.username}
                    // helperText={errors.username?.message}
                  />
                  <Divider className={classes.divider} />
                  <Typography component="h2" variant="h6">
                    Project information
                  </Typography>
                  <TextField
                    id="project"
                    name="project"
                    label="Project Title"
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
                    label="Contract Number"
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
                    <InputLabel id="outputFilesFolder-label">
                      Output Folder Name
                    </InputLabel>
                    {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
                    <Select
                      id="outputFilesFolder"
                      label="Output Folder Name *"
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
                      Supporting Files Folder Name
                    </InputLabel>
                    {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
                    <Select
                      id="supportingFilesFolder"
                      label="Supporting Files Folder Name *"
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
                  <Divider className={classes.divider} />
                  <Typography component="h2" variant="h6" gutterBottom={true}>
                    Additional information
                  </Typography>
                  <div className={classes.guidelinesBox}>
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
                      A completed request form will be stored as part of the
                      request record.
                    </Typography>
                  </div>
                  <FormControl
                    component="fieldset"
                    required
                    className={classes.inputMargin}
                    // error={!!errors.consistentOutput}
                  >
                    <FormLabel component="legend">
                      Is the requested output consistent with the approved
                      proposal for this project?
                    </FormLabel>
                    {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
                    <RadioGroup
                      id="consistentOutput"
                      // onChange={onChange}
                      // value={value}
                      row
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
                      Have you checked the vetting rules to determine if there
                      are geographical, institutional, household size and/or
                      population requirements for your output?
                    </FormLabel>
                    {/* <Controller
              render={({onBlur, onChange, value}) => ( */}
                    <RadioGroup
                      id="vettingRules"
                      // onChange={onChange}
                      // value={value}
                      row
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
                    <FormLabel component="legend">
                      Is the requested output your final output?
                    </FormLabel>
                    <Tooltip
                      title="If no, future vetting release requests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your analyst."
                      arrow
                      placement="right"
                    >
                      <InfoIcon />
                    </Tooltip>
                    {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
                    <RadioGroup
                      id="finalOutput"
                      // onChange={onChange}
                      // value={value}
                      row
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
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                Next
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="button">Actions</Typography>
              <Grid container>
                <Grid item>
                  <IconButton aria-label="delete" className={classes.deleteBtn}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="submit">
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
export default VettingRequestResearcher;
