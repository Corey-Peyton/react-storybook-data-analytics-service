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
import {mdiFileDocumentOutline} from '@mdi/js';

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

  if (props.status === 'active') {
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
  } else if (props.status === 'withdrawn') {
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
            <svg viewBox="0 0 24 24" width={20} height={20}>
              <path fill="currentColor" d="M18 14.5C19.11 14.5 20.11 14.95 20.83 15.67L22 14.5V18.5H18L19.77 16.73C19.32 16.28 18.69 16 18 16C16.62 16 15.5 17.12 15.5 18.5C15.5 19.88 16.62 21 18 21C18.82 21 19.54 20.61 20 20H21.71C21.12 21.47 19.68 22.5 18 22.5C15.79 22.5 14 20.71 14 18.5C14 16.29 15.79 14.5 18 14.5M14 2L20 8V12.17C19.5 12.06 19 12 18.5 12L18 12V9H13V4H6V20H12.17C12.34 20.72 12.63 21.39 13 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14Z" />
            </svg>
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
  } else if (props.status === 'approved') {
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
