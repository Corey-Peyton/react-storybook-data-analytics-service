import React from 'react';
import {suggestions} from '../../Data/fakeData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  paddingTopBottom: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function SecurityGroup(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <div className={classes.paddingTopBottom}>
        <Box>
          <Autocomplete
            id="securitygroupname"
            options={suggestions.map((option) => option.subject)}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label={t('Security group name')}
                variant="outlined"
                fullWidth
                className="input-margin"
              />
            )}
          />
        </Box>
      </div>
    </React.Fragment>
  );
}

export default SecurityGroup;
