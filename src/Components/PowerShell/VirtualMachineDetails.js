import React from 'react';
import {Icon} from '@mdi/react';
import {SnackbarDeleteVirtualMachine} from '../VettingApp/CommonComponents/Snackbars';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {DialogDelete} from '../VettingApp/CommonComponents/DialogBox';
import {useTranslation} from 'react-i18next';
import {AddVirtualMachine, EditVirtualMachine} from './MachineDetailsDrawer';
import {green} from '@material-ui/core/colors';
import {SnackbarEditVirtualMachine} from '../VettingApp/CommonComponents/Snackbars';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {SnackbarAddVirtualMachine} from '../VettingApp/CommonComponents/Snackbars';
import {Typography, Divider, Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {
  mdiSmartCardOutline,
  mdiFileDocumentOutline,
  mdiDomain,
  mdiAccountOutline,
  mdiPhone,
  mdiEmailOutline,
  mdiMonitor,
  mdiTranslate,
  mdiHammerScrewdriver,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  inputMarginBlock: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    display: 'block',
  },
  paddingTopBottom: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  cardHeader: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    backgroundColor: '#DDDDDD',
  },
  avatar: {
    backgroundColor: green[500],
    color: theme.palette.grey[100],
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
  },
  powershellSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  powershellRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  powershellColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  widthAuto: {
    width: 'auto !important',
  },
  powershellText: {
    paddingLeft: theme.spacing(1),
  },
  powershellTextHelperText: {
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    paddingBottom: theme.spacing(0),
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
}));

function VirtualMachine(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    snackbarAddVirtualMachine: false,
    snackbarEditVirtualMachine: false,
    snackbarDelete: false,
    addVirtualMachine: false,
    editVirtualMachine: false,
    dialogDelete: false,
    showCard: false,
  });

  const [expanded, setExpanded] = React.useState(false);

  const editVirtualMachine = () => {
    setState({
      ...state,
      snackbarEditVirtualMachine: true,
      editVirtualMachine: false,
    });
  };

  const addVirtualMachine = () => {
    setState({
      ...state,
      snackbarAddVirtualMachine: true,
      addVirtualMachine: false,
      showCard: true,
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleDrawer = (event, drawer, state) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({...state, [drawer]: state});
  };

  const deleteFile = () => {
    setState({...state, snackbarDelete: true, dialogDelete: false});
  };

  const handleClickOpen = (element) => {
    setState({...state, [element]: true});
  };

  const handleClickClose = (element) => {
    setState({...state, [element]: false});
  };

  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Grid container className={classes.paddingTopBottom}>
        <Box>
          <Typography variant="body1" className="input-margin">
            {t(
                'Virtual machine details are required to successfully submit this request.',
            )}
          </Typography>
          {state.showCard === true && (
            <Card className={classes.card} variant="outlined">
              <div className={classes.cardHeader}>
                <Typography className={classes.powershellColumn}>
                  STC-0412-ST
                </Typography>
                <Typography className={classes.powershellColumn}>
                  {t('Virtual machine name')}
                </Typography>
              </div>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    BB
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                }
                title="Some email"
                subheader="email@email.com"
              />
              <Divider className={classes.divider} />
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="h6">
                    {t('Personal information')}
                  </Typography>

                  <div className="classes.powershellRow">
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiFileDocumentOutline} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Security clearance expiry date')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        02/23/2021
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiSmartCardOutline} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        Researcher ID
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        54674
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiDomain} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Organization')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('Statistics Canada')}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiAccountOutline} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Username')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('some.email')}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="h6">
                    {t('Contact information')}
                  </Typography>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiPhone} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Phone number')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        555-867-5309
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiEmailOutline} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Email')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('email@email.com')}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="h6">VDL information</Typography>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiMonitor} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Virtual machine name')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        STC-0412-ST
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiTranslate} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellText}
                        variant="body1"
                      >
                        {t('Virtual machine language')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('English')}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.powershellRow}>
                    <div
                      className={clsx(
                          classes.powershellColumn,
                          classes.widthAuto,
                      )}
                    >
                      <Icon path={mdiHammerScrewdriver} size={1} />
                    </div>
                    <div className={classes.powershellColumn}>
                      <Typography
                        className={classes.powershellTextHelperText}
                        variant="body1"
                      >
                        {t('Required tools')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('Default tools')}
                      </Typography>
                      <Typography
                        className={classes.powershellTextHelperText}
                        variant="body2"
                      >
                        {t(
                            '(Adobe Reader DC, Java, LibreOffice, Office 2019, Power BI, ProjectLibre, Python, R, RStudio, RTools, VSCode)',
                        )}
                        '
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('SAS')}
                      </Typography>
                      <Typography
                        className={classes.powershellText}
                        variant="body2"
                      >
                        {t('(Includes SAS 9.4 and SAS Enterprise Guide)')}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Collapse>
              <CardActions className={classes.cardActions}>
                <Button
                  color="primary"
                  variant="text"
                  onClick={(e) => toggleDrawer(e, 'editVirtualMachine', true)}
                >
                  {t('Edit')}
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  onClick={() => handleClickOpen('dialogDelete')}
                >
                  {t('Delete')}
                </Button>
              </CardActions>
            </Card>
          )}
          <AddVirtualMachine
            open={state.addVirtualMachine}
            closeDrawer={() => handleClickClose('addVirtualMachine')}
            addVirtualMachine={addVirtualMachine}
          />
          <EditVirtualMachine
            open={state.editVirtualMachine}
            closeDrawer={() => handleClickClose('editVirtualMachine')}
            editVirtualMachine={editVirtualMachine}
          />
          <SnackbarAddVirtualMachine
            open={state.snackbarAddVirtualMachine}
            handleClose={() => handleClickClose('snackbarAddVirtualMachine')}
          />
          <SnackbarEditVirtualMachine
            open={state.snackbarEditVirtualMachine}
            handleClose={() => handleClickClose('snackbarEditVirtualMachine')}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClickOpen('addVirtualMachine')}
          >
            {t('Add virtual machine details')}
          </Button>
          {/* <Drawer
            anchor="right"
            open={state.addVirtualMachine}
            className={classes.drawer}
          >
            <AddVirtualMachine
              toggleDrawer={toggleDrawer}
              addVirtualMachine={addVirtualMachine}
              handleClickOpen={handleClickOpen}
            />
          </Drawer>
          <SnackbarAddVirtualMachine
            open={state.snackbarAddVirtualMachine}
            handleClose={() => handleClickClose('snackbarAddVirtualMachine')}
          />
          <SnackbarEditVirtualMachine
            open={state.snackbarEditVirtualMachine}
            handleClose={() => handleClickClose('snackbarVirtualMachine')}
          /> */}
          <DialogDelete
            submitDialog={deleteFile}
            open={state.dialogDelete}
            toggleDialog={() => handleClickClose('dialogDelete')}
          />
          <SnackbarDeleteVirtualMachine
            open={state.snackbarDelete}
            handleClose={() => handleClickClose('snackbarDelete')}
          />
        </Box>
      </Grid>
    </React.Fragment>
  );
}
export default VirtualMachine;
