import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {SnackbarAddResearcher} from '../VettingApp/CommonComponents/Snackbars';
import {Typography, Button, Drawer} from '@material-ui/core';
import {AddResearcher} from './AddResearcher';

const useStyles = makeStyles((theme) => ({
  inputMarginBlock: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    display: 'block',
  },
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
  },
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
  },
}));

function ResearcherInformation(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
  });

  const [open, setOpen] = React.useState({
    snackbarAddResearcher: false,
    addResearcher: false,
  });

  const toggleDrawer = (event, drawer, state) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen({...open, [drawer]: state});
  };

  const addResearcher = () => {
    setOpen({...open, snackbarAddResearcher: true, addResearcher: false});
  };

  const handleClickOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };


  return (
    <React.Fragment>
      <Typography variant="body1" className="mb-2">
        New vDL requests require at least one Researcher per request. Please add
        a Researcher by clicking the 'Add researcher' button below.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => toggleDrawer(e, 'addResearcher', true)}
      >
        Add virtual machine details
      </Button>
      <Drawer
        anchor="right"
        open={open.addResearcher}
        className={classes.drawer}
      >
        <AddResearcher
          toggleDrawer={toggleDrawer}
          addResearcher={addResearcher}
          handleClickOpen={handleClickOpen}
        />
      </Drawer>
      <SnackbarAddResearcher
        open={open.snackbarAddResearcher}
        handleClose={() => handleClickClose('snackbarAddResearcher')}
      />
    </React.Fragment>
  );
}
export default ResearcherInformation;
