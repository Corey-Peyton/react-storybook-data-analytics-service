
import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, Tab, Tabs, Toolbar, Typography, TextField, Button} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {sortByKey} from '../../Utils/sorting';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

import {HEAD_H, HEAD_H_XS} from '../../Theme/constants';
import BypassBlocks from '../BypassBlocks';
import Footer from '../Footers/Footer';
import Header from './CommonComponents/Header';
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
  appBarDiv1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  appBarDiv2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: `calc(120px + ${HEAD_H}px)`,
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
  projectDropdown: {
    float: 'right',
    marginLeft: 'auto',
    marginBottom: theme.spacing(1),
  },
  tabs: {
    float: 'left',
  },
  selectTab: {
    marginLeft: 'auto',
    width: 300,
    float: 'right',
    marginBottom: theme.spacing(1),
  },
}));

function a11yProps(index) {
  return {
    'id': `projects-tab-${index}`,
    'aria-controls': `projects-tabpanel-${index}`,
  };
}

export default function RequestListResearcher(props) {
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
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
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
      if (document.getElementById('active-btn') != null) { // search the page for existing active-btn ID and remove it
        document.getElementById('active-btn').removeAttribute('id');
      }
      if (event.target !== document.querySelector('button')) { // check if the clicked element is on exactly the <button>
        event.target.closest('button').setAttribute('id', 'active-btn'); // traverse to <button>, designate it the active-btn
      } else {
        event.target.setAttribute('id', 'active-btn'); // if <button> element was clicked, designate it active-btn
      }
      setTimeout(() => { // change focus to close button within details drawer
        document.getElementById('details-close').focus();
      }, 200);
    } else {
      if (event.target.closest('button').classList.contains('info-btn') && event.target.closest('button').id !== 'active-btn' ) {
        setOpen({...open, details: false});
        document.getElementById('active-btn').removeAttribute('id');
        event.target.closest('button').setAttribute('id', 'active-btn'); // if <button> element was clicked, designate it active-btn

        setTimeout(() => {
          setOpen({...open, details: true});
          document.getElementById('details-close').focus();
        }, 500);
      } else {
        setTimeout(() => { // change focus to active-btn
          document.querySelector('#active-btn').focus();
        }, 200);
      }
    }
  };

  const projectList = [
    {title: 'DAaas-1234567'},
    {title: 'DAaas-3395795'},
    {title: 'A short project name'},
    {title: 'A very very very very very long project name'},
  ];

  // const projectsSorted = sortByKey(projectList, 'title');

  React.useEffect(() => {
    document.title = t('DAaaS - Vetting requests list');
  });

  return (
    <React.Fragment>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <Header flat={true}/>
      <AppBar
        position="fixed"
        component="div"
        elevation={4}
        className={classes.appBar}
        ref={mainRef} tabIndex="-1"
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.appBarDiv1}>
            <Typography component="h1" variant="h6" gutterBottom>
              {t('Vetting requests list')}
            </Typography>
            <Button variant="contained" color="primary">
              {t('New vetting request')}
            </Button>
          </div>
          <div className={classes.appBarDiv2}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label={t('Projects list')}
              className={classes.tabs}
            >
              <Tab
                label={
                  <React.Fragment>
                    <span className="tab-badge">
                      {t('All')}{' '}
                    </span>
                  </React.Fragment>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <React.Fragment>
                    <span className="tab-badge">
                      {t('Draft')}{' '}
                    </span>
                  </React.Fragment>
                }
                {...a11yProps(1)}
              />
              <Tab
                label={
                  <React.Fragment>
                    <span className="tab-badge">
                      {t('Awaiting review')}{' '}
                    </span>
                  </React.Fragment>
                }
                {...a11yProps(2)}
              />
              <Tab
                label={
                  <React.Fragment>
                    <span className="tab-badge">
                      {t('Approved')}{' '}
                    </span>
                  </React.Fragment>
                }
                {...a11yProps(3)}
              />
              <Tab
                label={
                  <React.Fragment>
                    <span className="tab-badge">
                      {t('Closed')}{' '}
                    </span>
                  </React.Fragment>
                }
                {...a11yProps(4)}
              />
            </Tabs>
            <FormControl variant="outlined" className={classes.selectTab}>
              <InputLabel id="demo-simple-select-outlined-label">Search project</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Search project"
              >
                <MenuItem value="">&nbsp;</MenuItem>
                {projectList.map((project) => {
                  return (
                    <MenuItem value={project.title}>{project.title}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div></Toolbar>
      </AppBar>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open.details || open.apps || open.datasets,
        })}
      >
        <ProjectTabs
          toggleDetailsDrawer={toggleDetailsDrawer}
          value={value}
        />
        <ProjectDetails
          open={open.details}
          toggleDetailsDrawer={toggleDetailsDrawer}
        />
        <Footer ref={aboutRef} tabindex="-1"/>
      </div>
    </React.Fragment>
  );
}
