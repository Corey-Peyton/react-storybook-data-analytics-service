import React, {useState} from 'react';

import format from 'date-fns/format';

import {makeStyles} from '@material-ui/styles';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import frLocale from 'date-fns/locale/fr';

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', {locale: this.locale});
  }
}

export default {
  title: 'Lab/Date fields',
  component: KeyboardDatePicker,
  argTypes: {
    disabled: {
      description: 'Disable picker and text field',
      control: {
        type: 'boolean',
      },
      table: {
        type: {summary: 'boolean'},
      },
    },
    disableToolbar: {
      description: 'Hide toolbar and show only date/time views',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {summary: 'false'},
        type: {summary: 'boolean'},
      },
    },
    disableFuture: {
      description: 'Disable future dates',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {summary: 'false'},
        type: {summary: 'boolean'},
      },
    },
    disablePast: {
      description: 'Disable past dates',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {summary: 'false'},
        type: {summary: 'boolean'},
      },
    },
    maxDate: {
      description: 'Max selectable date',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'ParsableDate'},
        defaultValue: {summary: 'Date(2100-01-01)'},
      },
    },
    minDate: {
      description: 'Min selectable date',
      control: {
        type: 'text',
      },
      table: {
        type: {summary: 'ParsableDate'},
        defaultValue: {summary: 'Date(1900-01-01)'},
      },
    },
    variant: {
      description: 'The variant to use.',
      control: {
        type: 'radio',
        options: ['dialog', 'inline', 'static'],
      },
      table: {
        defaultValue: {summary: 'dialog'},
      },
    },
    readOnly: {
      description: 'Make picker read only',
      table: {
        type: {summary: 'boolean'},
      },
      control: {
        type: 'boolean',
      },
    },
    orientation: {
      description: 'Force rendering in particular orientation',
      control: {
        type: 'radio',
        options: ['portrait', 'landscape'],
      },
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'portrait'},
      },
    },
  },
};

export const Default = (args) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    selectedInline: null,
    selectedInlineFrench: null,
    selectedDefault: null,
  });

  const handleInline = (date) => {
    setState({...state, selectedInline: date});
  };

  const handleInlineFrench = (date) => {
    setState({...state, selectedInlineFrench: date});
  };

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="English date"
          placeholder="Select date"
          value={state.selectedInline}
          variant="dialog"
          format="MMM d, yyyy"
          clearable
          className="mb-3"
          autoOk
          DialogProps={{maxWidth: false}}
          onChange={handleInline}
          {...args}
        />
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
        <DatePicker
          format="d MMM yyyy"
          label="Date française"
          placeholder="Sélectionner une date"
          variant="dialog"
          clearable
          className="mb-3"
          autoOk
          value={state.selectedInlineFrench}
          onChange={handleInlineFrench}
          DialogProps={{maxWidth: false}}
          InputProps
          {...args}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Default value"
          placeholder="Select date"
          value={selectedDate}
          clearable
          onChange={handleDateChange}
          variant="dialog"
          format="MMM d, yyyy"
          className="mb-3"
          autoOk
          DialogProps={{maxWidth: false}}
          {...args}
        />
        <DatePicker
          disabled
          className="mb-3"
          label="Disabled"
          format="MMM d, yyyy"
        ></DatePicker>
        <DatePicker
          readOnly
          className="mb-3"
          label="Read only"
          format="MMM d, yyyy"
        ></DatePicker>
      </MuiPickersUtilsProvider>
    </div>
  );
};
