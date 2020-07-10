import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';
import {mdiAccountCircle} from '@mdi/js';
import {Icon} from '@mdi/react';
import {SM_SCREEN} from '../../Theme/constants';

import SearchBar from '../SearchBar';
import Branding from './Branding';
import Language from './Language';

const defaultStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1200,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  flatHeader: {
    boxShadow: 'none',
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
      // order: 1,
      flexGrow: 1,
    },
    '& img': {
      height: theme.spacing(3),
    },
  },
  lang: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      // order: 2,
    },
  },
  signIn: {
    [theme.breakpoints.down('sm')]: {
      // order: 3,
    },
  },
  search: {
    'flexGrow': 1,
    'textAlign': 'center',
    [theme.breakpoints.down('sm')]: {
      // order: 4,
      flexBasis: '100%',
    },
    '& > div': {
      width: '60%',
      display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
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
          <div className={classes.branding}>
            <Branding />
          </div>
          {!isSmScreen && (
            <div className={classes.search}>
              <SearchBar
                label={t('Search')}
                placeholder={t('Start searching')}
              />
            </div>
          )}
          <div className={classes.lang}>
            <Language />
          </div>
          <Button
            className={classes.signIn}
            component={RouterLink}
            to="/sign-in"
            variant="outlined"
            color="primary"
            startIcon={<Icon path={mdiAccountCircle} size={1} />}
          >
            {t('Sign in')}
          </Button>
          {isSmScreen && (
            <div className={classes.search}>
              <SearchBar
                label={t('Search')}
                placeholder={t('Start searching')}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
