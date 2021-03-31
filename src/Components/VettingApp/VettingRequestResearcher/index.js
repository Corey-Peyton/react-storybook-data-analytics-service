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
  },
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  dividercutcopypaste: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  dividerHeight: {
    height: theme.spacing(5),
    marginTop: theme.spacing(1.25),
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
  statusRight: {
    padding: theme.spacing(0.5, 2),
    paddingRight: theme.spacing(0),
  },
  statusLeft: {
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    alignItems: 'center',
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
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in state.completed)) :
        state.activeStep + 1;
    setState({...state, activeStep: newActiveStep});
  };

  const handleBack = () => {
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
        return <FilesList />;
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
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item className={classes.title}>
                <Typography variant="subtitle1" component="p">
                  Vetting request · ID 0101-000000
                </Typography>
                <Typography variant="h6" component="h1">
                  {state.title}
                </Typography>
              </Grid>
              <Divider />
              <Grid item>
                <div className={classes.statusLeft}>
                  <Icon path={mdiFileEditOutline} size={1} />
                  <Typography variant="body2" className={classes.icongrey}>
                    Draft
                  </Typography>
                </div>
              </Grid>
              <Divider
                className={classes.dividerHeight}
                orientation="vertical"
                flexItem
              />
              <Grid item>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.statusRight}
                >
                  Unassigned
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
                        {state.errors[index]} errors
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
          <FloatingSupportButton />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default VettingRequestResearcher;
