import React from 'react';
import {
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  signUp: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    '& .MuiPaper-root': {
      padding: theme.spacing(4),
      margin: theme.spacing(1),
    },
  },
  signUpForm: {
    'textAlign': 'center',
    '& .MuiFormControl-root': {
      'width': '100%',
      'marginBottom': theme.spacing(2),
      'marginTop': 0,
    },
    '& .MuiButton-root': {
      width: '15em',
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  return (
    <div className={classes.signUp}>
      <Typography variant="h5" component="h2">
        Sign up!
      </Typography>
      <Typography>Lorem ipsum dolor sit amet</Typography>
      <Paper>
        <form className={classes.signUpForm}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="signup-name" label="Name" margin="dense" variant="outlined" inputProps={{size: 30}} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="signup-email"
                label="Email"
                margin="dense"
                variant="outlined"
                inputProps={{
                  size: 30,
                }}
              />
            </Grid>
          </Grid>
          <Button type="submit" color="primary" variant="outlined">
            Sign up!
          </Button>
        </form>
      </Paper>
    </div>
  );
};

