import React from 'react';
import {AppBar, Toolbar, MenuItem, Button, ListItemText, Menu} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepPurple} from '@material-ui/core/colors';
import BrandingStatsCan from '../../../Components/Headers/BrandingStatsCan';
import Language from '../../../Components/Headers/Language';
import SendIcon from '@material-ui/icons/Send';
import ExitToApp from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      'backgroundColor': theme.palette.common.white,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

const defaultStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1200,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: deepPurple[500],
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      minHeight: theme.spacing(16),
    },
  },
  branding: {
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
    '& img': {
      height: theme.spacing(3),
    },
  },
  lang: {
    marginRight: theme.spacing(1),
    textAlign: 'right',
    flexGrow: 1,
  },
  menu: {
    margin: theme.spacing(3, 0, 3, 0),
  },
  button: {
    'backgroundColor': 'white',
    'boxShadow': 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: '#FFF',
      boxShadow: 'none',
    },
  },
  purple: {
    backgroundColor: deepPurple[500],
  },
}));

export default function DefaultHeader(props) {
  const classes = defaultStyles();

  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  },
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state]);

  return (
    <React.Fragment>
      <AppBar
        className={`${classes.appBar} ${props.flat && classes.flatHeader}`}
      >
        <Toolbar className={classes.toolbar}>
          <Menu className={classes.menu} />
          <div className={classes.branding}>
            <BrandingStatsCan />
          </div>
          <div className={classes.lang}>
            <Language />
          </div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            className={classes.button}
            onClick={handleClick}
          >
            <Avatar className={classes.small}><span className={classes.purple}>A</span>
            </Avatar>
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ExitToApp>
                <SendIcon fontSize="small" />
              </ExitToApp>
              <ListItemText primary="Logout" />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

