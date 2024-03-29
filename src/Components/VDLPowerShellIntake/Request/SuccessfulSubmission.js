import React from 'react';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import RequestToolbar from './RequestToolbar';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography, Paper, Container} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Header from './Header';
import Footer from '../../VettingApp/CommonComponents/Footer';
import {FOOT_H, HEAD_H_XS} from '../../../Theme/constants';

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
    minHeight: `calc(105vh - ${HEAD_H_XS}px - ${FOOT_H}px)`,
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
            <Collapse in={open} className="input-margin">
              <Alert
                action={
                  <Button
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </Button>
                }
              >
                VDL PowerShell intake request ID-1234 submitted
              </Alert>
            </Collapse>
            <div>
              <Typography variant="body2" className="input-margin">
                Your request to create a VDL workspace has been submitted and is
                being processed. You will receive an email once the VDL
                workspace is ready.
              </Typography>
              <Typography variant="body2" className="input-margin">
                Your virtual machines will appear in the "DevTest Lab" named as
                "STC-0412-ST". Please be patient while waiting for your virtual
                machines to be ready. They may be visible with the status of
                "Running" but this does not mean they are ready for use.
              </Typography>
              <Typography variant="body2" className="input-margin">
                If you encounter any issues, submit a JIRA ticket to the
                <Link
                  href="https://jirab.statcan.ca/projects/DAZSUPP/summary"
                  underline="always"
                >
                  VDL Jira project.
                </Link>{' '}
                for assistance.
              </Typography>
              <Typography variant="body2" className="input-margin">
                Thank you!
              </Typography>
            </div>
          </Paper>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default SuccessfulSubmission;
