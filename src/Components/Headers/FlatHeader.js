import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';

import SearchBar from '../SearchBar';
import Branding from './Branding';
import Language from './Language';
import NavMenu from './NavMenu';

export default function DefaultHeader(props) {
  const classes = defaultStyles();
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <div className={classes.navMenu}>
            <NavMenu />
          </div>
          <div className={classes.branding}>
            <Branding />
          </div>
          <div className={classes.search}>
            <SearchBar label={t('Search')} placeholder={t('Start searching')} />
          </div>
          <div className={classes.lang}>
            <Language />
          </div>
          <div className={classes.accountOptions}>
            <Button component={RouterLink} to="/sign-in" variant="outlined" color="primary">
              {t('Sign in')}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const defaultStyles = makeStyles((theme) => ({
  accountOptions: {
    [theme.breakpoints.down('sm')]: {
      order: 5,
    },
    [theme.breakpoints.down('xs')]: {
      order: 4,
    },
  },
  appBar: {
    'zIndex': 1200,
    'boxShadow': 'none',
    'backgroundColor': theme.palette.common.white,
    'color': theme.palette.text.primary,
    '& .MuiToolbar-root': {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  branding: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
      flexGrow: 1,
      width: 'calc(100vw - 112px)',
    },
    '& img': {
      height: theme.spacing(3),
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(2.5),
        marginTop: theme.spacing(1),
      },
    },
  },
  lang: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      'order': 2,
      'textAlign': 'right',
      '& button': {
        paddingRight: 0,
      },
    },
  },
  navMenu: {
    [theme.breakpoints.down('sm')]: {
      order: 3,
    },
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  search: {
    'flexGrow': 1,
    'textAlign': 'center',
    [theme.breakpoints.down('sm')]: {
      order: 4,
    },
    [theme.breakpoints.down('xs')]: {
      order: 5,
      flexBasis: '100%',
    },
    '& > div': {
      width: '60%',
      display: 'inline-block',
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
}));
