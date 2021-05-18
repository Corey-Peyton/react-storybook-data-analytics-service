import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Button,
  Step,
  Stepper,
  StepButton,
  Typography,
  StepLabel,
  Grid,
  FormControl,
  Card,
  CardContent,
  CardActions,
  TextField,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Drawer,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Icon from '@mdi/react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiInboxArrowDown} from '@mdi/js';
import {mdiFileDocumentOutline} from '@mdi/js';
import {ModifyFile} from '../../Components/VettingApp/CommonComponents/RequestForm/ModifyFile';
import {SnackbarUpdateOutputFile} from '../../Components/VettingApp/CommonComponents/Snackbars';
import AdditionalInfo from '../../Components/VettingApp/CommonComponents/RequestForm/Additionalnfo';
import Header from '../../Components/VettingApp/CommonComponents/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    '&legend.MuiFormLabel-root.Mui-error +.MuiFormGroup-root .MuiRadio-root': {
      color: theme.palette.primary.main,
    },
  },
  appBar: {
    margin: theme.spacing(0, -3),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    top: theme.spacing(8),
    left: 0,
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(7),
    },
  },
  gridContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  submitBtn: {
    width: '100px',
  },
  stepperContainer: {
    'display': 'flex',
    '& .MuiStepper-root': {
      flexGrow: 1,
      padding: 0,
    },
    'paddingTop': theme.spacing(8),
    'marginTop': theme.spacing(8),
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
  alert: {
    width: '100%',
  },
  errorText: {
    'color': theme.palette.error.main,
    '&.MuiLink-root': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  errorList: {
    paddingTop: theme.spacing(1),
  },
  card: {
    width: '100%',
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  cardActionsError: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.error.light,
  },
  cardError: {
    border: '1px solid',
    borderColor: theme.palette.error.light,
  },
  cardTitle: {
    marginTop: theme.spacing(0.25),
  },
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
  },
}));

const files = [
  {
    name:
      'Another file with even a longer name for users who likes to be really descriptive. Yes, believe it happens!',
    emptyFields: 2,
    error: true,
  },
  {
    name: 'Example output file card name',
    emptyFields: 3,
    error: true,
  },
];

function getSteps() {
  return [
    'Invalid form elements',
    'No output files',
    'Files details invalid',
    'Additional information',
  ];
}

export default {
  title: 'Organisms/Vetting/Errors',
  component: Stepper,
};

export const StepperErrors = (args) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    title: 'Untitled request',
    open: false,
    stepperErrors: [0, 0, 0, 0],
    name: {
      text: '',
      errorText: '',
      invalid: '',
    },
    editFile: false,
    snackbarUpdate: false,
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
    triggerErrors(newActiveStep);
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

  const isStepFailed = (step) => {
    return state.stepperErrors[step] !== 0;
  };

  const toggleDrawer = (e, drawer, val) => {
    setState({...state, [drawer]: val});
  };

  const handleClickOpen = (state) => {
    setState({...state, [state]: true});
  };

  const updateFile = () => {
    setState({
      ...state,
      snackbarUpdate: true,
      editFile: false,
      stepperErrors: [3, 1, 5, 0],
    });
  };

  const handleClickClose = () => {
    setState({...state, snackbarUpdate: false});
  };

  const triggerErrors = (step) => {
    switch (step) {
      case 0:
        setState({...state, activeStep: step});
        break;
      case 1:
        if (!Boolean(state.stepperErrors[step])) {
          setState({
            ...state,
            activeStep: step,
            stepperErrors: [3, 0, 0, 0],
            name: {
              ...state.name,
              errorText: 'This field is required',
            },
          });
        } else {
          setState({...state, activeStep: step});
        }
        break;
      case 2:
        if (!Boolean(state.stepperErrors[step])) {
          setState({
            ...state,
            activeStep: step,
            stepperErrors: [3, 1, 0, 0],
            name: {
              ...state.name,
              errorText: 'This field is required',
            },
          });
        } else {
          setState({...state, activeStep: step});
        }
        break;
      case 3:
        if (!Boolean(state.stepperErrors[step])) {
          setState({
            ...state,
            activeStep: step,
            stepperErrors: [3, 1, 5, 0],
            name: {
              ...state.name,
              errorText: 'This field is required',
            },
          });
        } else {
          setState({...state, activeStep: step});
        }
        break;
      default:
        setState({
          ...state,
          stepperErrors: [3, 1, 5, 0],
          name: {
            ...state.name,
            errorText: 'This field is required',
          },
        });
        return;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container>
              {Boolean(state.stepperErrors[0]) && (
                <Grid item className="row">
                  <Alert
                    severity="error"
                    className={clsx(classes.errorText, classes.alert)}
                  >
                    Please correct the following errors...
                    <ul className={classes.errorList}>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document.getElementById('name').focus();
                          }}
                        >
                          {`{Textfield} is required`}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document
                                .getElementById('variables-label')
                                .scrollIntoView({
                                  block: 'center',
                                });
                          }}
                        >
                          {`{Radio 1} is required`}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document
                                .getElementById('version-label')
                                .scrollIntoView({
                                  block: 'center',
                                });
                          }}
                        >
                          {`{Radio 2} is required`}
                        </Link>
                      </li>
                    </ul>
                  </Alert>
                </Grid>
              )}
              <Grid item className="row">
                <Typography>
                  Please provide some information about this request as well as
                  your output and supporting files.
                </Typography>
              </Grid>
              <Grid item xs={6} className="row">
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  margin="none"
                >
                  <TextField
                    id="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    label="Name"
                    required
                    error={Boolean(state.name.errorText)}
                    helperText={state.name.errorText}
                    margin="none"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" className="mb-2">
                  Residual disclosure
                </Typography>
              </Grid>
              <Grid item xs={12} className="row">
                <FormControl component="fieldset">
                  <FormLabel
                    id="variables-label"
                    component="legend"
                    className={classes.tooltipLabel}
                    required
                    error={Boolean(state.stepperErrors[0])}
                  >
                    For this request, have you subsetted any variables, where
                    one or more variables is a subset of another?
                  </FormLabel>
                  {Boolean(state.stepperErrors[0]) && (
                    <Typography color="error" variant="caption">
                      This field is required
                    </Typography>
                  )}
                  <RadioGroup id="subset" value={state.subset} name="subset">
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
              </Grid>
              <Grid item xs={12} className="row">
                <FormControl component="fieldset">
                  <FormLabel
                    id="version-label"
                    component="legend"
                    required
                    error={Boolean(state.stepperErrors[0])}
                  >
                    Has a version of this output, in part or in whole, been
                    previously released for this project?
                  </FormLabel>
                  {Boolean(state.stepperErrors[0]) && (
                    <Typography color="error" variant="caption">
                      This field is required
                    </Typography>
                  )}
                  <RadioGroup
                    id="versionpreviouslyReleased"
                    name="versionpreviouslyReleased"
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
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container alignItems="center" justify="space-between">
              {Boolean(state.stepperErrors[1]) && (
                <Grid item className="row">
                  <Alert
                    severity="error"
                    className={clsx(classes.errorText, classes.alert)}
                  >
                    Please correct the following errors...
                    <ul className={classes.errorList}>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document
                                .getElementById('output-file-label')
                                .scrollIntoView({
                                  block: 'center',
                                });
                          }}
                        >
                          At least one output file must be added
                        </Link>
                      </li>
                    </ul>
                  </Alert>
                </Grid>
              )}
              <Grid item className="row">
                <Typography>
                  Please provide some information about this request as well as
                  your output and supporting files.
                </Typography>
              </Grid>
              <Grid item className="row">
                <Grid item>
                  <Typography
                    variant="body1"
                    className={clsx({
                      [classes.errorText]: Boolean(state.stepperErrors[1]),
                    })}
                    id="output-file-label"
                  >
                    Output file*
                  </Typography>
                  <Typography
                    variant="body2"
                    className={clsx({
                      [classes.errorText]: Boolean(state.stepperErrors[1]),
                    })}
                  >
                    At least one file must be added
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Add file
                  </Button>
                </Grid>
              </Grid>
              <Grid className="row">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2"
                >
                  No output files
                </Typography>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid container>
              {Boolean(state.stepperErrors[2]) && (
                <Grid item className="row">
                  <Alert
                    severity="error"
                    className={clsx(classes.errorText, classes.alert)}
                  >
                    Please correct the following errors...
                    <ul className={classes.errorList}>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document.getElementById('card1').scrollIntoView({
                              block: 'center',
                            });
                          }}
                        >
                          {`{Cardname 1} has 2 errors`}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={classes.errorText}
                          onClick={() => {
                            document.getElementById('card2').scrollIntoView({
                              block: 'center',
                            });
                          }}
                        >
                          {`{Cardname 2} has 3 errors`}
                        </Link>
                      </li>
                    </ul>
                  </Alert>
                </Grid>
              )}
              <Grid item className="row">
                <Typography>
                  Please provide some information about this request as well as
                  your output and supporting files.
                </Typography>
              </Grid>
              <Grid item className="row">
                <Grid item>
                  <Typography variant="body1" id="output-file-label">
                    Output file*
                  </Typography>
                  <Typography variant="body2">
                    At least one file must be added
                  </Typography>
                </Grid>
              </Grid>
              {files.map((file, index) => {
                const num = index + 1;
                return (
                  <Grid item className="row" key={file.name}>
                    <Card
                      id={`card` + num}
                      className={clsx(classes.card, {
                        [classes.cardError]: file.error,
                      })}
                      variant="outlined"
                    >
                      <CardContent>
                        <Grid container wrap="nowrap" alignItems="flex-start">
                          <Grid item>
                            <Icon
                              className={classes.icon}
                              path={mdiFileDocumentOutline}
                              size={1}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="subtitle2"
                              component="h3"
                              className={classes.cardTitle}
                            >
                              {file.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <FileValidationAlert
                          emptyFields={file.emptyFields}
                          error={file.error}
                        />
                      </CardContent>
                      <CardActions
                        className={clsx({
                          [classes.cardActions]: file.error === false,
                          [classes.cardActionsError]: file.error === true,
                        })}
                      >
                        <Button
                          color="primary"
                          onClick={(e) => toggleDrawer(e, 'editFile', true)}
                        >
                          Edit
                        </Button>
                        <Button color="primary">Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        );
      case 3:
        return <AdditionalInfo />;
      default:
        return 'Unknown step';
    }
  };

  function FileValidationAlert(props) {
    const {emptyFields, error} = {...props};
    if (emptyFields > 0 && error) {
      return (
        <Alert className="mt-2" severity="error">
          {emptyFields} {emptyFields > 1 ? 'errors' : 'error'}
        </Alert>
      );
    } else if (emptyFields > 0 && !error) {
      return (
        <Alert severity="warning" className="mt-2">
          {emptyFields > 1 ?
            `There are ${emptyFields} remaining fields that must be filled before submitting.` :
            `There is ${emptyFields} remaining field that must be filled before submitting.`}
        </Alert>
      );
    } else if (emptyFields === 0) {
      return null;
    }
  }

  return (
    <div className={classes.root}>
      <Header />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <Grid
            container
            justify="space-between"
            className={classes.gridContainer}
          >
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="Back to dashboard"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="body2"
                component="span"
                className={classes.title}
              >
                Dashboard
              </Typography>
            </Grid>

            <Grid item className={classes.actions}>
              <Button
                className={classes.headerBtn}
                variant="contained"
                color="primary"
                startIcon={<Icon path={mdiInboxArrowDown} size={1} />}
                onClick={() => triggerErrors()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

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
                  {state.stepperErrors[index]}{' '}
                  {state.stepperErrors[index] === 1 ? 'error' : 'errors'}
                </Typography>
              );
            }
            return (
              <Step key={label} ref={getStepRef(index)} tabIndex="-1">
                <StepButton
                  {...buttonProps}
                  onClick={() => {
                    handleStep(index);
                    triggerErrors(index);
                  }}
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
      <div>
        <Grid container justify="center" className="mb-4 mt-4">
          <Grid item xs={6}>
            {getStepContent(state.activeStep)}
          </Grid>
        </Grid>
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
              // onClick={handleClick}
            >
              Submit request
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => triggerErrors(state.activeStep + 1)}
            >
              Next
            </Button>
          </Grid>
        )}
      </Grid>
      {/* Edit output file drawer */}
      <Drawer anchor="right" open={state.editFile} className={classes.drawer}>
        <ModifyFile
          toggleDrawer={toggleDrawer}
          updateFile={updateFile}
          handleClickOpen={handleClickOpen}
          errors={Boolean(state.stepperErrors[2])}
        />
      </Drawer>
      {/* Update output file snackbar */}
      <SnackbarUpdateOutputFile
        open={state.snackbarUpdate}
        handleClose={handleClickClose}
      />
    </div>
  );
};
StepperErrors.storyName = 'Stepper - Errors';
