import {AppBar, Button, IconButton, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import * as constants from '../../../../Theme/constants';
import Branding from './CommonComponents/Branding';
import ElevationScroll from './CommonComponents/ElevationScroll';
import Language from './CommonComponents/Language';
import NavMenu from './CommonComponents/NavMenu';

const homeStyles = makeStyles((theme) => ({
  accountOptions: {
  },
  actionButtons: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      flexGrow: 1,
    },
  },
  appBar: {
    'backgroundColor': theme.palette.common.white,
    'color': theme.palette.text.primary,
    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& #search-btn': {
      visibility: 'hidden',
    },
    '&.MuiPaper-elevation4 #search-btn': {
      visibility: 'visible',
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiToolbar-root': {
        justifyContent: 'flex-start',
      },
    },
  },
  branding: {
    'width': '30%',
    '& img': {
      height: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(2.5),
        marginTop: theme.spacing(1),
      },
    },
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  nav: {
    'textAlign': 'center',
    'padding': 0,
    'height': theme.spacing(8),
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '& li': {
      display: 'inline-block',
    },
    '& a': {
      margin: theme.spacing(0, 2, 0, 2),
    },
  },
  navMenu: {
  },
  lang: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      '& button': {
        paddingRight: 0,
      },
    },
  },
  search: {
  },
}));

export default function HomePageHeader(props) {
  const classes = homeStyles();
  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });
  const isMdScreen = state.windowWidth < constants.MD_SCREEN;

  React.useEffect(() => {
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            {isMdScreen && (
              <nav className={classes.navMenu}>
                <NavMenu />
              </nav>
            )}
            <div className={classes.branding}>
              <Branding />
            </div>
            {!isMdScreen && (
              <nav aria-labelledby="mainmenulabel">
                <span id="mainmenulabel" className="screen-reader-text">
                  Main menu
                </span>
                <ul className={classes.nav}>
                  <li>
                    <Button href="https://www150.statcan.gc.ca/n1/en/type/data?subject_levels=25">
                      Datasets
                    </Button>
                  </li>
                  <li>
                    <Button href="https://www.statcan.gc.ca/eng/interact/datavis">
                      Visualizations
                    </Button>
                  </li>
                  <li>
                    <Button href="#">
                      Community
                    </Button>
                  </li>
                  <li>
                    <Button href="#">
                      Services
                    </Button>
                  </li>
                  <li>
                    <Button href="#">
                      Partners
                    </Button>
                  </li>
                </ul>
              </nav>
            )}
            <div className={classes.actionButtons}>
              <div className={classes.search}>
                <IconButton
                  id="search-btn"
                  color="primary"
                >
                  <SearchIcon />
                  <span className="screen-reader-text">Search</span>
                </IconButton>
              </div>
              <div className={classes.lang}>
                <Language />
              </div>
              <div className={classes.accountOptions}>
                <Button component={RouterLink} to="/sign-in" variant="outlined" color="primary">
                Sign&nbsp;in
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

