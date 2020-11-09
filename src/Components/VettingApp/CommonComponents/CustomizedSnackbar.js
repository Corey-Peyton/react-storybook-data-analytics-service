import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={props.toggleSnackbar}>
        Open success snackbar
      </Button>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.toggleSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={props.toggleSnackbar} severity={props.severity}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
