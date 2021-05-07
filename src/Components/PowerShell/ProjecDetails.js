import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  inputMargin: {
    margin: theme.spacing(1, 0),
    display: 'block',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  datePicker: {
    marginRight: theme.spacing(4.75),
  },
  fullWidth: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

function ProjectDetails(props) {
  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };
  const handleToDateChange = (date) => {
    setState({...state, selectedToDate: date});
  };

  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    selectedFromDate: null,
    selectedToDate: null,
    selectedDateType: 10,
  });

  return (
    <React.Fragment>
      <Box>
        <Alert severity="error" className="mt-1 mb-2">
          {t('Complete all required fields to advance to the next step')}
        </Alert>
        <Grid item className="input-margin">
          <FormControl component="fieldset">
            <FormControl
              component="fieldset"
              className={classes.inputMargin}
              required
            >
              <FormLabel component="legend">{t('Access location')}</FormLabel>
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
          </FormControl>
        </Grid>
        <Grid item className="input-margin">
          <FormControl component="fieldset" className={classes.inputMargin}>
            <FormControl
              component="fieldset"
              className={classes.inputMargin}
              required
            >
              <FormLabel component="legend">{t('Environment')}</FormLabel>
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
          </FormControl>
        </Grid>
        <TextField
          variant="outlined"
          id={t('primaryinvestigator')}
          fullWidth
          className="mb-2"
          margin="dense"
          label={t('Primary investigator')}
          required
        />
        <TextField
          variant="outlined"
          id="contractnumber"
          fullWidth
          className="mb-2"
          margin="dense"
          label={t('Contract number')}
          error
          required
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id={t('start-date')}
            variant="inline"
            margin="dense"
            className="mb-2"
            InputProps={{readOnly: true}}
            format="MM/dd/yyyy"
            label={t('Contract start date')}
            value={state.selectedFromDate}
            maxDate={state.selectedToDate}
            fullWidth
            autoOk
            disablePast
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
            inputVariant="outlined"
            fullWidth
            KeyboardButtonProps={{
              'aria-label': t('Select end date'),
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl
          component="fieldset"
          className={classes.inputMargin}
          required
        >
          <FormLabel component="legend" className="mt-2" required>
            {t('Required tools')}
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Default tools" color="primary" />}
              label={
                <>
                  <Typography>{t('Default tools')}</Typography>
                  <Typography variant="caption">
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
                  <Typography>{t('SAS')}</Typography>
                  <Typography variant="caption">
                    {t('Includes SAS 9.4 and SAS Enterprise Guide')}
                  </Typography>
                </>
              }
            />

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t('SPSS')}
              color="primary"
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t('STATA')}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </React.Fragment>
  );
}

export default ProjectDetails;
