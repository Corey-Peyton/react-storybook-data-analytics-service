import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@mdi/react';
import PageReloadIcon from '../CommonComponents/PageReloadIcon';
import {
  mdiFileDocumentOutline,
  mdiPencil,
  mdiEye,
  mdiShare,
} from '@mdi/js';

import CustomizedSnackbar from '../CommonComponents/CustomizedSnackbar';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    width: 'auto',
    minWidth: 0,
    paddingRight: theme.spacing(2),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    disableScrollLock={false}
    elevation={4}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export default function CustomizedMenus(props) {
  let StyledMenuVar;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState({
    snackbar: false,
  });
  const [action, setAction] = React.useState({
    message: '',
    severity: '',
  });

  const actionList= {
    message: {
      withdraw: 'Vetting request has been withdrawn',
      reopen: 'Vetting request has been reopened',
      submit: 'Vetting request has been submitted',
      delete: 'Vetting request has been deleted',
    },
    severity: {
      withdraw: 'success',
      reopen: 'success',
      submit: 'success',
      delete: 'error',
    },
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const triggerAction = (messageVal, severityVal) => {
    setAction({...action, message: messageVal, severity: severityVal});
    setOpen({...open, snackbar: true});
    handleClose();
  };

  const toggleSummary = () =>{
    handleClose();
    props.contextSummaryClick();
  };

  const toggleSnackbar = (value) => {
    setOpen({...open, snackbar: !open.snackbar});
    handleClose();
  };

  if (props.status === 'Draft') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiPencil} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Edit</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.submit, actionList.severity.submit)}>
          <ListItemIcon className={classes.listItemIcon}>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Submit request</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.withdraw, actionList.severity.withdraw)}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else if (props.status === 'Submitted') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiEye} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">View request</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.withdraw, actionList.severity.withdraw)}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else if (props.status === 'Update requested') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiEye} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">View request</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.withdraw, actionList.severity.withdraw)}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.submit, actionList.severity.submit)}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiShare} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Resubmit request</Typography>} />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else if (props.status === 'Disclosure analysis') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => triggerAction(actionList.message.withdraw, actionList.severity.withdraw)}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else if (props.status === 'Withdrawn') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => triggerAction(actionList.message.reopen, actionList.severity.reopen)}>
          <ListItemIcon className={classes.listItemIcon}>
            <PageReloadIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Reopen</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => triggerAction(actionList.message.delete, actionList.severity.delete)}>
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Delete</Typography>} />
        </MenuItem>
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else if (props.status === 'Approved') {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  } else {
    StyledMenuVar = (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={toggleSummary}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiFileDocumentOutline} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Summary</Typography>} />
        </MenuItem>
      </StyledMenu>
    );
  }

  return (
    <div>
      <IconButton onClick={handleClick} aria-controls="context-menu" aria-haspopup="true">
        <MoreVertIcon />
      </IconButton>
      {StyledMenuVar}

      <CustomizedSnackbar
        open={open.snackbar}
        severity={action.severity}
        message={action.message}
        toggleSnackbar={toggleSnackbar}/>
    </div>
  );
}
