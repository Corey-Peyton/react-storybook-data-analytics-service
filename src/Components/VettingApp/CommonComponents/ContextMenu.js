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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  let StyledMenuVar;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Send request</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
          <ListItemText primary={<Typography variant="body2">View</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon path={mdiShare} size={1} className="icon-grey" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Resubmit request</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Withdraw</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <PageReloadIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Reopen</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Delete</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
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
    </div>
  );
}
