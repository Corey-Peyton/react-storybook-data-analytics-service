import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DateFnsUtils from '@date-io/date-fns';
import {Drawer} from '../../CommonComponents/Drawer';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import {makeStyles, useTheme} from '@material-ui/core/styles';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import {VariableSizeList} from 'react-window';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
  listbox: {
    'boxSizing': 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
}));

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const {data, index, style} = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref,
) {
  const {children, ...other} = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {noSsr: true});
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const OPTIONS = Array.from(new Array(10000))
    .map(() => random(10 + Math.ceil(Math.random() * 20)))
    .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

export function AddVirtualMachine(props) {
  const {t} = useTranslation();

  return (
    <>
      <Drawer
        open={props.open}
        title={t('Add virtual machine')}
        content={<MachineDetailsContent />}
        primaryButton={t('Add')}
        secondaryButton={t('Cancel')}
        handlePrimaryClick={props.addVirtualMachine}
        handleSecondaryClick={props.closeDrawer}
        toggleDrawer={props.closeDrawer}
      />
    </>
  );
}

export function EditVirtualMachine(props) {
  const {t} = useTranslation();

  return (
    <>
      <Drawer
        open={props.open}
        title={t('Edit virtual machine')}
        content={<MachineDetailsContent />}
        primaryButton={t('Update')}
        secondaryButton={t('Cancel')}
        handlePrimaryClick={props.editVirtualMachine}
        handleSecondaryClick={props.closeDrawer}
        toggleDrawer={props.closeDrawer}
      />
    </>
  );
}

function MachineDetailsContent(props) {
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
  return (
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
            id="cloudaccountemail"
            disableListWrap
            classes={classes}
            ListboxComponent={ListboxComponent}
            renderGroup={renderGroup}
            options={OPTIONS}
            fullWidth
            groupBy={(option) => option[0].toUpperCase()}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Cloud account email"
                required
              />
            )}
            renderOption={(option) => <Typography noWrap>{option}</Typography>}
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
                </Grid>
              </Grid>
              <Grid container>
                <Grid>
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
}
