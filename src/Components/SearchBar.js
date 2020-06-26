import {InputAdornment, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Autocomplete} from '@material-ui/lab';
import queryString from 'query-string';
import React from 'react';
import {withRouter} from 'react-router-dom';

import {suggestions} from '../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
  },
  textfield: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        'borderRadius': theme.spacing(4),
        '& legend': {
          display: 'inline',
        },
      },
    },
  },
}));

function SearchBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const searchQuery = queryString.parse(props.location.search).search;

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      props.history.push({pathname: '/results', search: `?search=${value}`});
    }
  };

  const handleInputChange = (e, value) => {
    setValue(value);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        id="search-bar"
        freeSolo
        disableOpenOnFocus
        onInputChange={handleInputChange}
        options={suggestions.map((option) => option.subject)}
        defaultValue={searchQuery}
        renderInput={(params) => {
          params.InputProps = {
            ...params.InputProps,
          };
          return (
            <TextField
              {...params}
              className={classes.textfield}
              margin="dense"
              variant="outlined"
              fullWidth
              placeholder={props.placeholder}
              onKeyDown={handleEnterKey}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                ),
                inputProps: {
                  'aria-label': props.label,
                },
              }}
            />
          );
        }}
      />
    </div>
  );
}

export default withRouter(SearchBar);
