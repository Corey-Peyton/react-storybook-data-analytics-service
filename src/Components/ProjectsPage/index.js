import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  AppBar,
  Badge,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

import {HEAD_H, HEAD_H_XS} from '../../Theme/constants';
import BypassBlocks from '../CommonComponents/BypassBlocks';
import Footer from '../Footers/Footer';
import DefaultHeader from '../Headers/DefaultHeader';
import ProjectApps from './ProjectApps';
import ProjectDatasets from './ProjectDatasets';
import ProjectDetails from './ProjectDetails';
import ProjectTabs from './ProjectTabs';

export const DRAWER_WIDTH = 420;

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    position: 'fixed',
    top: 0,
    left: 'auto',
  },
  toolbar: {
    minHeight: '88px',
    display: 'block',
    marginTop: HEAD_H,
    [theme.breakpoints.down('xs')]: {
      marginTop: HEAD_H_XS,
    },
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: `calc(88px + ${HEAD_H}px)`,
    [theme.breakpoints.down('xs')]: {
      marginTop: `calc(88px + ${HEAD_H_XS}px)`,
    },
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: DRAWER_WIDTH,
  },
}));

function a11yProps(index) {
  return {
    'id': `projects-tab-${index}`,
    'aria-controls': `projects-tabpanel-${index}`,
  };
}

export default function ProjectsPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [open, setOpen] = React.useState({
    details: false,
    apps: false,
    datasets: false,
  });
  const mainRef = React.createRef();
  const aboutRef = React.createRef();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      let el = this;

      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  const toggleDetailsDrawer = (event) => {
    setOpen({...open, details: !open.details});
    if (!open.details) {
      if (document.getElementById('active-btn') != null) {
        // search the page for existing active-btn ID and remove it
        document.getElementById('active-btn').removeAttribute('id');
      }
      if (event.target !== document.querySelector('button')) {
        // check if the clicked element is on exactly the <button>
        event.target.closest('button').setAttribute('id', 'active-btn'); // traverse to <button>, designate it the active-btn
      } else {
        event.target.setAttribute('id', 'active-btn'); // if <button> element was clicked, designate it active-btn
      }
      setTimeout(() => {
        // change focus to close button within details drawer
        document.getElementById('details-close').focus();
      }, 200);
    } else {
      if (
        event.target.closest('button').classList.contains('info-btn') &&
        event.target.closest('button').id !== 'active-btn'
      ) {
        setOpen({...open, details: false});
        document.getElementById('active-btn').removeAttribute('id');
        event.target.closest('button').setAttribute('id', 'active-btn'); // if <button> element was clicked, designate it active-btn

        setTimeout(() => {
          setOpen({...open, details: true});
          document.getElementById('details-close').focus();
        }, 500);
      } else {
        setTimeout(() => {
          // change focus to active-btn
          document.querySelector('#active-btn').focus();
        }, 200);
      }
    }
  };

  const toggleAppsDrawer = () => {
    if (!open.apps) {
      setOpen({...open, apps: true});
      setTimeout(() => {
        // change focus to apps back button
        document.getElementById('apps-back-btn').focus();
        setOpen({...open, details: false, apps: true});
      }, 200);
    } else {
      setOpen({...open, details: true});
      setTimeout(() => {
        // change focus to close button within details drawer
        setOpen({...open, details: true, apps: false});
        document.getElementById('apps-btn').focus();
      }, 200);
    }
  };

  const toggleDatasetsDrawer = () => {
    if (!open.datasets) {
      setOpen({...open, datasets: true});
      setTimeout(() => {
        // change focus to datasets back button
        document.getElementById('datasets-back-btn').focus();
        setOpen({...open, details: false, datasets: true});
      }, 200);
    } else {
      setOpen({...open, details: true});
      setTimeout(() => {
        // change focus to close button within details drawer
        setOpen({...open, details: true, datasets: false});
        document.getElementById('datasets-btn').focus();
      }, 200);
    }
  };

  const toggleAllDrawers = () => {
    setOpen({...open, apps: false, datasets: false, details: false});

    setTimeout(() => {
      // change focus to active-btn
      document.querySelector('#active-btn').focus();
    }, 200);
  };

  React.useEffect(() => {
    document.title = t('DAaaS - My Projects');
  });

  return (
    <React.Fragment>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <DefaultHeader flat={true} />
      <AppBar
        position="fixed"
        component="div"
        elevation={4}
        className={classes.appBar}
        ref={mainRef}
        tabIndex="-1"
      >
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" gutterBottom>
            {t('My Projects')}
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label={t('Projects list')}
          >
            <Tab
              label={
                <React.Fragment>
                  <span className="tab-badge">
                    {t('Active')}{' '}
                    <Badge
                      badgeContent={3}
                      color={value === 0 ? 'primary' : 'default'}
                    />
                  </span>
                </React.Fragment>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <React.Fragment>
                  <span className="tab-badge">
                    {t('Expired')}{' '}
                    <Badge
                      badgeContent={4}
                      color={value === 1 ? 'primary' : 'default'}
                    />
                  </span>
                </React.Fragment>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <React.Fragment>
                  <span className="tab-badge">
                    {t('All')}{' '}
                    <Badge
                      badgeContent={200}
                      color={value === 2 ? 'primary' : 'default'}
                    />
                  </span>
                </React.Fragment>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open.details || open.apps || open.datasets,
        })}
      >
        <ProjectTabs toggleDetailsDrawer={toggleDetailsDrawer} value={value} />
        <ProjectDetails
          open={open.details}
          toggleDetailsDrawer={toggleDetailsDrawer}
          toggleAppsDrawer={toggleAppsDrawer}
          toggleDatasetsDrawer={toggleDatasetsDrawer}
        />
        <ProjectApps
          open={open.apps}
          toggleAppsDrawer={toggleAppsDrawer}
          toggleAllDrawers={toggleAllDrawers}
        />
        <ProjectDatasets
          open={open.datasets}
          toggleDatasetsDrawer={toggleDatasetsDrawer}
          toggleAllDrawers={toggleAllDrawers}
        />
        <Footer ref={aboutRef} tabindex="-1" />
      </div>
    </React.Fragment>
  );
}
