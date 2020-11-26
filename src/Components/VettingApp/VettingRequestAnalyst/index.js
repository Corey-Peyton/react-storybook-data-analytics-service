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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogActions,
  Snackbar,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AnalystInfo from './AnalystInfo';
import FilesList from './FilesList';
import ResidualDisclosure from './ResidualDisclosure';
import AdditionalInfo from './Additionalnfo';
import ToolBarUnassign from './ToolBarUnAssign';
import ToolBarAssign from './ToolBarAssign';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchBar from '../../SearchBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBarUnAssign from './AppBarUnAssign';
import AppBarAssign from './AppBarAssign';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  active: {
    color: '#784af4',
  },
  negativeMargin: {
    marginTop: '-17%',
    marginLeft: '20%',
    paddingBottom: '6%',
  },
  negativeMargin2: {
    marginTop: '-10%',
    marginLeft: '20%',
  },
  paddingBottom: {
    paddingBottom: '10px',
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

function VettingRequestAnalyst(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    completed: {},
    title: 'New vetting request',
    open: false,
  });
  const steps = getSteps();

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
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in state.completed)) : state.activeStep + 1;
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setState({...state, open: true});
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const snackbarHandleClick = () => {
    setOpenSnackbar(true);
  };

  const snackbarHandleClose = () => {
    setOpenSnackbar(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AnalystInfo handleTitleChange={handleTitleChange} />;
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
      setState({...state, title: 'New vetting request'});
    }
  };

  const handleReset = () => {
    setState({...state, activeStep: 0});
    setState({...state, completed: {}});
  };

  return (
    <main className={classes.main} tabIndex="-1">
      <Container maxWidth="xl" className="page-container">
        <AppBar position="static" className={classes.appBar} color="default">
          {state.activeStep === 3 ? <ToolBarUnassign /> : <ToolBarAssign />}
        </AppBar>
        <Paper className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item className={classes.title}>
              <Typography variant="h6">{state.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                ID: 10_2020_232425255
              </Typography>
            </Grid>
            {state.activeStep === 3 ? <AppBarUnAssign handleDialogOpen={handleDialogOpen}/> : <AppBarAssign />}
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
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={state.completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
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
                  onClick={snackbarHandleClick}
                >
                  Submit request
                </Button>
                <Snackbar open={openSnackbar} onClose={snackbarHandleClose} autoHideDuration={6000} anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}>
                  <Alert
                    onClose={snackbarHandleClose}
                    severity="success"
                    className={classes.alert}
                    variant="filled"
                  >
                    This vetting request has been already submitted. You will be
                    notified with any updates.
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
      </Container>

      <Dialog
        open={state.open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Manage team</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent className="pb-0">
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2" className={classes.paddingBottom}><strong>Lead</strong></Typography>
            <Avatar src="/broken-image.jpg" /><Typography variant="body2" className={classes.negativeMargin}>Brian Bill</Typography>
            <Typography variant="body2" className={classes.negativeMargin2}>brian.bill@canada.ca<IconButton aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton><Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            ><MenuItem onClick={handleClose}>Unassign from me</MenuItem>
              <MenuItem onClick={handleClose}>Make me lead</MenuItem></Menu></Typography>
            <Divider className={classes.divider} />
            <SearchBar placeholder="Search support analysts"/>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2" className={classes.paddingBottom}><strong>Support Analysts</strong></Typography>
            <Avatar src="/broken-image.jpg" /><Typography variant="body2" className={classes.negativeMargin}>Tony Stark </Typography>
            <Typography variant="body2" className={classes.negativeMargin2}>tony.stark@canada.ca<IconButton aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton><Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            ><MenuItem onClick={handleClose}>Unassign from me</MenuItem>
              <MenuItem onClick={handleClose}>Make me lead</MenuItem></Menu></Typography>
          </DialogContentText>
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleDialogClose} color="primary" variant="contained" className="ml-2">
          Go back
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
export default VettingRequestAnalyst;
