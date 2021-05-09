import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {HoursMinsField} from '../Components/CommonComponents/HoursMinsField';
import {Button} from '@material-ui/core';

export default {
  title: 'Molecules/HoursMinsField',
  component: HoursMinsField,
};

const useStyles = makeStyles((theme) => ({
  displayFlex: {
    display: 'flex',
    alignItems: 'start',
  },
}));

export const BasicField = (args) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    hours: '',
    minutes: '',
    error: '',
  });

  const handleHoursChange = (event) => {
    setState({...state, hours: event.target.value.trim()});
  };

  const handleMinsChange = (event) => {
    setState({...state, minutes: event.target.value.trim()});
  };

  const handleValidation = (event) => {
    const hours = parseInt(state.hours, 10);
    const mins = parseInt(state.minutes, 10);
    if (hours === 0 && mins === 0) {
      setState({...state, error: 'The minimum accepted value is 1 minute.'});
    } else if (!hours && !mins) {
      setState({...state, error: 'Enter an estimated time.'});
    } else {
      setState({...state, error: ''});
    }
  };

  return (
    <div className={classes.displayFlex}>
      <HoursMinsField
        id="estimated-time"
        label="Estimated time"
        handleHoursChange={handleHoursChange}
        handleMinsChange={handleMinsChange}
        error={state.error}
      />
      <Button
        className="input-group-btn ml-1"
        variant="contained"
        color="primary"
        onClick={handleValidation}
      >
        Submit
      </Button>
    </div>
  );
};
