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
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Icon from '@mdi/react';
import {mdiInboxArrowDown, mdiFileEditOutline} from '@mdi/js';
import ResearcherInfo from '../CommonComponents/RequestForm/ResearcherInfo';
import FilesList from '../CommonComponents/RequestForm/FilesList';
import ResidualDisclosure from '../CommonComponents/RequestForm/ResidualDisclosure';
import AdditionalInfo from '../CommonComponents/RequestForm/Additionalnfo';
import ToolBarDelete from './ToolBarDelete';
import ToolBar from './ToolBar';
import FloatingSupportButton from '../CommonComponents/Support';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import CutCopyPasteAlert from '../CommonComponents/CutCopyPasteAlert';
import CloseIcon from '@material-ui/icons/Close';
import {DialogAnalyst} from '../CommonComponents/DialogBox';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
  },
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
  headerBtn: {
    marginLeft: theme.spacing(3),
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
    color: theme.palette.grey[600],
    fill: theme.palette.grey[600],
  },
  statusRight: {
    padding: theme.spacing(0.5, 2),
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider,
  },
  statusLeft: {
    padding: theme.spacing(0.5, 2),
    display: 'flex',
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
  dialogFooter: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  deleteBtn: {
    color: theme.palette.error.main,
  },
  dialogActions: {
    padding: theme.spacing(0, 3, 3, 3),
  },
  errorMsg: {
    margin: [0, '!important'],
    textAlign: 'left',
  },
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
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

  function status() {
    if (state.activeStep === 3) {
      return (
        <>
          <Grid item>
            <div className={classes.statusLeft}>
              <Icon path={mdiInboxArrowDown} size={1} />
              <Typography className={classes.icongrey}>Submitted</Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.statusRight}>
              <Typography color="textSecondary">Unassigned</Typography>
            </div>
          </Grid>
        </>
      );
    } else if (state.activeStep === 0 || state.activeStep === 1) {
      return (
        <>
          <Grid item>
            <div className={classes.statusLeft}>
              <Icon path={mdiInboxArrowDown} size={1} />
              <Typography className={classes.icongrey}>Submitted</Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.statusRight}>
              <Chip
                label="Tony Stark"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDialog('info', e);
                }}
              />
            </div>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item>
            <div className={classes.statusLeft}>
              <Icon path={mdiFileEditOutline} size={1} />{' '}
              <Typography className={classes.icongrey}>Draft</Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.statusRight}>
              <Chip
                label="Tony Stark"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDialog('info', e);
                }}
              />
            </div>
          </Grid>
        </>
      );
    }
  }

  const [open, setOpen] = React.useState({
    info: false,
    deleteDialog: false,
  });

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

  function toggleDialog(value, e, role) {
    e.stopPropagation();
    if (value === 'info') {
      setOpen({...open, info: !open.info, role: role});
    }
  }

  return (
    <React.Fragment>
      <Header />
      <main className={classes.main} tabIndex="-1">
        <Container maxWidth={false} className="page-container">
          <DialogAnalyst
            open={open.info}
            toggleDialog={(e) => toggleDialog('info', e, open.role)}
            header="Assignee details"
          />
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
                <Typography variant="subtitle1" component="p">
                  Vetting request · ID 0101-000000
                </Typography>
                <Typography variant="h6" component="h1">
                  {state.title}
                </Typography>
              </Grid>
              {status()}
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
          className={classes.root}
          disableBackdropClick
          scroll="paper"
        >
          <DialogTitle id="alert-dialog-title">
            <div className={classes.vettingContainerTitle}>
              Delete vetting request
              <IconButton onClick={handleDialogClose} edge="end">
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className={classes.vettingSection}>
              <div className={classes.vettingRow}>
                <div className={classes.vettingColumn}>
                  <Typography variant="body2">{`Are you sure you want to delete the Vetting disclosure request "${state.title}"?`}</Typography>
                </div>
              </div>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions className={classes.dialogFooter}>
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
              className={classes.footerBtns}
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
