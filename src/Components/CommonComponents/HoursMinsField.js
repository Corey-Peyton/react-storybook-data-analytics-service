import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import {InputGroup} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  hoursInputGroup: {
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  input: {
    '&::placeholder': {
      color: theme.palette.text.secondary,
    },
  },
  inputComponent: {
    '& .MuiInput-underline:before': {
      borderBottom: 'none !important',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none !important',
    },
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    height: '1em',
  },
  inputGroupText: {
    color: theme.palette.text.secondary,
    fontSize: '0.875em',
  },
  inputLabel: {
    'marginTop': 0,
    '&$shrink': {
      transform: 'translate(14px, -8px) scale(0.75)',
    },
  },
  shrink: {},
}));

export function HoursMinsField(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    focused: false,
  });

  const handleFocus = () => {
    setState({...state, focused: true});
  };

  const handleBlur = () => {
    setState({...state, focused: false});
  };

  return (
    <FormControl component="fieldset">
      <InputLabel
        classes={{root: classes.inputLabel, shrink: classes.shrink}}
        error={Boolean(props.error)}
        component="legend"
        shrink
        required={props.required}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        required={props.required}
        id={props.id}
        label={props.label}
        inputComponent={MultiInput}
        className={clsx({'Mui-focused': state.focused})}
        inputProps={{
          onFocus: () => {
            handleFocus();
            props.onFocus && props.onFocus();
          },
          onBlur: () => {
            handleBlur();
            props.onBlur && props.onBlur();
          },
          ...props,
        }}
        error={Boolean(props.error)}
        notched
      />
      {Boolean(props.error) && (
        <FormHelperText error={Boolean(props.error)} variant="outlined">
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function MultiInput(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <InputGroup className={classes.inputGroup}>
      <InputLabel className="screen-reader-text" htmlFor={`${props.id}-hours`}>
        {t('hours')}
      </InputLabel>
      <NumberFormat
        id={`${props.id}-hours`}
        className={classes.inputComponent}
        placeholder="--"
        customInput={TextField}
        type="text"
        format="######"
        required={props.required}
        inputProps={{
          size: 6,
          className: classes.input,
        }}
        onChange={props.handleHoursChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onCut={props.onCut}
        onCopy={props.onCopy}
        onPaste={props.onPaste}
        onClick={props.onClick}
      />
      <InputGroup.Append className={classes.hoursInputGroup}>
        <InputGroup.Text className={classes.inputGroupText}>
          {t('hours')}
        </InputGroup.Text>
      </InputGroup.Append>
      <InputLabel className="screen-reader-text" htmlFor={`${props.id}-mins`}>
        {t('minutes')}
      </InputLabel>
      <NumberFormat
        id={`${props.id}-mins`}
        className={classes.inputComponent}
        placeholder="--"
        customInput={TextField}
        type="text"
        format="##"
        isAllowed={(values) => {
          const {formattedValue, floatValue} = values;
          return formattedValue === '' || floatValue <= 59;
        }}
        required={props.required}
        inputProps={{
          size: 2,
          className: classes.input,
        }}
        onChange={props.handleMinsChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onCut={props.onCut}
        onCopy={props.onCopy}
        onPaste={props.onPaste}
        onClick={props.onClick}
      />
      <InputGroup.Append>
        <InputGroup.Text className={classes.inputGroupText}>
          {t('minutes')}
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
}

const COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

HoursMinsField.propTypes = {
  /**
  The id of the input element.
  */
  id: PropTypes.string.isRequired,
  /**
   The label of the input.
  */
  label: PropTypes.string.isRequired,
  /**
    If true, the input element will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
    The color of the component.
   */
  color: PropTypes.oneOf(Object.values(COLOR)),
  /**
   If true, the input elements will be required.
   */
  required: PropTypes.bool,
  /**
    If true, the input elements will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   It prevents the user from changing the value of the field (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
};

HoursMinsField.defaultProps = {
  autoFocus: false,
  color: COLOR.PRIMARY,
  required: false,
  disabled: false,
  readOnly: false,
};
