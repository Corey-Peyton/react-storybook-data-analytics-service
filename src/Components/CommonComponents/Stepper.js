import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Stepper as MUIStepper,
  Step,
  StepLabel,
  StepButton,
  StepConnector,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core/';
import {grey} from '@material-ui/core/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Icon from '@mdi/react';
import {
  mdiCheckboxBlankCircleOutline,
  mdiCircleEditOutline,
  mdiAlertCircleOutline,
  mdiCheckboxMarkedCircleOutline,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  stepperContainer: {
    'display': 'flex',
    '& .MuiStepper-root': {
      flexGrow: 1,
      padding: 0,
    },
    '& .MuiSvgIcon-root': {
      transform: 'none',
    },
    '& .MuiButtonBase-root:first-child .MuiSvgIcon-root': {
      transform: 'translateX(5px)',
    },
  },
  root: {
    width: '100%',
    textAlign: 'left',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
  },
  error: {
    '& *': {
      color: [theme.palette.error.main, '!important'],
    },
  },
  customStepConnector: {
    display: 'block',
    width: '10%',
    borderBottom: ['1px solid'],
    borderColor: [grey[400], '!important'],
    height: theme.spacing(2.5),
  },
}));

export default function Stepper(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: props.activeStep,
    completed: {},
    stepperErrors: props.stepperErrors,
    stepCompleted: props.completed,
    stepContent: props.stepContent,
  });
  const prevStep = React.useRef(null);
  const nextStep = React.useRef(null);
  const steps = props.steps;

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
    const prevActiveStep = state.activeStep;
    isLastStep() && !allStepsCompleted() ?
      steps.findIndex((step, i) => !(i in state.completed)) :
      setState({...state, activeStep: prevActiveStep + 1});
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    const prevActiveStep = state.activeStep;
    if (prevActiveStep !== 0) {
      setState({...state, activeStep: prevActiveStep - 1});
    }
  };

  const handleJumpStep = (step) => {
    setState({...state, activeStep: step});
  };

  const isStepFailed = (step) => {
    return state.stepperErrors[step] !== 0;
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

  const getStatusIcon = (status, index, error) => {
    const statusIcon = () => {
      if (Boolean(error)) {
        return 2;
      } else if (status) {
        return 1;
      } else {
        return 3;
      }
    };

    const icons = {
      1: <Icon path={mdiCheckboxMarkedCircleOutline} size={1} />, // completed
      2: <Icon path={mdiAlertCircleOutline} size={1} />, // error
      3: <Icon path={mdiCheckboxBlankCircleOutline} size={1} />, // incomplete
      4: <Icon path={mdiCircleEditOutline} size={1} />, // active
    };

    const icon = () => {
      if (index === state.activeStep) {
        return icons[4];
      } else {
        return icons[statusIcon()];
      }
    };

    return <>{icon()}</>;
  };

  return (
    <div className={classes.root}>
      <div className={classes.stepperContainer}>
        <IconButton
          onClick={handleBack}
          className={classes.stepperBackBtn}
          disabled={state.activeStep === 0}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <div className={classes.customStepConnector}></div>
        <MUIStepper
          nonLinear
          activeStep={state.activeStep}
          connector={<StepConnector />}
        >
          {steps.map((label, index) => {
            const labelProps = {};
            const buttonProps = {};
            if (isStepFailed(index)) {
              labelProps.error = true;
              buttonProps.optional = (
                <Typography
                  className={classes.errorMsg}
                  variant="caption"
                  color="error"
                  align="left"
                >
                  {state.stepperErrors[index] <= 99 ?
                    state.stepperErrors[index] :
                    '99+'}{' '}
                  {state.stepperErrors[index] === 1 ? 'error' : 'errors'}
                </Typography>
              );
            }
            return (
              <Step key={label} ref={getStepRef(index)} tabIndex="-1">
                <StepButton
                  {...buttonProps}
                  onClick={() => {
                    handleJumpStep(index);
                  }}
                  completed={state.completed[index]}
                  className={classes.stepButton}
                >
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={() =>
                      getStatusIcon(
                          state.stepCompleted[index],
                          index,
                          state.stepperErrors[index],
                      )
                    }
                    className={clsx(classes.root, {
                      [classes.active]: index === state.activeStep,
                      [classes.error]: Boolean(state.stepperErrors[index]),
                    })}
                  >
                    <span className="screen-reader-text">{`Step ${index +
                      1}: `}</span>
                    {label}
                  </StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </MUIStepper>
        <div className={classes.customStepConnector}></div>
        <IconButton
          onClick={handleNext}
          className={classes.stepperNextBtn}
          disabled={state.activeStep === totalSteps() - 1}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <div>
        <Grid container justify="center" className="mb-4 mt-4">
          <Grid item xs={6}>
            <Typography variant="body2">
              {state.stepContent(state.activeStep)}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Stepper.propTypes = {
  /**
    The strings that fill in the steps.
  */
  steps: PropTypes.array.isRequired,
  /**
      The amount of errors on each step.
    */
  stepperErrors: PropTypes.array,
  /**
      The completed/incompleted state of each step
    */
  completed: PropTypes.array,
  /**
   The current active step of the stepper.
   */
  activeStep: PropTypes.number.isRequired,
  /**
      The contents of each step, depending on the active step.
    */
  stepContent: PropTypes.func.isRequired,
};

Stepper.defaultPropps = {
  activeStep: 0,
};
