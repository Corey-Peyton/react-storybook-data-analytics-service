import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Paper,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ResearcherInfo from './ResearcherInfo';
import FilesList from './FilesList';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: theme.spacing(16.5),
    paddingRight: theme.spacing(16.5),
    background: theme.palette.grey[100],
  },
  paper: {
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

function VettingRequestResearcher(props) {
  const classes = useStyles();

  return (
    <main className={classes.main} tabIndex="-1">
      <Container maxWidth="xl" className="page-container">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <ResearcherInfo />
              {/* <FilesList /> */}
              <Grid container justify="space-between" className={classes.navButtons}>
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
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="button">
                Actions
              </Typography>
              <Grid container>
                <Grid item>
                  <IconButton aria-label="delete" className={classes.deleteBtn}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="submit">
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
export default VettingRequestResearcher;
