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
  Chip,
  Tooltip,
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Icon from '@mdi/react';
import {mdiLockOpenVariant} from '@mdi/js';
import ResearcherInfo from './ResearcherInfo';
import FilesList from './FilesList';
import ResidualDisclosure from './ResidualDisclosure';
import AdditionalInfo from './AdditionalInfo';
import ToolBarDelete from './ToolBarDelete';
import ToolBar from './ToolBar';
import FloatingSupportButton from '../CommonComponents/Support';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import CutCopyPasteAlert from '../CommonComponents/CutCopyPasteAlert';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[300],
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  appBar: {
    margin: theme.spacing(0, -2),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
  paper: {
    maxWidth: '1280px',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing(3),
    borderRadius: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.grey[300],
  },
  title: {
    flexGrow: 1,
  },
  lockTooltip: {
    padding: theme.spacing(0.5, 2),
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider,
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
    'Researcher information',
    'Files list request',
    'Residual disclosure',
    'Additional information',
  ];
}

function VettingRequestResearcher(props) {
  const classes = useStyles();
  const {name, from} = (props.location && props.location.state) || {};
  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    open: false,
    errors: [1, 0, 0, 0],
    title: function() {
      if (from === '/vetting-app/dashboard-researcher') {
        return name.text;
      } else {
        return '';
      }
    },
  });
  const steps = getSteps();

  const handleDialogOpen = () => {
    setState({...state, open: true});
  };

  const handleDialogClose = () => {
    setState({...state, open: false});
  };

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

  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);

  const handleClickDelete = () => {
    setOpenSnackbarDelete(true);
  };

  const snackbardeletehandleClose = () => {
    setOpenSnackbarDelete(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ResearcherInfo
            handleTitleChange={handleTitleChange}
            title={state.title()}
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
    setState({
      ...state,
      title: function() {
        return title;
      },
    });
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
        <Container maxWidth={false} className="page-container">
          <AppBar position="static" className={classes.appBar} color="default">
            {state.activeStep === 3 ? (
              <ToolBarDelete handleDialogOpen={handleDialogOpen} />
            ) : (
              <ToolBar />
            )}
          </AppBar>
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item className={classes.title}>
                <Typography variant="h6" color="textSecondary">
                  Vetting request · ID 0101-000000
                </Typography>
                <Typography variant="h6" component="h2">
                  {state.title()}
                </Typography>
              </Grid>
              <Grid item>
                <Chip label="Draft" className="mr-2" />
              </Grid>
              <Grid item>
                <div className={classes.lockTooltip}>
                  <Tooltip title="This vetting request is unlocked and marked as “Draft.” You can either send or withdraw this vetting request.">
                    <Icon
                      path={mdiLockOpenVariant}
                      size={1}
                      className="icon-grey"
                    />
                  </Tooltip>
                </div>
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
                        {state.errors[index]} error
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
            <Divider className={classes.divider} />
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
                  <Snackbar
                    open={openSnackbar}
                    onClose={snackbarhandleClose}
                    autoHideDuration={6000}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Alert
                      onClose={snackbarhandleClose}
                      severity="success"
                      className={classes.alert}
                      variant="filled"
                    >
                      This vetting request has been already submitted. You will
                      be notified with any updates.
                    </Alert>
                  </Snackbar>
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

        <Dialog
          open={state.open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete vetting request
          </DialogTitle>
          <DialogContent className="pb-0">
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body2">{`Are you sure you want to delete the Vetting disclosure request "${state.title()}"?`}</Typography>
            </DialogContentText>
            <Divider className={classes.divider} />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={handleDialogClose}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="ml-2"
              onClick={() => {
                handleClickDelete();
                handleDialogClose();
              }}
            >
              Delete request
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbarDelete}
          onClose={snackbardeletehandleClose}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert
            onClose={snackbardeletehandleClose}
            severity="success"
            className={classes.alert}
            variant="filled"
          >
            Your request has been deleted
          </Alert>
        </Snackbar>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default VettingRequestResearcher;
