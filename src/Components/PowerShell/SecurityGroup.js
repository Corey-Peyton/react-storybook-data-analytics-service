import React from 'react';
import {suggestions} from '../../Data/fakeData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

function SecurityGroup(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <Box>
        <Autocomplete
          id="securitygroupname"
          options={suggestions.map((option) => option.subject)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('Security group name')}
              className={classes.inputMargin}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
    </React.Fragment>
  );
}

export default SecurityGroup;
