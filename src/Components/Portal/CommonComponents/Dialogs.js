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
  FormControlLabel,
  Radio,
  Divider,
} from '@material-ui/core';
import {Drawer} from '../../CommonComponents/Drawer';
import {Dialog} from '../../CommonComponents/Dialog';
import Icon from '@mdi/react';
import {mdiChevronDown, mdiEmail, mdiBookOpenPageVariant} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  helpDetails: {
    display: 'block',
  },
  divider: {
    margin: theme.spacing(1.5, 0),
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
          <Typography component="h2">Contact the support team</Typography>
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
          <Typography component="h2">
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
          <Typography component="h2">
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
      <div className="row">
        <Typography variant="body2">
          Required fields are marked with an asterisk *.
        </Typography>
      </div>
      <div className="row">
        <TextField
          id="feedback"
          label="What would you like to tell us?"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
        />
      </div>
      <div className="row">
        <FormControl component="fieldset" required>
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
      </div>
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
    cloudAccount: null,
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
      <div className="row">
        <TextField
          id="fname"
          label="First name"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />
      </div>
      <div className="row">
        <TextField
          id="lname"
          label="Last name"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />
      </div>
      <div className="row">
        <TextField
          id="organization"
          label="Organization"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />
      </div>
      <div className="row">
        <TextField
          id="job-title"
          label="Job title"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />
      </div>
      <div className="row">
        <TextField
          id="work-email"
          label="Work email"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />
      </div>
      <Divider className={classes.divider} />
      <div className="row">
        <FormControl component="fieldset" required>
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
            <FormControlLabel
              value="I don't have an Azure cloud account"
              control={<Radio color="primary" />}
              label="I don't have an Azure cloud account"
            />
          </RadioGroup>
        </FormControl>
      </div>
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
      handlePrimaryClick={props.handlePrimaryClick}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}
