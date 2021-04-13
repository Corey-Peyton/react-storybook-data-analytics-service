import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default {
  title: 'Molecules/TextFields',
  component: TextField,
};

const useStyles = makeStyles((theme) => ({
/*   textField: {
    width: '187px',
  }, */

}));

export const AllTextFields = (args) => {
  return (
    <>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" />
    </>
  );
};

export const OutlinedTextField = (args) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        id="standard-basic"
        label="Full width"
        variant="outlined"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-basic"
        label="Required"
        variant="outlined"
        required
        margin="dense"
        className="mr-2"
      />
      <TextField
        id="outlined-basic"
        label="Disabled"
        variant="outlined"
        disabled
        margin="dense"
        className="mr-2"
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
        className="mr-2"
      />
      <TextField
        id="outlined-basic"
        label="Helper text"
        variant="outlined"
        defaultValue="Default Value"
        helperText="Some important text"
        margin="dense"
        className="mr-2"
      />
      <TextField
        label="Error"
        id="standard-start-adornment"
        variant="outlined"
        InputProps={{
          error: true,
        }}
        margin="dense"
        className="mr-2"
      />
      <TextField
        label="Adornment"
        id="standard-start-adornment"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        margin="dense"
        className="mr-2"
      />

      <TextField
        id="standard-basic"
        label="Multiline"
        variant="outlined"
        multiline
        rows={2}
        margin="dense"
        className="mr-2"
      />
      <TextField
        id="standard-basic"
        variant="outlined"
        label="Size medium"
        size="medium"
        margin="dense"
      />
    </>
  );
};
