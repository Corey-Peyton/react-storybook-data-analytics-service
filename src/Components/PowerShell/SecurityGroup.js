import React from 'react';
import {suggestions} from '../../Data/fakeData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0),
  },
}));

function SecurityGroup(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <Grid item xs={9}>
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
      </Grid>
    </React.Fragment>
  );
}

export default SecurityGroup;
