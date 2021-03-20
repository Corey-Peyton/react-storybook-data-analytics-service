import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import Icon from '@mdi/react';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import {
  SnackbarAssignLead,
  SnackbarSaveRequest,
} from '../CommonComponents/Snackbars';
import {DialogAssign} from '../CommonComponents/DialogBox';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
  },
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
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
  vettingColumn: {
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
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
}));

function ToolBarAssign(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    dialogAssign: false,
    snackbarSave: false,
    snackbarAssign: false,
  });

  const handleOpen = (element) => {
    setOpen({...open, [element]: true});
  };

  const handleClose = (element) => {
    setOpen({...open, [element]: false});
  };

  const handleOpened = (element) => {
    setState({...state, [element]: true});
  };

  const handleClosed = (element) => {
    setState({...state, [element]: false});
  };

  const [state, setState] = React.useState({
  });

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Back to vetting requests dashboard"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        Vetting requests dashboard
      </Typography>
      <Button
        color="primary"
        className={classes.headerBtn}
        onClick={() => handleOpened('dialogAssign')}
        startIcon={
          <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        }
      >
        <Typography variant="subtitle2" color="textSecondary">
          Assign to me
        </Typography>
      </Button>
      <DialogAssign
        toggleDialog={() => handleClosed('dialogAssign')}
        open={state.dialogAssign}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
        onClick={() => handleOpen('snackbarSave')}
      >
        Save
      </Button>
      {/* Save request snackbar */}
      <SnackbarSaveRequest
        open={open.snackbarSave}
        handleClose={() => handleClose('snackbarSave')}
      />
      {/* Assign to me snackbar */}
      <SnackbarAssignLead
        open={open.snackbarAssign}
        handleClose={() => handleClose('snackbarAssign')}
      />
    </Toolbar>
  );
}

export default ToolBarAssign;
