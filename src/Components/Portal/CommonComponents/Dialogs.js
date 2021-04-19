import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
  Divider,
  IconButton,
  Grid,
} from '@material-ui/core';
import {Drawer} from '../../CommonComponents/Drawer';
import {Dialog} from '../../CommonComponents/Dialog';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiEmail,
  mdiBookOpenPageVariant,
  mdiArrowLeft,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  helpDetails: {
    display: 'block',
  },
  additionalStepsAcc: {
    margin: [theme.spacing(0, 0, 0, 4), '!important'],
  },
}));

export function HelpDrawer(props) {
  const classes = useStyles();

  const content = () => (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="support-content"
          id="support-header"
        >
          <Typography component="h2" variant="subtitle1">
            Contact the support team
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            For general concerns and inquiries, please contact the support team
            for guidance. A team member will be happy to assist you.
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiEmail} size={1} />}
            // onClick={() => handleClickOpen('snackbarReactivate')}
          >
            Contact the support team
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="aaw-content"
          id="aaw-header"
        >
          <Typography component="h2" variant="subtitle1">
            Advanced Analytics Workspace (AAW)
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            Please consult the AAW user guide listed below if you encounter
            difficulties related to AAW-specific system components or tools. For
            general concerns and inquiries, please contact the support team for
            further assistance. A DAaaS team member will be happy to help you.
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiBookOpenPageVariant} size={1} />}
            // onClick={() => handleClickOpen('snackbarReactivate')}
          >
            User guide
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="cae-content"
          id="cae-header"
        >
          <Typography component="h2" variant="subtitle1">
            Collaborative Analytics Environment (CAE)
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            Please consult the CAE user guide listed below if you encounter
            difficulties related to CAE-specific system components or tools. For
            general concerns and inquiries, please contact the support team for
            further assistance. A DAaaS team member will be happy to help you.
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiBookOpenPageVariant} size={1} />}
            // onClick={() => handleClickOpen('snackbarReactivate')}
          >
            User guide
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );

  return (
    <Drawer
      open={props.open}
      title="Help"
      content={content()}
      primaryButton="Close"
      handlePrimaryClick={props.closeDrawer}
      toggleDrawer={props.closeDrawer}
    />
  );
}

export function FeedbackDialog(props) {
  const [state, setState] = React.useState({
    feedbackRating: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const content = () => (
    <>
      <Typography variant="body2" className="input-margin">
        Required fields are marked with an asterisk *.
      </Typography>
      <TextField
        className="input-margin"
        id="feedback"
        label="What would you like to tell us?"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        required
      />
      <FormControl component="fieldset" className="input-margin" required>
        <FormLabel component="legend">
          How has your experience been so far?
        </FormLabel>
        <RadioGroup
          id="feedbackRating"
          value={state.feedbackRating}
          name="feedbackRating"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Positive"
            control={<Radio color="primary" />}
            label="Positive"
          />
          <FormControlLabel
            value="Neutral"
            control={<Radio color="primary" />}
            label="Neutral"
          />
          <FormControlLabel
            value="Negative"
            control={<Radio color="primary" />}
            label="Negative"
          />
        </RadioGroup>
      </FormControl>
    </>
  );

  return (
    <Dialog
      id="feedback-dialog"
      open={props.open}
      title="Feedback"
      content={content()}
      primaryButton="Submit"
      secondaryButton="Cancel"
      handlePrimaryClick={props.toggleDialog}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function AccountDetailsDialog(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    accountIssuer: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const content = () => (
    <>
      <TextField
        className="input-margin"
        id="fname"
        label="First name"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <TextField
        className="input-margin"
        id="lname"
        label="Last name"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <TextField
        className="input-margin"
        id="organization"
        label="Organization"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <TextField
        className="input-margin"
        id="job-title"
        label="Job title"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <TextField
        className="input-margin"
        id="work-email"
        label="Work email"
        variant="outlined"
        fullWidth
        margin="dense"
        required
      />
      <Divider className="input-margin" />
      <FormControl component="fieldset" className="input-margin" required>
        <FormLabel component="legend">
          Who issued your Azure cloud account?
        </FormLabel>
        <RadioGroup
          id="accountIssuer"
          value={state.accountIssuer}
          name="accountIssuer"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Statistics Canada"
            control={<Radio color="primary" />}
            label="Statistics Canada"
          />
          <FormControlLabel
            value="Other organization"
            control={<Radio color="primary" />}
            label="Other organization"
          />
          {state.accountIssuer === 'Other organization' && (
            <TextField
              className="input-margin ml-4"
              id="organization"
              label="Organization"
              variant="outlined"
              margin="dense"
              required
            />
          )}
          <FormControlLabel
            value="I don't have an Azure cloud account"
            control={<Radio color="primary" />}
            label="I don't have an Azure cloud account"
          />
        </RadioGroup>
      </FormControl>
    </>
  );

  return (
    <Dialog
      id="account-details-dialog"
      open={props.open}
      title="Account details"
      content={content()}
      primaryButton="Next"
      secondaryButton="Cancel"
      handlePrimaryClick={props.handleNext}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function DataUseDialog(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    nonPublicData: null,
    useOwnData: null,
    publicMicrodata: false,
    summaryTables: false,
    customTabulations: false,
    other: false,
    confidential: false,
    public: false,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const content = () => (
    <>
      <FormControl className="radio-margin" component="fieldset" required>
        <FormLabel component="legend">
          Do you require access to Statistics Canada non-public data?
        </FormLabel>
        <RadioGroup
          id="nonPublicData"
          value={state.nonPublicData}
          name="nonPublicData"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          {state.nonPublicData === 'Yes' && (
            <div>
              <Accordion defaultExpanded className={classes.additionalStepsAcc}>
                <AccordionSummary
                  expandIcon={<Icon path={mdiChevronDown} size={1} />}
                  aria-controls="additional-steps-content"
                  id="additional-steps-header"
                >
                  <Typography variant="subtitle1">
                    Additional steps will be required after registration
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    For confidential microdata access, applicants will be asked
                    to submit a Project Application after submitting this
                    registration form. Once the Application is approved, they
                    will be asked to complete the Guidelines for data access.
                    Requests for this type of access will be assessed on a case
                    by case basis. Confidential microdata access may still be
                    accessed in a Research Data Centre or Federal Research Data
                    Centre. Please visit the Research Data Centre website for
                    more information.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      {state.nonPublicData === 'No' && (
        <FormControl component="fieldset" className="radio-margin" required>
          <FormLabel component="legend">
            What type of data do you need access to?
          </FormLabel>
          <FormHelperText>Select all that apply</FormHelperText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.publicMicrodata}
                  onChange={handleChbxChange}
                  name="publicMicrodata"
                  color="primary"
                />
              }
              label="Public microdata"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.summaryTables}
                  onChange={handleChbxChange}
                  name="summaryTables"
                  color="primary"
                />
              }
              label="Summary tables"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.customTabulations}
                  onChange={handleChbxChange}
                  name="customTabulations"
                  color="primary"
                />
              }
              label="Custom tabulations"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.other}
                  onChange={handleChbxChange}
                  name="other"
                  color="primary"
                />
              }
              label="Other"
            />
          </FormGroup>
        </FormControl>
      )}
      <FormControl className="radio-margin" component="fieldset" required>
        <FormLabel component="legend">
          Are you planning on using your own data?
        </FormLabel>
        <RadioGroup
          id="useOwnData"
          value={state.useOwnData}
          name="useOwnData"
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
      </FormControl>
      {state.useOwnData === 'Yes' && (
        <FormControl component="fieldset" className="radio-margin" required>
          <FormLabel component="legend">
            What type of data are you planning to use?
          </FormLabel>
          <FormHelperText>Select all that apply</FormHelperText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.confidential}
                  onChange={handleChbxChange}
                  name="confidential"
                  color="primary"
                />
              }
              label="Confidential"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.public}
                  onChange={handleChbxChange}
                  name="public"
                  color="primary"
                />
              }
              label="Public"
            />
          </FormGroup>
        </FormControl>
      )}
    </>
  );

  return (
    <Dialog
      id="data-use-dialog"
      open={props.open}
      title={
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              className="mr-1"
              aria-label="Back to account details"
              edge="start"
              onClick={props.handleBack}
            >
              <Icon path={mdiArrowLeft} size={1} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h6">
              Data use details
            </Typography>
          </Grid>
        </Grid>
      }
      content={content()}
      primaryButton="Next"
      secondaryButton="Cancel"
      handlePrimaryClick={props.handleNext}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}
