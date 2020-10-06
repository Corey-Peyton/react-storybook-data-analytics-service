import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Notifications from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/icons/Menu';
import {deepPurple} from '@material-ui/core/colors';
import {SM_SCREEN} from '../../../Theme/constants';
import BrandingStatsCan from '../../../Components/Headers/BrandingStatsCan';
import Language from '../../../Components/Headers/Language';


const defaultStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1200,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  notification: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    color: theme.palette.grey[600],
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
  purple: {
    backgroundColor: deepPurple[500],
  },
}));

export default function DefaultHeader(props) {
  const classes = defaultStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });

  const isSmScreen = state.windowWidth < SM_SCREEN;

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
          <Notifications className={classes.notification}/>
          <Avatar className={classes.small}><span classnName={classes.purple}>A</span>
          </Avatar>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
