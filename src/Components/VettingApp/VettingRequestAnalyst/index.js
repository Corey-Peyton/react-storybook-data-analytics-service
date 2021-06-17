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
  StepLabel,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ResearcherInfo from '../CommonComponents/RequestForm/ResearcherInfo';
import FilesList from '../CommonComponents/RequestForm/FilesList';
import ResidualDisclosure from '../CommonComponents/RequestForm/ResidualDisclosure';
import AdditionalInfo from '../CommonComponents/RequestForm/Additionalnfo';
import RequestToolbar from '../CommonComponents/RequestToolbar';
import AppBarAssign from './AppBarAssign';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import FloatingSupportButton from '../CommonComponents/Support';
import CutCopyPasteAlert from '../CommonComponents/CutCopyPasteAlert';
import {SnackbarSubmitRequest} from '../CommonComponents/Snackbars';
import ManageTeamDrawer from '../CommonComponents/ManageTeamDrawer';
import {DialogRequesterDetails} from '../CommonComponents/DialogBox';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7),
      paddingTop: theme.spacing(7),
    },
  },
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  dividercutcopypaste: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    maxWidth: '1280px',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing(6),
    marginTop: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
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
    borderTop: 'solid 1px',
    borderTopColor: theme.palette.divider,
  },
  errorMsg: {
    margin: 0,
    textAlign: 'left',
  },
}));

function getSteps() {
  return [
    'Request details',
    'Output details',
    'Residual disclosure',
    'Additional information',
  ];
}

function VettingRequestAnalyst(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
    dialogRequesterDetails: false,
  });
  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };

  const toggleRequesterDetails = () => {
    setOpen({...open, dialogRequesterDetails: !open.dialogRequesterDetails});
  };

  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    title: 'Untitled request',
    open: false,
    errors: [0, 4, 0, 0],
    userName: props.userName,
    lead: props.lead,
    support: props.support,
  });
  const prevStep = React.useRef(null);
  const nextStep = React.useRef(null);
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

  const getStepRef = (step) => {
    const activeStep = state.activeStep;
    if (activeStep === step + 1) {
      return prevStep;
    } else if (activeStep === step - 1) {
      return nextStep;
    } else {
      return null;
    }
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in state.completed)) :
        state.activeStep + 1;
    setState({...state, activeStep: newActiveStep});
    nextStep.current.focus();
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    const prevActiveStep = state.activeStep;
    setState({...state, activeStep: prevActiveStep - 1});
    prevStep.current.focus();
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

  const [openSnackbar, setOpenSnackbar] = React.useState({
    snackbarSubmitted: false,
  });

  const snackbarHandleClick = (state) => {
    setOpenSnackbar({...openSnackbar, [state]: true});
  };

  const snackbarHandleClose = (state) => {
    setOpenSnackbar({...openSnackbar, [state]: false});
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ResearcherInfo handleTitleChange={handleTitleChange} />;
      case 1:
        return <FilesList role="analyst" />;
      case 2:
        return <ResidualDisclosure />;
      case 3:
        return <AdditionalInfo />;
      default:
        return 'Unknown step';
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (title !== '') {
      setState({...state, title: e.target.value});
    } else {
      setState({...state, title: 'Untitled request'});
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
    <>
      <Header />
      <main className={classes.main} tabIndex="-1">
        <Container maxWidth={false} className={classes.pageContainer}>
          <RequestToolbar
            role="analyst"
            status="submitted"
            assignees={{
              lead: state.lead,
              support: state.support,
            }}
            toggleManageTeamDrawer={toggleManageTeamDrawer}
          />
          <Paper variant="outlined" className={classes.paper}>
            <Grid container alignItems="center">
              <AppBarAssign
                title={state.title}
                lead={state.lead}
                support={state.support}
                toggleManageTeamDrawer={toggleManageTeamDrawer}
                toggleRequesterDetails={toggleRequesterDetails}
              />
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
                        {state.errors[index]}{' '}
                        {state.errors[index] === 1 ? 'error' : 'errors'}
                      </Typography>
                    );
                  }
                  return (
                    <Step key={label} ref={getStepRef(index)} tabIndex="-1">
                      <StepButton
                        {...buttonProps}
                        onClick={handleStep(index)}
                        completed={state.completed[index]}
                      >
                        <StepLabel {...labelProps}>
                          <span className="screen-reader-text">{`Step ${index +
                            1}: `}</span>
                          {label}
                        </StepLabel>
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
            <Divider className={classes.dividercutcopypaste} />
            <CutCopyPasteAlert />
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
                      {getStepContent(state.activeStep)}
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
            <Grid container justify="center">
              <Grid item xs={6}>
                <Grid
                  container
                  justify="flex-end"
                  className={classes.navButtons}
                >
                  {state.activeStep !== 0 && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="mr-2"
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
                        onClick={() => snackbarHandleClick('snackbarSubmitted')}
                      >
                        Submit request
                      </Button>
                      <SnackbarSubmitRequest
                        open={openSnackbar.snackbarSubmitted}
                        handleClose={() =>
                          snackbarHandleClose('snackbarSubmitted')
                        }
                      />
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
            </Grid>
          </Paper>
          <FloatingSupportButton form />
        </Container>
      </main>
      <Footer />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <DialogRequesterDetails
        open={open.dialogRequesterDetails}
        toggleDialog={toggleRequesterDetails}
      />
    </>
  );
}
export default VettingRequestAnalyst;
