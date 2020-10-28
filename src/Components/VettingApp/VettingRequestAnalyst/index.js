import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Container, Grid, Button} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import ResearcherInfo from '../VettingRequestResearcher/ResearcherInfo';
import FloatingSupportButton from '../CommonComponents/Support';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
  },
  paper: {
    maxWidth: '1280px',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing(3),
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

function VettingRequestAnalyst(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <main className={classes.main} tabIndex="-1">
        <Container maxWidth="xl" className="page-container">
          <Paper className={classes.paper}>
            <Grid container justify="center" className="mb-4">
              <Grid item xs={6}>
                <ResearcherInfo />
                {/* <FilesList /> */}
                {/* <ModifyFile /> */}
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.navButtons}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  <span>Next</span>
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <FloatingSupportButton />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default VettingRequestAnalyst;
