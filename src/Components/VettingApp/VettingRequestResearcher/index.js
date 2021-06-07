import React from 'react';
import clsx from 'clsx';
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
import Icon from '@mdi/react';
import {mdiFileEditOutline} from '@mdi/js';
import ResearcherInfo from '../CommonComponents/RequestForm/ResearcherInfo';
import FilesList from '../CommonComponents/RequestForm/FilesList';
import ResidualDisclosure from '../CommonComponents/RequestForm/ResidualDisclosure';
import AdditionalInfo from '../CommonComponents/RequestForm/Additionalnfo';
import FloatingSupportButton from '../CommonComponents/Support';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import CutCopyPasteAlert from '../CommonComponents/CutCopyPasteAlert';
import {SnackbarSubmitRequest} from '../CommonComponents/Snackbars';
import RequestToolbar from '../CommonComponents/RequestToolbar';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
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
  icongrey: {
    marginLeft: theme.spacing(1),
  },
  assigneeContainer: {
    padding: theme.spacing(0, 0, 0, 2),
  },
  statusContainer: {
    padding: theme.spacing(0, 2, 0, 0),
    //What is all this for (This can be deleted)
    //display: 'flex',
    //flexDirection: 'column',
    //alignItems: 'flex-start',
    //[theme.breakpoints.down('sm')]: {
      //paddingLeft: 0,
    //},
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
    borderTopColor: theme.palette.divider,
  },
  errorMsg: {
    margin: 0,
    textAlign: 'left',
  },
  gridDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      marginTop: theme.spacing(3),
    },
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    height: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
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

function VettingRequestResearcher(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    open: false,
    errors: [0, 4, 0, 0],
    title: 'Untitled request',
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

  const snackbarhandleClose = () => {
    setOpenSnackbar(false);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ResearcherInfo
            handleTitleChange={handleTitleChange}
            handleFieldOnBlur={handleFieldOnBlur}
            title={state.title}
          />
        );
      case 1:
        return <FilesList role="researcher" />;
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

  const handleFieldOnBlur = (e) => {
    const defaultTitle = 'Untitled request';

    if (e.target.value === '') {
      // if field is empty, set field to "untitled request"
      setState({
        ...state,
        title: function() {
          return defaultTitle;
        },
      });
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
          <RequestToolbar
            role="researcher"
            status="draft"
            assignees={{
              lead: '',
              support: [],
            }}
          />
          <Paper variant="outlined" className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item className={classes.title} md={5} xs={12}>
                <Typography variant="caption" component="p">
                  Project 20-SSH-UTO-1111 · Request 0101-000000
                </Typography>
                <Typography variant="h5" component="h1">
                  {state.title}
                </Typography>
              </Grid>
              <Grid item md={7} xs={12} className={classes.gridDetails}>
                <Grid item className={classes.alignCenter}>
                  <div className={classes.statusContainer}>
                    <Typography variant="caption" component="p">Status</Typography>
                    <Grid
                      className={clsx(classes.alignCenter, classes.details)}
                    >
                      <Icon path={mdiFileEditOutline} size={1} />
                      <Typography variant="body2"  component="p" className={classes.icongrey}>
                        Draft
                      </Typography>
                    </Grid>
                  </div>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.assignee}>
                  <div className={classes.assigneeContainer}>
                    <Typography variant="caption" component="p">Assignee</Typography>
                    <div className={classes.details}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.details}
                      >
                        Unassigned
                      </Typography>
                    </div>
                  </div>
                </Grid>
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
            <Grid
              container
              justify={state.activeStep === 0 ? 'flex-end' : 'space-between'}
              className={classes.navButtons}
            >
              {state.activeStep !== 0 && (
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
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
                    className={classes.button}
                    onClick={handleClick}
                  >
                    Submit request
                  </Button>
                  <SnackbarSubmitRequest
                    open={openSnackbar}
                    handleClose={snackbarhandleClose}
                  />
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleComplete}
                  >
                    Next
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
          <FloatingSupportButton form />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default VettingRequestResearcher;
