import React from 'react';
import {InputAdornment} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {TextFields} from '../Components/CommonComponents/TextField';

export default {
  title: 'Molecules/TextFields',
  component: TextFields,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '187px',
  },
}));

export const AllTextFields = (args) => {
  return (
    <>
      <TextFields id="standard-basic" label="Standard" />
      <TextFields id="filled-basic" label="Filled" variant="filled" />
      <TextFields id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
};

export const StandardTextField = (args) => {
  return (
    <>
      <TextFields id="standard-basic" label="Full width" fullWidth />
      <TextFields id="standard-basic" label="Required" required />
      <TextFields id="standard-basic" label="Disabled" disabled />
      <TextFields
        id="standard-basic"
        label="Type"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextFields
        id="standard-basic"
        label="Helper text"
        defaultValue="Default Value"
        helperText="Some important text"
      />
      <TextFields
        id="standard-basic"
        label="Error"
        InputProps={{
          error: true,
        }}
      />
      <TextFields id="standard-basic" label="Multiline" multiline rows={2} />
      <TextFields id="standard-basic" label="Dense margin" margin="dense" />
    </>
  );
};

export const OutlinedTextField = (args) => {
  const classes = useStyles();
  return (
    <>
      <TextFields
        id="standard-basic"
        label="Full width"
        variant="outlined"
        fullWidth
      />
      <TextFields
        id="outlined-basic"
        label="Required"
        variant="outlined"
        required
      />
      <TextFields
        id="outlined-basic"
        label="Disabled"
        variant="outlined"
        disabled
      />
      <TextFields
        id="outlined-basic"
        label="Type"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextFields
        id="outlined-basic"
        label="Helper text"
        variant="outlined"
        defaultValue="Default Value"
        helperText="Some important text"
      />
      <TextFields
        label="Error"
        id="standard-start-adornment"
        variant="outlined"
        className={classes.textField}
        InputProps={{
          error: true,
        }}
      />
      <TextFields
        label="Adornment"
        id="standard-start-adornment"
        variant="outlined"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <TextFields
        id="standard-basic"
        label="Multiline"
        variant="outlined"
        multiline
        rows={2}
      />
      <TextFields
        id="standard-basic"
        label="Dense margin"
        variant="outlined"
        margin="dense"
      />
    </>
  );
};

export const FilledTextField = (args) => {
  const classes = useStyles();
  return (
    <>
      <TextFields
        id="filled-basic"
        label="Full width"
        variant="filled"
        fullWidth
      />
      <TextFields
        id="filled-basic"
        label="Required"
        variant="filled"
        required
      />
      <TextFields
        id="filled-basic"
        label="Disabled"
        variant="filled"
        disabled
      />
      <TextFields
        id="filled-basic"
        type="number"
        label="Type"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextFields
        id="filled-basic"
        label="Helper text"
        variant="filled"
        defaultValue="Default Value"
        helperText="Some important text"
      />
      <TextFields
        id="filled-basic"
        label="Error"
        variant="filled"
        InputProps={{
          error: true,
        }}
      />
      <TextFields
        id="filled-basic"
        label="Adornment"
        variant="filled"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextFields
        id="filled-basic"
        label="Multiline"
        variant="filled"
        multiline
        rows={2}
      />
      <TextFields
        id="filled-basic"
        label="Disabled Underline"
        variant="filled"
        disableUnderline
        InputProps={{
          disableUnderline: true,
        }}
      />
      <TextFields
        id="standard-basic"
        label="Read only"
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextFields
        id="standard-basic"
        label="Dense margin"
        variant="filled"
        margin="dense"
      />
    </>
  );
};
