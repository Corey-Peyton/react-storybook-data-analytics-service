import React from 'react';
import {Typography, Grid, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contactBtn: {
    margin: theme.spacing(1, 0),
  },
  content: {
    '& p': {
      maxWidth: '60em',
      marginBottom: theme.spacing(2),
    },
  },
  questions: {
    '& .MuiButton-root': {
      textTransform: 'none',
      width: '20em',
    },
  },
}));

export const Comment = () => {
  return (
    <section>
      <Typography
        variant="h5"
        component="h2"
        className="heading-underline"
        gutterBottom
      >
        Add a comment
      </Typography>
      <TextField
        className="form-control"
        id="comment-name"
        label="Name"
        margin="dense"
        variant="outlined"
        inputProps={{
          size: 40,
        }}
      />
      <TextField
        className="form-control"
        id="comment-subject"
        label="Subject"
        margin="dense"
        variant="outlined"
        inputProps={{
          size: 40,
        }}
      />
      <TextField
        className="form-control"
        id="comment-text"
        label="Comments"
        margin="dense"
        variant="outlined"
        multiline
        rows="6"
        inputProps={{
          cols: 60,
        }}
      />
    </section>
  );
};

export const ContactUs = () => {
  const classes = useStyles();
  return (
    <section className={classes.content}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
      >
        Questions? Contact us!
      </Typography>
      <Typography>
        Our business hours are: Monday - Friday from 9:00 am - 5:00 pm eastern
        time.
      </Typography>
      <Typography>
        If you have a question for us outside of these hours, send us an email
        and we'll contact you when we're back in the office.
      </Typography>
      <Grid
        container
        spacing={4}
        alignItems="center"
        className={classes.questions}
      >
        <Grid item>
          <Button color="primary" variant="contained">
            Send us an email
          </Button>
        </Grid>
        <Grid item>
          <Typography className="phone-num-lg" component="span">
            Phone: 1-800-123-4567
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
};

export const Source = () => {
  const classes = useStyles();
  return (
    <section>
      <Typography
        variant="h5"
        component="h2"
        className="heading-underline"
        gutterBottom
      >
        Source
      </Typography>
      <Typography>Statistics Canada</Typography>
      <Button className={classes.contactBtn} color="primary" variant="outlined">
        Send us an email
      </Button>
      <Typography className="phone-num-lg">
        Phone: 1-800-123-4567
      </Typography>
    </section>
  );
};
