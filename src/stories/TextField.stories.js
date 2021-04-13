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
/*   textField: {
    width: '187px',
  }, */

}));

export const AllTextFields = (args) => {
  return (
    <>
      <TextFields id="outlined-basic" label="Outlined" variant="outlined" margin="dense" />
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
        margin="dense"
      />
      <TextFields
        id="outlined-basic"
        label="Required"
        variant="outlined"
        required
        margin="dense"
      />
      <TextFields
        id="outlined-basic"
        label="Disabled"
        variant="outlined"
        disabled
        margin="dense"
      />
      <TextFields
        id="outlined-basic"
        label="Type"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
      />
      <TextFields
        id="outlined-basic"
        label="Helper text"
        variant="outlined"
        defaultValue="Default Value"
        helperText="Some important text"
        margin="dense"
      />
      <TextFields
        label="Error"
        id="standard-start-adornment"
        variant="outlined"
        InputProps={{
          error: true,
        }}
        margin="dense"
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
        margin="dense"
      />

      <TextFields
        id="standard-basic"
        label="Multiline"
        variant="outlined"
        multiline
        rows={2}
        margin="dense"
      />
      <TextFields
        id="standard-basic"
        variant="outlined"
        label="Size medium"
        size="medium"
        margin="dense"
      />
    </>
  );
};
