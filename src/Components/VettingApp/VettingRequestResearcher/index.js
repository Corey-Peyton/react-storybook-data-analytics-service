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
  Chip,
  Tooltip,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@mdi/react';
import {mdiLockOpenVariant} from '@mdi/js';

import ResearcherInfo from './ResearcherInfo';
import FilesList from './FilesList';
import ResidualDisclosure from './ResidualDisclosure';
import AdditionalInfo from './AdditionalInfo';
import {getThemeProps} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [title, setTitle] = React.useState('New vetting request');
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
      setTitle(e.target.value);
    } else {
      setTitle('New vetting request');
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <main className={classes.main} tabIndex="-1">
      <Container maxWidth="xl" className="page-container">
        <AppBar position="static" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body2" className={classes.title}>
              Vetting requests dashboard
            </Typography>
            <Button
              variant="default"
              color="default"
              className={classes.headerBtn}
              startIcon={<ExitToAppIcon />}
            >
              Withdraw
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.headerBtn}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.headerBtn}
              startIcon={<SendIcon />}
            >
              Send request
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item className={classes.title}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="caption" color="textSecondary">
                ID: 10_2020_232425255
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
