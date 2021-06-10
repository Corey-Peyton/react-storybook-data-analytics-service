import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Grid, Button, Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {SnackbarSubmitRequest} from '../../VettingApp/CommonComponents/Snackbars';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: theme.spacing(0, -3),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
}));

function RequestToolbar(props) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClick = () => {
    setOpenSnackbar(true);
  };
  const snackbarhandleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar>
        <Grid container justify="space-between">
          <Typography className="mt-1">
            VDL PowerShell Intake Request
          </Typography>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.headerBtn}
              onClick={handleClick}
              component={RouterLink}
              to="Request/SuccessfulSubmission"
            >
              Submit
            </Button>
            <SnackbarSubmitRequest
              open={openSnackbar}
              handleClose={snackbarhandleClose}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default RequestToolbar;
