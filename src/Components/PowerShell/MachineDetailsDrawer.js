import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import DateFnsUtils from '@date-io/date-fns';
import {analystList} from '../../Data/fakeData';
import {Drawer} from '../CommonComponents/Drawer';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Checkbox,
  Grid,
  FormGroup,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

export function MachineDetailsDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    snackbarAddVirtualMachine: false,
    addVirtualMachine: false,
    showCard: false,
  });

  const security = [
    {label: 'Statistics Canada'},
    {label: 'Canada Revenue Agency'},
  ];

  const handleFromDateChange = (date) => {
    setState({...state, selectedFromDate: date});
  };

  const [isOpen, setIsOpen] = useState(false);

  const content = () => (
    <>
      <div className={classes.paddingTopBottom}>
        <Typography variant="subtitle1" className="input-margin">
          User details
        </Typography>
        <Typography variant="body2" className="input-margin">
          If the cloud account email cannot be found it means it does not exist
          in Azure Active Directory. Submit a Jira ticket to the
          <Link
            href="https://jirab.statcan.ca/projects/DAZSUPP/summary"
            underline="always"
          >
            Cloud Jira project
          </Link>
          for assistance.
        </Typography>
        <Grid item className="input-margin">
          <Autocomplete
            id="cloudemail"
            options={analystList.map((option) => option.email)}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Cloud account email"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <TextField
          className="input-margin"
          margin="dense"
          id="firstname"
          label="First name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className="input-margin"
          margin="dense"
          id="lastName"
          label="Last name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className="input-margin"
          margin="dense"
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          required
        />
        <Grid item className="input-margin">
          <Autocomplete
            id="organization"
            options={security}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Organization"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <TextField
          className="input-margin"
          margin="dense"
          id="researcherID"
          label="Researcher ID"
          variant="outlined"
          fullWidth
          required
        />
        <Grid item className="input-margin">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="contract-start-date"
              className="input-margin"
              variant="inline"
              label={'Security clearance expiry'}
              open={isOpen}
              onClick={() => setIsOpen(true)}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              InputProps={{readOnly: true}}
              autoOk
              fullWidth
              required
              format="MM/dd/yyyy"
              value={state.selectedFromDate}
              inputVariant="outlined"
              margin="dense"
              onChange={handleFromDateChange}
              disablePast
              PopoverProps={{
                'aria-modal': 'true',
              }}
              KeyboardButtonProps={{
                'aria-label': 'Security clearance expiry',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Typography variant="subtitle1" className="input-margin">
          Contact information
        </Typography>
        <TextField
          className="input-margin"
          margin="dense"
          id="phoneNumber"
          label="Phone number"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className="input-margin"
          margin="dense"
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
        <Typography variant="subtitle1" className="input-margin">
          Virtual machine details
        </Typography>
        <TextField
          className="input-margin"
          margin="dense"
          id="virtualmachinename"
          label="Virtual machine name"
          variant="outlined"
          fullWidth
          required
        />
        <Grid item className="input-margin">
          <FormControl component="fieldset" className={classes.fullWidth}>
            <RadioGroup id="virtualmachinename" name="virtualmachinename">
              <FormLabel required component="legend">
                Virtual machine language
              </FormLabel>
              <FormControlLabel
                control={<Radio color="primary" />}
                value="English"
                label="English"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="French"
                label="French"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item className="input-margin">
          <FormControl component="fieldset" className={classes.fullWidth}>
            <FormLabel component="legend" required>
              Required tools
            </FormLabel>
            <FormGroup>
              <Grid container>
                <Grid>
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
                        <Typography>{t('Default tools')}</Typography>
                        <Typography variant="caption">
                          {t(
                              'Default tools (Adobe Reader DC, Java, LibreOffice, Office 2019, Power BI, ProjectLibre, Python, R, RStudio, RTools, VSCode',
                          )}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid>
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
                </Grid>
              </Grid>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="SPSS"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="STATA"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </div>
    </>
  );
  return (
    <>
      <Drawer
        open={props.open}
        title={t('Add virtual machine')}
        content={content()}
        primaryButton={t('Add')}
        secondaryButton={t('Cancel')}
        handlePrimaryClick={props.addVirtualMachine}
        handleSecondaryClick={props.closeDrawer}
        toggleDrawer={props.closeDrawer}
      />
    </>
  );
}
