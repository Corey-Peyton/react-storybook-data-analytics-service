import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TableContainerComponent from './Common/TableContainerComponent';
import TabPanel from './Common/DashboardTabPanel';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import SummaryDrawer from '../CommonComponents/SummaryDrawer';
import ProjectsDrawer from './Common/ProjectsDrawer';
import BypassBlocks from '../../BypassBlocks';
import {requestListResearchers} from '../../../Data/fakeData';
import {DRAWER_WIDTH} from './Common/ProjectsDrawer';
import {FOOT_H} from '../../../Theme/constants';
import {DialognNewRequestTitle} from '../CommonComponents/DialogBox';
import FloatingSupportButton from '../CommonComponents/Support';

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
    padding: theme.spacing(2, 1, 1, '!important'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    minHeight: `calc(100vh - ${FOOT_H}px)`,
    boxSizing: 'border-box',
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

function createData(
    id,
    title,
    statusHead,
    status,
    researcher,
    lead,
    support,
    created,
    updated,
) {
  return {
    id,
    title,
    statusHead,
    status,
    researcher,
    lead,
    support,
    created,
    updated,
  };
}

const rows = requestListResearchers.map((el, index) =>
  createData(
      el.id,
      el.title,
      el.statusHead,
      el.status,
      el.researcher,
      el.analysts.lead,
      el.analysts.support,
      el.created,
      el.updated,
  ),
);

const headCells = [
  {id: 'id', narrow: false, disablePadding: true, label: 'Request'},
  {id: 'status', narrow: false, disablePadding: false, label: 'Status'},
  {
    id: 'researcher',
    narrow: false,
    disablePadding: false,
    label: 'Requester',
  },
  {id: 'analysts', narrow: false, disablePadding: false, label: 'Assignee'},
  {id: 'created', narrow: false, disablePadding: false, label: 'Created'},
  {id: 'updated', narrow: false, disablePadding: false, label: 'Updated'},
  {id: 'actions', narrow: true, disablePadding: false, label: 'Actions'},
];

function a11yProps(index) {
  return {
    'id': `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function DashboardPageResearcher() {
  const classes = useStyles();
  const {t} = useTranslation();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState({
    projectsDrawer: true,
    summaryDrawer: false,
    summaryStatus: '',
    newRequest: false,
  });
  const [tabStatus, setTabStatus] = React.useState('active');
  const [project, setProject] = React.useState({
    title: '20-SSH-UTO-1111',
  });

  const filteredRows = () => {
    return rows.filter((val) => val.statusHead === tabStatus);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setTabStatus('active');
        break;
      case 1:
        setTabStatus('withdrawn');
        break;
      case 2:
        setTabStatus('approved');
        break;
      case 3:
        setTabStatus('denied');
        break;
      default:
        setTabStatus('active');
    }
  };

  const toggleProjectsDrawer = () => {
    setOpen({...open, projectsDrawer: !open.projectsDrawer});
  };

  const toggleSummaryDrawer = () => {
    setOpen({...open, summaryDrawer: !open.summaryDrawer});
  };

  const toggleDialog = (state, value) => {
    setOpen({...open, [state]: value});
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
      <Header clickHandler={toggleProjectsDrawer} role="researcher" />
      <main className={classes.main}>
        <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
        <ProjectsDrawer
          open={open.projectsDrawer}
          projectTitle={handleProjectTitle}
          role="researcher"
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
            ref={mainRef}
            tabIndex="-1"
          >
            <AppBar className={classes.appBarHeader} elevation={0}>
              <Typography variant="h6" component="h1">
                {project.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => toggleDialog('newRequest', !open.newRequest)}
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
              <Tab label={t('Active')} {...a11yProps(0)} />
              <Tab label={t('Withdrawn')} {...a11yProps(1)} />
              <Tab label={t('Approved')} {...a11yProps(2)} />
              <Tab label={t('Denied')} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <TableContainerComponent
              statusHead="active"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'researcher'}
            />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            <TableContainerComponent
              statusHead="withdrawn"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'researcher'}
            />
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabPanel}>
            <TableContainerComponent
              statusHead="approved"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'researcher'}
            />
          </TabPanel>
          <TabPanel value={value} index={3} className={classes.tabPanel}>
            <TableContainerComponent
              statusHead="denied"
              filteredRows={filteredRows}
              headCells={headCells}
              contextSummaryClick={toggleSummaryDrawer}
              contextStatusClick={contextStatusClick}
              role={'researcher'}
            />
          </TabPanel>
        </Paper>
        <Footer open={open.projectsDrawer} />
        <DialognNewRequestTitle
          open={open.newRequest}
          role="researcher"
          toggleDialog={() => toggleDialog('newRequest', !open.newRequest)}
        />
        <FloatingSupportButton />
      </main>
    </React.Fragment>
  );
}
