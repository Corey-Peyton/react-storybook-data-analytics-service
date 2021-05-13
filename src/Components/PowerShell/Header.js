import React from 'react';
import {
  AppBar,
  Toolbar,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import BrandingStatsCan from '../../Components/Headers/BrandingStatsCan';
import Language from '../../Components/Headers/Language';


const defaultStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1200,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
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
  button: {
    'backgroundColor': 'white',
    'boxShadow': 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: '#FFF',
      boxShadow: 'none',
    },
  },
  iconButton: {
    marginRight: theme.spacing(-0.5),
  },
}));

export default function DefaultHeader(props) {
  const classes = defaultStyles();

  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });

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
          <div className={classes.branding}>
            <BrandingStatsCan />
          </div>
          <div className={classes.lang}>
            <Language />
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
