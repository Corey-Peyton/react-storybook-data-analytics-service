import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Typography,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import TableContainerComponent from './Common/TableContainerComponent';
import TabPanel from './Common/DashboardTabPanel';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import SummaryDrawer from './Common/SummaryDrawer';
import ProjectsDrawer from './Common/ProjectsDrawer';
import BypassBlocks from '../../BypassBlocks';
import {requestListResearchers} from '../../../Data/fakeData';
import {DRAWER_WIDTH} from './Common/ProjectsDrawer';

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    position: 'static',
    top: 0,
    left: 'auto',
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  appBarHeader: {
    color: theme.palette.text.primary,
    background: 'white',
    position: 'static',
    top: 0,
    left: 'auto',
    width: '100%',
    padding: theme.spacing(2, 1, 1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    background: theme.palette.grey[100],
    padding: theme.spacing(0, 3, 3, 3),
    paddingTop: theme.spacing(11),
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
  button: {
    height: 36,
  },
  tabs: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.grey[300],
  },
  tabPanel: {
    '& .MuiBox-root': {
      width: '100%',
      padding: 0,
      boxSizing: 'border-box',
      overflowY: 'auto',
      boxShadow: theme.shadows[4],
    },
  },
}));

function createData(id, statusHead, status, researcher, lead, created, updated) {
  return {id, statusHead, status, researcher, lead, created, updated};
}

const rows = requestListResearchers.filter((request) => request.status !== 'Draft' ).map((el, index) =>
  createData(el.id, el.statusHead, el.status, el.researcher, el.lead, el.created, el.updated),
);

const headCells = [
  {id: 'id', narrow: false, disablePadding: true, label: 'ID'},
  {id: 'status', narrow: false, disablePadding: false, label: 'Status'},
  {id: 'researcher', narrow: false, disablePadding: false, label: 'Researcher'},
  {id: 'lead', narrow: false, disablePadding: false, label: 'Lead'},
  {id: 'created', narrow: false, disablePadding: false, label: 'Created on'},
  {id: 'updated', narrow: false, disablePadding: false, label: 'Updated on'},
  {id: 'actions', narrow: true, disablePadding: false, label: 'Actions'},
];

function a11yProps(index) {
  return {
    'id': `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function DashboardPageAnalyst() {
  const classes = useStyles();
  const {t} = useTranslation();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState({
    projectsDrawer: true,
    summaryDrawer: false,
    summaryStatus: '',
  });
  const [tabStatus, setTabStatus] = React.useState('assigned to me');
  const [project, setProject] = React.useState({
    title: 'All projects',
  });

  const filteredRows = () => {
    return (
      rows.filter((val) => val.statusHead === tabStatus)
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setTabStatus('assigned to me');
        break;
      case 1:
        setTabStatus('unassigned');
        break;
      case 2:
        setTabStatus('active');
        break;
      case 3:
        setTabStatus('approved');
        break;
      case 4:
        setTabStatus('denied');
        break;
      default:
        setTabStatus('assigned to me');
    }
  };

  const toggleProjectsDrawer = () => {
    setOpen({...open, projectsDrawer: !open.projectsDrawer});
  };

  const toggleSummaryDrawer = () => {
    setOpen({...open, summaryDrawer: !open.summaryDrawer});
  };

  const handleProjectTitle = (value) => {
    setProject({...project, title: value});
  };

  const contextStatusClick = (value) => {
    setOpen({...open, summaryStatus: value});
  };

  const mainRef = React.createRef();
  const aboutRef = React.createRef();

  return (
    <React.Fragment>
      <Header
        clickHandler={toggleProjectsDrawer}
        role='analyst'
      />
      <main className={classes.main}>
        <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
        <ProjectsDrawer
          open={open.projectsDrawer}
          projectTitle={handleProjectTitle}
          role={'analyst'}
        />
        <Paper
          className={clsx(classes.content, classes.paper, {
            [classes.contentShift]: open.projectsDrawer,
          })}
          elevation={0}
        >
          <SummaryDrawer
            open={open.summaryDrawer}
            clickHandler={toggleSummaryDrawer}
            status={open.summaryStatus}
          />
          <AppBar
            position="static"
            component="div"
            className={classes.appBar}
            ref={mainRef} tabIndex="-1"
          >
            <AppBar
              className={classes.appBarHeader}
              elevation={0}
            >
              <Typography
                variant="h6"
                component="h1"
              >
                {project.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component={Link}
                to="/vetting-app/request-researcher"
              >
            New vetting request
              </Button>
            </AppBar>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Vetting request tabs"
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={t('Assigned to me')} aria-label={t('Assigned to me')} {...a11yProps(0)} />
              <Tab label={t('Unassigned')} aria-label={t('Unassigned')} {...a11yProps(1)} />
              <Tab label={t('Active')} aria-label={t('Active')} {...a11yProps(2)} />
              <Tab label={t('Approved')} aria-label={t('Approved')} {...a11yProps(3)} />
              <Tab label={t('Denied')} aria-label={t('Denied')} {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <TableContainerComponent
              status="assigned to me"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'analyst'}
            />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            <TableContainerComponent
              status="unassigned"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'analyst'}
            />
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabPanel}>
            <TableContainerComponent
              status="active"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'analyst'}
            />
          </TabPanel>
          <TabPanel value={value} index={3} className={classes.tabPanel}>
            <TableContainerComponent
              status="approved" filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'analyst'}
            />
          </TabPanel>
          <TabPanel value={value} index={4} className={classes.tabPanel}>
            <TableContainerComponent
              status="denied" filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'analyst'}
            />
          </TabPanel>
        </Paper>
        <Footer open={open.projectsDrawer} />
      </main>
    </React.Fragment>
  );
}
