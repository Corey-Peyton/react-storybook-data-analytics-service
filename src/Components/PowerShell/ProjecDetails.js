import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  TextField,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Typography,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

function ProjectDetails(props) {
  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };
  const handleToDateChange = (date) => {
    setState({...state, selectedToDate: date});
  };

  const [isOpenStartDate, setIsOpenStartDate] = useState(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState(false);

  const {t} = useTranslation();

  const [state, setState] = React.useState({
    selectedFromDate: null,
    selectedToDate: null,
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className="pb-3 pt-3">
        <Box>
          <Alert severity="error" className="input-margin">
            {t('Complete all required fields to advance to the next step')}
          </Alert>
          <TextField
            variant="outlined"
            id="contractnumber"
            fullWidth
            className="input-margin"
            margin="dense"
            label={t('Contract number')}
            required
          />
          <Grid item className="input-margin">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id={t('start-date')}
                variant="inline"
                margin="dense"
                InputProps={{readOnly: true}}
                format="MM/dd/yyyy"
                label={t('Contract start date')}
                value={state.selectedFromDate}
                maxDate={state.selectedToDate}
                fullWidth
                autoOk
                open={isOpenStartDate}
                onClick={() => setIsOpenStartDate(true)}
                onOpen={() => setIsOpenStartDate(true)}
                onClose={() => setIsOpenStartDate(false)}
                disablePast
                required
                className="input-margin"
                onChange={handleFromDateChange}
                inputVariant="outlined"
                PopoverProps={{
                  'aria-modal': t('true'),
                }}
                KeyboardButtonProps={{
                  'aria-label': t('Select start date'),
                }}
              />
              <KeyboardDatePicker
                open={isOpenEndDate}
                onClick={() => setIsOpenEndDate(true)}
                onOpen={() => setIsOpenEndDate(true)}
                onClose={() => setIsOpenEndDate(false)}
                id={t('end-date')}
                variant="inline"
                margin="dense"
                format="MM/dd/yyyy"
                label={t('Contract end date')}
                InputProps={{readOnly: true}}
                value={state.selectedToDate}
                minDate={state.selectedFromDate}
                onChange={handleToDateChange}
                autoOk
                required
                className="input-margin"
                inputVariant="outlined"
                fullWidth
                KeyboardButtonProps={{
                  'aria-label': t('Select end date'),
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <TextField
            variant="outlined"
            id={t('primaryinvestigator')}
            fullWidth
            className="input-margin"
            label={t('Primary investigator')}
            required
            margin="dense"
            error
            helperText="This field is required."
          />
          <Grid item className="input-margin">
            <FormControl component="fieldset" className={classes.fullWidth}>
              <FormLabel component="legend" required>
                {t('Environment')}
              </FormLabel>
              <RadioGroup
                aria-label={t('environment')}
                name={t('radio-buttons-group')}
                color="primary"
              >
                <FormControlLabel
                  value={t('VDL')}
                  control={<Radio color="primary" />}
                  label={t('VDL')}
                />
                <FormControlLabel
                  value={t('Prerelease')}
                  control={<Radio color="primary" />}
                  label={t('Prerelease')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item className="input-margin">
            <FormControl component="fieldset" className={classes.fullWidth}>
              <FormLabel component="legend" required>
                {t('Access location')}
              </FormLabel>
              <RadioGroup
                aria-label={t('Access location')}
                name={t('radio-buttons-group')}
                color="primary"
              >
                <FormControlLabel
                  value={t('Secure room')}
                  control={<Radio color="primary" />}
                  label={t('Secure room')}
                />
                <FormControlLabel
                  value={t('Authorized workspace')}
                  control={<Radio color="primary" />}
                  label={t('Authorized workspace')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item className="input-margin">
            <FormControl component="fieldset" className={classes.fullWidth}>
              <FormLabel component="legend" required>
                {t('Required tools')}
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Default tools"
                      color="primary"
                      checked
                      disabled
                    />
                  }
                  label={
                    <>
                      <Typography variant="body2">
                        {t('Default tools')}
                      </Typography>
                      <Typography variant="caption" component="p">
                        {t(
                            'Default tools (Adobe Reader DC, Java, LibreOffice, Office 2019, Power BI, ProjectLibre, Python, R, RStudio, RTools, VSCode',
                        )}
                      </Typography>
                    </>
                  }
                />

                <FormControlLabel
                  control={<Checkbox name="SAS" color="primary" />}
                  label={
                    <>
                      <Typography variant="body2">{t('SAS')}</Typography>
                      <Typography variant="caption" component="p">
                        {t('Includes SAS 9.4 and SAS Enterprise Guide')}
                      </Typography>
                    </>
                  }
                />

                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={t('SPSS')}
                  color="primary"
                  className={classes.fullWidth}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={t('STATA')}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default ProjectDetails;
