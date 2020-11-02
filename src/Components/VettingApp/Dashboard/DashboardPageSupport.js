import React from 'react';
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

import TableContainerComponent from './TableContainerComponent';
import TabPanel from './DashboardTabPanel';
import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import DashboardDrawer from './DashboardDrawer';
import BypassBlocks from '../../BypassBlocks';
import {requestListResearchers} from '../../../Data/fakeData';
import {DRAWER_WIDTH} from './DashboardDrawer';

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

let tabStatus = 'active';

function createData(id, statusHead, status, supporter, lead, submitted, updated) {
  return {id, statusHead, status, supporter, lead, submitted, updated};
}

const rows = requestListResearchers.map((el, index) =>
  createData(el.id, el.statusHead, el.status, el.supporter, el.lead, el.submitted, el.updated),
);

const filteredRows = () => {
  return (
    rows.filter((val) => val.statusHead === tabStatus)
  );
};

const headCells = [
  {id: 'id', narrow: false, disablePadding: true, label: 'ID'},
  {id: 'status', narrow: false, disablePadding: false, label: 'Status'},
  {id: 'researcher', narrow: false, disablePadding: false, label: 'Researcher'}, // not sorting
  {id: 'lead', narrow: false, disablePadding: false, label: 'Analyst'},
  {id: 'created', narrow: false, disablePadding: false, label: 'Created on'}, // not sorting
  {id: 'updated', narrow: false, disablePadding: false, label: 'Updated on'},
  {id: 'actions', narrow: true, disablePadding: false, label: 'Actions'},
];

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardPageSupport() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState({
    drawer: true,
  });
  const [project, setProject] = React.useState({
    title: 'All projects',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        tabStatus = 'active';
        break;
      case 1:
        tabStatus = 'withdrawn';
        break;
      case 2:
        tabStatus = 'approved';
        break;
      case 3:
        tabStatus = 'denied';
        break;
      default:
        tabStatus = 'active';
    }
  };

  const toggleDrawer = () => {
    setOpen({...open, drawer: !open.drawer});
  };

  const handleProjectTitle = (value) => {
    setProject({...project, title: value});
  };

  const mainRef = React.createRef();
  const aboutRef = React.createRef();


  return (
    <React.Fragment>
      <Header clickHandler={toggleDrawer}/>
      <main className={classes.main}>
        <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
        <DashboardDrawer
          open={open.drawer}
          projectTitle={handleProjectTitle}
        />
        <Paper
          className={clsx(classes.content, classes.paper, {
            [classes.contentShift]: open.drawer,
          })}
          elevation={0}
        >
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
              <Button variant="contained" color="primary" className={classes.button}>
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
            >
              <Tab label="Active" {...a11yProps(0)} />
              <Tab label="Withdrawn" {...a11yProps(1)} />
              <Tab label="Approved" {...a11yProps(2)} />
              <Tab label="Denied" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <TableContainerComponent status="active" filteredRows={filteredRows} headCells={headCells}/>
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            <TableContainerComponent status="withdrawn" filteredRows={filteredRows} headCells={headCells}/>
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabPanel}>
            <TableContainerComponent status="approved" filteredRows={filteredRows} headCells={headCells}/>
          </TabPanel>
          <TabPanel value={value} index={3} className={classes.tabPanel}>
            <TableContainerComponent status="denied" filteredRows={filteredRows} headCells={headCells}/>
          </TabPanel>
        </Paper>
        <Footer open={open.drawer} />
      </main>
    </React.Fragment>
  );
}
