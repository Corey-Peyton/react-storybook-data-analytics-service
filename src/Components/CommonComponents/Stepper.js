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
import Icon from '@mdi/react';
import {
  mdiCheckboxBlankCircleOutline,
  mdiAlertCircleOutline,
  mdiPencil,
  mdiCheckboxMarkedCircleOutline,
  mdiChevronLeft,
  mdiChevronRight,
  mdiEye,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  stepperContainer: {
    'display': 'flex',
    'alignItems': 'center',
    '& .MuiStepper-root': {
      flexGrow: 1,
      paddingLeft: 0,
      paddingRight: 0,
    },
    '& .MuiStep-root': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& .MuiStepButton-root': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
    },
    '& .MuiStepLabel-iconContainer': {
      color: 'rgb(0 0 0 / 42%)',
    },
    '& .MuiStepLabel-completed:not(.MuiStepLabel-active)': {
      color: theme.palette.text.secondary,
      fontWeight: 'inherit',
    },
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.divider,
    },
  },

  active: {
    '& *': {
      color: [theme.palette.primary.main, '!important'],
    },
  },

  error: {
    '& *': {
      color: [theme.palette.error.main, '!important'],
    },
  },

  additionalStepConnector: {
    width: '24px',
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
  },
}));

export default function Stepper(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: props.activeStep,
    completed: props.completed,
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
        // error
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
      4: <Icon path={mdiPencil} size={1} />, // active
      5: <Icon path={mdiEye} size={1} />, // readonly
    };

    const icon = () => {
      if (index === state.activeStep && props.readonly) {
        return icons[5];
      } else if (index === state.activeStep) {
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
          disabled={state.activeStep === 0}
          className="ml-n1 mr-1"
        >
          <Icon path={mdiChevronLeft} size={1} />
        </IconButton>
        <div className={classes.additionalStepConnector}></div>
        <MUIStepper
          nonLinear
          activeStep={state.activeStep}
          connector={<StepConnector />}
          // readonly={props.readonly}
        >
          {steps.map((label, index) => {
            const labelProps = {};
            const buttonProps = {};
            if (isStepFailed(index)) {
              labelProps.error = true;
              buttonProps.optional = (
                <Typography
                  className={classes.errorMsg}
                  component="p"
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
              <Step
                key={label}
                ref={getStepRef(index)}
                tabIndex="-1"
                completed={state.completed[index]}
              >
                <StepButton
                  {...buttonProps}
                  onClick={() => {
                    handleJumpStep(index);
                  }}
                  className={classes.stepButton}
                >
                  <StepLabel
                    align="left"
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
        <div className={classes.additionalStepConnector}></div>
        <IconButton
          onClick={handleNext}
          disabled={state.activeStep === totalSteps() - 1}
          className="ml-1 mr-n1"
        >
          <Icon path={mdiChevronRight} size={1} />
        </IconButton>
      </div>
      <Grid container className="mb-3 mt-3">
        <Grid item align="center" xs={12}>
          <Typography variant="h5">
            {state.stepContent(state.activeStep)}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Stepper.propTypes = {
  /**
    The strings that fill in the steps.
  */
  steps: PropTypes.array.isRequired,
  /**
    Whether the stepper is readonly or not.
  */
  readonly: PropTypes.bool.isRequired,
  /**
      The amount of errors on each step.
    */
  stepperErrors: PropTypes.array,
  /**
      The completed/incompleted state of each step.
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

Stepper.defaultProps = {
  activeStep: 0,
  readonly: false,
};
