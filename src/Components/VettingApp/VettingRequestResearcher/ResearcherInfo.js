import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TextField,
  /* FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip, */
  Divider,
} from '@material-ui/core';
/* import InfoIcon from '@material-ui/icons/Info'; */

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
        Vetting of statistical output is required by Statistics Canada to ensure
        data protection. Statistics Canada Analysts will review all external
        users' vetting requests. These requests are subject to a risk-based
        assessment of potential disclosure based on established rules and
        procedures.
      </Typography>
      <Divider className={classes.divider} />
      <Typography className="mb-2" component="p" variant="subtitle2">
        Items marked with asterisk (*) are required.
      </Typography>
      <Typography component="h2" variant="h6">
        Requester details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="Firstname"
            name="Firstname"
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            label="First name"
            required
            // helperText="yrdy"
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Lastname"
            name="Lastname"
            label="Last name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            // defaultValue={props.title}
            className={classes.inputMargin}
            inputProps={{readOnly: true}}
            // helperText="yrdy"
          />
          <TextField
            id="Username"
            name="Username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            // defaultValue={props.title}
            className={classes.inputMargin}
            // helperText="yrdy"
            // value
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Role"
            name="Role"
            label="Role"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            value=""
            // helperText="yrdy"
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Email"
            name="Email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            value=""
            // helperText="yrdy"
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Phonenumber"
            name="Phone number"
            label="Phone number"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            value=""
            // helperText="yrdy"
            inputProps={{readOnly: true}}
          />
          <Typography component="h2" variant="h6" className="mt-1 mb-1">
            Request details
          </Typography>
          <TextField
            id="project"
            name="project"
            label="Project"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
          />
          {/* <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="outputFilesFolder-label">Output folder</InputLabel>
            <Select
              id="outputFilesFolder"
              label="Output folder *"
              labelId="outputFilesFolder-label"
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="supportingFilesFolder-label">
              Supporting folder
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
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6">
        Request details
      </Typography>
      {/* <Grid container spacing={1}>
        <Grid item xs={6}> */}
          <TextField
            id="RequestID"
            name="RequestID"
            label="Request ID"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Requestname"
            name="Requestname"
            label="Request name"
            variant="outlined"
            value={props.title}
            fullWidth
            onChange={props.handleTitleChange}
            error
            onBlur={props.handleFieldOnBlur}
            margin="dense"
            className={classes.inputMargin}
            helperText="Request name is required"
            // inputProps={{readOnly: true}}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.pt0}>
          <TextField
            id="Createdon"
            name="Createdon"
            label="Created on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
          />
          <TextField
            id="Updatedon"
            name="Updatedon"
            label="Updated on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
          />
        </Grid>
      </Grid>
      {/*  <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" gutterBottom={true}>
        Additional information
      </Typography>
      <div className={classes.emphasisBox}>
        <Typography variant="subtitle2" component="h3" gutterBottom={true}>
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
        <Typography variant="subtitle2" component="h3">
          A completed request form will be stored as part of the request record.
        </Typography>
      </div>
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
      >
        <FormLabel component="legend">
          Is the requested output consistent with the approved proposal for this
          project?
        </FormLabel>
        <RadioGroup id="consistentOutput">
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
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
      >
        <FormLabel component="legend">
          Have you checked the vetting rules to determine if there are
          geographical, institutional, household size and/or population
          requirements for your output?
        </FormLabel>
        <RadioGroup id="vettingRules">
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
      <FormControl
        component="fieldset"
        required
        className={classes.inputMargin}
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
        <RadioGroup id="finalOutput">
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
      </FormControl> */}
    </React.Fragment>
  );
}
export default ResearcherInfo;
