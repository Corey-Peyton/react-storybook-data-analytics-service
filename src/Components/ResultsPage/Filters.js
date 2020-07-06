import React from 'react';
import {useTranslation} from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@mdi/react';
import {mdiTune} from '@mdi/js';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/styles';

import {subjects, surveys} from '../../Data/fakeData';
import StickySearchableDropdown from '../StickySearchableDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.divider,
    height: '100%',
    padding: theme.spacing(3, 3, 0, 0),
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0, 3, 1),
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
  },
  dateDetails: {
    flexDirection: 'column',
  },
  datePicker: {
    margin: theme.spacing(0, 0, 3, 0),
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
      <div className={classes.filterHeader}>
        <Icon path={mdiTune} size={1} />
        <Typography variant="h6" component="h2" className="ml-2">
          {t('Filters')}
        </Typography>
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
          <Typography variant="subtitle2">Date</Typography>
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
