import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {
  Paper,
  Container,
  Grid,
  Button,
  Step,
  Stepper,
  StepButton,
  StepLabel,
  Typography,
  Divider,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SecurityGroup from './SecurityGroup';
import Header from './Header';
import Footer from '../VettingApp/CommonComponents/Footer';
import ProjectDetails from './ProjecDetails';
import VirtualMachine from './VirtualMachineDetails';
import SubmitToolbar from './SubmitToolbar';
import {FOOT_H, HEAD_H_XS} from '../../Theme/constants';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(8),
  },
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
    minHeight: `calc(105vh - ${HEAD_H_XS}px - ${FOOT_H}px)`,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  dividerHeight: {
    marginTop: theme.spacing(6),
  },
  paper: {
    maxWidth: '1280px',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    border: '1px solid',
    borderColor: theme.palette.divider,
  },
  title: {
    flexGrow: 1,
  },
  icongrey: {
    marginLeft: theme.spacing(1),
  },
  stepperContainer: {
    'display': 'flex',
    '& .MuiStepper-root': {
      flexGrow: 1,
      padding: 0,
    },
  },
  stepContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: theme.spacing(80),
  },
  stepperNextBtn: {
    marginLeft: theme.spacing(6),
  },
  stepperBackBtn: {
    marginRight: theme.spacing(2),
  },
  footerBtns: {
    width: '100%',
    maxWidth: theme.spacing(80),
    display: 'flex',
    justifyContent: 'flex-end',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: theme.palette.divider,
    paddingTop: theme.spacing(3),
  },
  errorMsg: {
    margin: 0,
    textAlign: 'left',
  },
}));

function getSteps() {
  return ['Security group', 'Project details', 'Virtual machine details'];
}

function PowerShell(props) {
  // window.onbeforeunload = () => '';
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    open: false,
    errors: [0, 1, 0, 0],
    title: 'New Request',
  });
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(state.completed).length;
  };

  const isLastStep = () => {
    return state.activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in state.completed)) :
        state.activeStep + 1;
    setState({...state, activeStep: newActiveStep});
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    const prevActiveStep = state.activeStep;
    setState({...state, activeStep: prevActiveStep - 1});
  };

  const handleStep = (step) => () => {
    setState({...state, activeStep: step});
  };

  const handleComplete = () => {
    const newCompleted = state.completed;
    newCompleted[state.activeStep] = true;
    setState({...state, completed: newCompleted});
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SecurityGroup title={state.title} />;
      case 1:
        return <ProjectDetails />;
      case 2:
        return <VirtualMachine />;
      default:
        return 'Unknown step';
    }
  };

  const handleReset = () => {
    setState({...state, activeStep: 0});
    setState({...state, completed: {}});
  };

  const isStepFailed = (step) => {
    return state.errors[step] !== 0;
  };

  return (
    <React.Fragment>
      <Header />
      <main className={classes.main} tabIndex="-1">
        <Container maxWidth={false} className={classes.pageContainer}>
          <SubmitToolbar />
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item className={classes.title}>
                <Typography variant="h6" component="h1">
                  {state.title}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <div className={classes.stepperContainer}>
              {state.activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  className={classes.stepperBackBtn}
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back
                </Button>
              )}
              <Stepper nonLinear activeStep={state.activeStep}>
                {steps.map((label, index) => {
                  const labelProps = {};
                  const buttonProps = {};
                  if (isStepFailed(index)) {
                    labelProps.error = true;
                    buttonProps.optional = (
                      <Typography
                        className={classes.errorMsg}
                        variant="body2"
                        color="error"
                      >
                        {state.errors[index]}
                        {state.errors[index] === 1 ? 'error' : 'errors'}
                      </Typography>
                    );
                  }
                  return (
                    <Step key={label}>
                      <StepButton
                        {...buttonProps}
                        onClick={handleStep(index)}
                        completed={state.completed[index]}
                      >
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              {state.activeStep !== getSteps().length - 1 && (
                <Button
                  onClick={handleNext}
                  className={classes.stepperNextBtn}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Next
                </Button>
              )}
            </div>
            <Divider className={classes.dividerHeight} />
            <div>
              {allStepsCompleted() ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div className={classes.stepContent}>
                  <Grid container justify="center">
                    <Grid className={classes.content}>
                      {getStepContent(state.activeStep)}
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
            <Grid container justify="center">
              <Grid className={classes.footerBtns} item>
                {state.activeStep !== 0 && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.stepperBackBtn}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </Grid>
                )}
                {state.activeStep === getSteps().length - 1 ? (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to="SuccessfulSubmission"
                    >
                      Submit
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      Next
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default PowerShell;
