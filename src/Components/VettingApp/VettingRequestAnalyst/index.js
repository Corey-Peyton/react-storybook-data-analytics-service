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
  AppBar,
  StepLabel,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ResearcherInfo from '../CommonComponents/RequestForm/ResearcherInfo';
import FilesList from '../CommonComponents/RequestForm/FilesList';
import ResidualDisclosure from '../CommonComponents/RequestForm/ResidualDisclosure';
import AdditionalInfo from '../CommonComponents/RequestForm/Additionalnfo';
import RequestToolbar from '../CommonComponents/RequestToolbar';
// import ToolBarAssign from './ToolBarAssign';
import AppBarAssign from './AppBarAssign';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import FloatingSupportButton from '../CommonComponents/Support';
import CutCopyPasteAlert from '../CommonComponents/CutCopyPasteAlert';
import {
  SnackbarAssignLead,
  SnackbarSubmitRequest,
  SnackbarUnassign,
} from '../CommonComponents/Snackbars';
import ManageTeamDrawer from '../Dashboard/Common/ManageTeamDrawer';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
      },
      '& .MuiInputBase-input': {
        'max-height': 130,
        'overflow': 'hidden auto !important',
      },
      '& .MuiAutocomplete-endAdornment': {
        top: '5.5px',
      },
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
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  appBar: {
    margin: theme.spacing(0, -2),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
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
  dialogActions: {
    padding: theme.spacing(0, 3, 3, 3),
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
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });
  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  const classes = useStyles();
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

  const [openSnackbar, setOpenSnackbar] = React.useState({
    snackbarSubmitted: false,
    snackBarUnassign: false,
    snackBarAssign: false,
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
        <Container maxWidth="xl" className="page-container">
          <ManageTeamDrawer
            open={open.manageTeamDrawer}
            clickHandler={toggleManageTeamDrawer}
            toggleManageTeamDrawer={toggleManageTeamDrawer}
          />
          <AppBar position="static" className={classes.appBar} color="default">
            {/* {state.lead === state.userName ? ( */}
            <RequestToolbar
              role="analyst"
              status="submitted"
              assignees={{
                lead: 'Tony Stark',
                support: ['Bruce Banner'],
              }}
            />
            {/* ) : ( */}
            {/* <ToolBarAssign handleAssignToMe={handleAssignToMe} /> */}
            {/* )} */}
            <SnackbarUnassign
              open={openSnackbar.snackBarUnassign}
              handleClose={() => snackbarHandleClose('snackBarUnassign')}
            />
            <SnackbarAssignLead
              open={openSnackbar.snackBarAssign}
              handleClose={() => snackbarHandleClose('snackBarAssign')}
            />
          </AppBar>
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <AppBarAssign
                title={state.title}
                lead={state.lead}
                support={state.support}
                toggleManageTeamDrawer={toggleManageTeamDrawer}
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
                    onClick={() => snackbarHandleClick('snackbarSubmitted')}
                  >
                    Submit request
                  </Button>
                  <SnackbarSubmitRequest
                    open={openSnackbar.snackbarSubmitted}
                    handleClose={() => snackbarHandleClose('snackbarSubmitted')}
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
    </>
  );
}
export default VettingRequestAnalyst;
