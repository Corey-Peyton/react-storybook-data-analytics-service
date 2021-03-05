import React from 'react';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();
  const classes = useStyles();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.toggleSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClick={handleClick}
      >
        <Alert onClose={props.toggleSnackbar} severity={props.severity}>
          {t(props.message)}
        </Alert>
      </Snackbar>
    </div>
  );
}
