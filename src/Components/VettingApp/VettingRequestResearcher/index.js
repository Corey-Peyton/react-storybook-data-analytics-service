import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Paper,
  Container,
  Grid,
  Button,
  Step,
  Stepper,
  StepButton,
  Typography,
  Divider,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ResearcherInfo from './ResearcherInfo';
import FilesList from './FilesList';
import ResidualDisclosure from './ResidualDisclosure';
import AdditionalInfo from './AdditionalInfo';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  paper: {
    maxWidth: '1280px',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing(3),
  },
  stepperContainer: {
    'display': 'flex',
    '& .MuiStepper-root': {
      flexGrow: 1,
      padding: 0,
    },
  },
  stepperNextBtn: {
    marginLeft: theme.spacing(6),
  },
  stepperBackBtn: {
    marginRight: theme.spacing(6),
  },
  navButtons: {
    paddingTop: theme.spacing(3),
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: theme.palette.grey[600],
  },
  deleteBtn: {
    color: theme.palette.error.main,
  },
}));

function getSteps() {
  return ['Researcher information', 'Files list request', 'Residual disclosure', 'Additional information'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ResearcherInfo />;
    case 1:
      return <FilesList />;
    case 2:
      return <ResidualDisclosure />;
    case 3:
      return <AdditionalInfo />;
    default:
      return 'Unknown step';
  }
}

function VettingRequestResearcher(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <main className={classes.main} tabIndex="-1">
      <Container maxWidth="xl" className="page-container">
        <Paper className={classes.paper}>
          <Divider className={classes.divider} />
          <div className={classes.stepperContainer}>
            {activeStep !== 0 && (
              <Button
                onClick={handleBack}
                className={classes.stepperBackBtn}
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            )}
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {activeStep !== getSteps().length - 1 && (
              <Button
                onClick={handleNext}
                className={classes.stepperNextBtn}
                endIcon={<ArrowForwardIosIcon />}
              >
                Next
              </Button>
            )}
          </div>
          <Divider className={classes.divider} />
          <div>
            {allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Grid container justify="center" className="mb-4">
                  <Grid item xs={6}>
                    {getStepContent(activeStep)}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
          <Grid
            container
            justify={activeStep === 0 ? 'flex-end' : 'space-between'}
            className={classes.navButtons}
          >
            {activeStep !== 0 && (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Back
                </Button>
              </Grid>
            )}
            {activeStep === getSteps().length - 1 ? (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Send request
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Next
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </main>
  );
}
export default VettingRequestResearcher;
