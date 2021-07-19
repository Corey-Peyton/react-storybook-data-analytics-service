import React from 'react';
import PropTypes from 'prop-types';
// import {useTranslation} from 'react-i18next';
import {Snackbar as MUISnackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      'bottom': theme.spacing(10),
      '& .MuiAlert-root': {
        width: '100%',
      },
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Snackbar(props) {
  const classes = useStyles();
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <MUISnackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      onClick={handleClick}
      className={classes.root}
    >
      <Alert onClose={props.handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </MUISnackbar>
  );
}

const SEVERITY = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
};

Snackbar.propTypes = {
  /**
   * The message to display.
   */
  message: PropTypes.node.isRequired,
  /**
    If true, Snackbar is open.
  */
  open: PropTypes.bool,
  /**
    The severity of the alert. This defines the color and icon used.
  */
  severity: PropTypes.oneOf(Object.values(SEVERITY)).isRequired,
  /**
    Click handler to close snackbar
  */
  handleClose: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  open: false,
};
