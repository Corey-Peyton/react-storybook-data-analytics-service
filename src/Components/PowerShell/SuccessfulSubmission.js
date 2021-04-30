import React from 'react';
import Alert from '@material-ui/lab/Alert';
import RequestToolbar from './RequestToolbar';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography, Paper, Container, Grid} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Header from '../VettingApp/CommonComponents/Header';
import Footer from '../VettingApp/CommonComponents/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  pageContainer: {
    marginTop: theme.spacing(8),
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
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
}));

function SuccessfulSubmission(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <React.Fragment>
      <Header />
      <main className={classes.main} tabIndex="-1">
        <Container maxWidth={false} className={classes.pageContainer}>
          <RequestToolbar />
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item className={classes.title}>
                <Typography variant="h6" component="h1">
                  VDL PowerShell Intake Request
                </Typography>
              </Grid>
            </Grid>
            <Collapse in={open}>
              <Alert
                severity="success"
                className={classes.alert}
                action={
                  <Button
                    size="small"
                    color="inherit"
                    className={classes.padding}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon />
                  </Button>
                }
              >
                Your VDL request (####) has been submitted.
              </Alert>
            </Collapse>
            <div>
              <Typography variant="body2" className="mb-2  mt-2">
                Your request to create a vDL workspace has been submitted and is
                being processed. You will receive an email once the vDL
                workspace is ready.
              </Typography>
              <Typography variant="body2" className="mb-2">
                Your Virtual Machine will appear in the 'DevTest Lab' named as
                'STC-0412-ST'. Please be patient when waiting for your Virtual
                Machine to be ready. They may be visible to you with the status
                of 'Running', this does not mean they are ready.
              </Typography>
              <Typography variant="body2" className="mb-2">
                If you encounter any errors or issues, please submit a JIRA
                ticket to the vDL Jira project.
              </Typography>
              <Typography variant="body2">Thank you!</Typography>
            </div>
          </Paper>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default SuccessfulSubmission;
