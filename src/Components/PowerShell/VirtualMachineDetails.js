import React from 'react';
import {
  SnackbarDeleteVirtualMachine,
} from '../VettingApp/CommonComponents/Snackbars';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {DialogDelete} from '../VettingApp/CommonComponents/DialogBox';
import {green} from '@material-ui/core/colors';
import {SnackbarEditVirtualMachine} from '../VettingApp/CommonComponents/Snackbars';
import {EditVirtualMachine, AddVirtualMachine} from './AddVirtualMachine';
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
import {Typography, Drawer, Icon, Divider} from '@material-ui/core';
import {
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
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
  card: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
}));

function VirtualMachine(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState({
    snackbarAddVirtualMachine: false,
    addVirtualMachine: false,
    dialogDelete: false,
  });

  const [expanded, setExpanded] = React.useState(false);

  const editVirtualMachine = () => {
    setOpen({
      ...open,
      snackbarEditVirtualMachine: true,
      editVirtualMachine: false,
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
    setOpen({...open, [drawer]: state});
  };

  const deleteFile = () => {
    setOpen({...open, snackbarDelete: true, dialogDelete: false});
  };

  const addVirtualMachine = () => {
    setOpen({
      ...open,
      snackbarAddVirtualMachine: true,
      addVirtualMachine: false,
    });
  };

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  return (
    <React.Fragment>
      <Typography variant="body1" className="mb-2">
        You need to add virtual machine details to submit this request
        successfully
      </Typography>
      <Card className={classes.card} variant="outlined">
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
            <Typography variant="body1">Personal information</Typography>

            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Security clearance expiry date
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  02/23/2021
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Researcher ID
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  54674
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Organization
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  Statistics Canada
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiAccountOutline} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Username
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  some.email
                </Typography>
              </div>
            </div>
            <Typography variant="body1">Contact information</Typography>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiPhone} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Phone number
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  555-867-5309
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiEmailOutline} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Email
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  email@email.com
                </Typography>
              </div>
            </div>
            <Typography variant="body1">VDL information</Typography>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiMonitor} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Virtual machine name
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  STC-0412-ST
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiTranslate} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Virtual machine language
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  English
                </Typography>
              </div>
            </div>
            <div className={classes.powershellRow}>
              <div className={clsx(classes.powershellColumn, classes.widthAuto)}>
                <Icon path={mdiHammerScrewdriver} size={1} />
              </div>
              <div className={classes.powershellColumn}>
                <Typography className={classes.powershellText} variant="body2">
                  Required tools
                </Typography>
                <Typography className={classes.powershellText} variant="body2">
                  02/23/2021
                </Typography>
              </div>
            </div>
          </CardContent>
          <Divider className={classes.divider} />
        </Collapse>
        <CardActions>
          <Button
            color="primary"
            variant="text"
            onClick={(e) => toggleDrawer(e, 'editVirtualMachine', true)}
          >
            Edit
          </Button>
          <Button
            color="primary"
            variant="text"
            onClick={() => handleClickOpen('dialogDelete')}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Drawer
        anchor="right"
        open={open.editVirtualMachine}
        className={classes.drawer}
      >
        <EditVirtualMachine
          toggleDrawer={toggleDrawer}
          editVirtualMachine={editVirtualMachine}
          handleClickOpen={handleClickOpen}
        />
      </Drawer>
      <SnackbarEditVirtualMachine
        open={open.snackbarEditVirtualMachine}
        handleClose={() => handleClickClose('snackbarEditVirtualMachine')}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => toggleDrawer(e, 'addVirtualMachine', true)}
      >
        Add virtual machine details
      </Button>
      <Drawer
        anchor="right"
        open={open.addVirtualMachine}
        className={classes.drawer}
      >
        <AddVirtualMachine
          toggleDrawer={toggleDrawer}
          addVirtualMachine={addVirtualMachine}
          handleClickOpen={handleClickOpen}
        />
      </Drawer>
      <SnackbarAddVirtualMachine
        open={open.snackbarAddVirtualMachine}
        handleClose={() => handleClickClose('snackbarAddVirtualMachine')}
      />
      <DialogDelete
        submitDialog={deleteFile}
        open={open.dialogDelete}
        toggleDialog={() => handleClickClose('dialogDelete')}
      />
      <SnackbarDeleteVirtualMachine
        open={open.snackbarDelete}
        handleClose={() => handleClickClose('snackbarDelete')}
      />
    </React.Fragment>
  );
}
export default VirtualMachine;
