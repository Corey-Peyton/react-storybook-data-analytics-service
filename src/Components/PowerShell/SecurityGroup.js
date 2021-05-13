import React from 'react';
import {suggestions} from '../../Data/fakeData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';
import {TextField} from '@material-ui/core';
import Box from '@material-ui/core/Box';

function SecurityGroup(props) {
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <div className="pt-3 pb-3">
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
