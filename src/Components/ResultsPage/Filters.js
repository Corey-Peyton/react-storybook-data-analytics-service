import React from 'react';
import {useTranslation} from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import {Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormLabel, Paper, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TuneIcon from '@material-ui/icons/Tune';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/styles';

import {subjects, surveys} from '../../Data/fakeData';
import StickySearchableDropdown from '../StickySearchableDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(-2, 2, 0, -4),
    height: '100%',
  },
  dateDetails: {
    flexDirection: 'column',
  },
  datePicker: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  list: {
    padding: theme.spacing(0, 0, 3, 0),
    width: '100%',
  },
  listIcon: {
    minWidth: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(0, 3, 0, 3),
  },
  geoOr: {
    position: 'absolute',
    top: '6px',
    left: '52px',
    backgroundColor: theme.palette.common.white,
  },
}));

const Filters = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    selectedFromDate: null,
    selectedToDate: null,
    selectedDateType: 10,
    checked: [],
  });

  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };

  const handleToDateChange = (date) => {
    setState({...state, selectedToDate: date});
  };

  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <Paper className={classes.root}>
      <Button className="screen-reader-text" onClick={handleClick}>
        {t('Skip filters')}
      </Button>
      <div className="icon-heading mb-2 ml-3">
        <TuneIcon />
        <Typography variant="h6" component="h2">{t('Filters')}</Typography>
      </div>
      <StickySearchableDropdown
        id="subjects"
        defaultExpanded={false}
        filterable={true}
        summary={t('Subjects')}
        placeholder={t('Search subjects')}
        list={subjects}
        legendHidden={true}
      />
      <StickySearchableDropdown
        id="sources"
        defaultExpanded={false}
        filterable={true}
        summary={t('Sources')}
        placeholder={t('Search sources')}
        list={surveys}
        legendHidden={true}
      />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Date</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.dateDetails}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className="screen-reader-text">
              {t('Date')}
            </FormLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="start-date"
                className={classes.datePicker}
                variant="inline"
                margin="dense"
                format="MM/dd/yyyy"
                label={t('Start date')}
                value={state.selectedFromDate}
                maxDate={state.selectedToDate}
                onChange={handleFromDateChange}
                inputVariant="outlined"
                PopoverProps={{
                  'aria-modal': 'true',
                }}
                KeyboardButtonProps={{
                  'aria-label': t('select start date'),
                }}
              />
              <KeyboardDatePicker
                id="end-date"
                variant="inline"
                margin="dense"
                format="MM/dd/yyyy"
                label={t('End date')}
                value={state.selectedToDate}
                minDate={state.selectedFromDate}
                onChange={handleToDateChange}
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': t('select end date'),
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
});

export default Filters;
