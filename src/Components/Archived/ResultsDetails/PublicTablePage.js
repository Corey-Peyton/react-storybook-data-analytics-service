import {Box, Breadcrumbs, Button, Container, Grid, Link, Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import HelpIcon from '@material-ui/icons/Help';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {datasets} from '../../../Data/fakeData';
// import {RelatedInfoList} from './CommonComponents/RelatedContent';
import Footer from '../../Footers/Footer';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import DefaultHeader from '../../Headers/DefaultHeader';

const useStyles = makeStyles((theme) => ({
  downloadBtn: {
    width: '80%',
    marginBottom: theme.spacing(3),
  },
  title: {
    maxWidth: '1024px',
    marginBottom: theme.spacing(2),
  },
  content: {
    '& p': {
      maxWidth: '1024px',
      marginBottom: theme.spacing(2),
    },
    '& table p': {
      marginBottom: 0,
    },
  },
  tabs: {
    width: '100%',
  },
  sidebar: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebarIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    'width': '80%',
    'boxSizing': 'border-box',
    'paddingTop': theme.spacing(2),
    'backgroundColor': theme.palette.primary.dark,
    'color': theme.palette.common.white,
    '& svg': {
      fontSize: '3rem',
    },
  },
  cardContent: {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '60%',
    },
  },
  cardFooter: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(0, 2),
    textAlign: 'left',
  },
}));

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PublicTablePage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const data = datasets[0];

  console.log(data.related);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <DefaultHeader />
      <Container maxWidth="xl" className="page-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/">
          Home
          </Link>
          <Link component={RouterLink} to="/results">
          Search results
          </Link>
          <Typography>{data.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <div className="icon-heading">
              <Typography variant="h4" component="h1" className={classes.title}>
                {data.title}
              </Typography>
            </div>
            <div className={classes.tabs}>
              <Tabs
                value={value}
                onChange={handleChange}
                className="tabs-underline"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Data preview" {...a11yProps(1)} />
                <Tab label="Data set fields" {...a11yProps(2)} />
                <Tab label="Data set statistics" {...a11yProps(3)} />
                <Tab label="Data provider Q&As (5)" {...a11yProps(4)} />
                <Tab label="Correction notes" {...a11yProps(5)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <section className={classes.content}>
                  <Typography>
                    {data.abstract}
                  </Typography>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>Data provider:</Typography>
                        </td>
                        <td>
                          <Typography>{data.provider}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Data source:</Typography>
                        </td>
                        <td>
                          <Typography>{data.source}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Frequency:</Typography>
                        </td>
                        <td>
                          <Typography>{data.frequency}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Geography:</Typography>
                        </td>
                        <td>
                          <Typography>{data.geography}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Table:</Typography>
                        </td>
                        <td>
                          <Typography>{data.table}</Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </TabPanel>
            </div>
            <section>
              <Typography
                variant="h5"
                component="h2"
                className="heading-underline"
                gutterBottom
              >
              Supplementary information
              </Typography>
              <ul>
                <li>
                  <Typography>Item one</Typography>
                </li>
                <li>
                  <Typography>Item two</Typography>
                </li>
                <li>
                  <Typography>Item three</Typography>
                </li>
              </ul>
            </section>
          </Grid>
          <Grid item xs={3} className={classes.sidebar}>
            <div className={classes.sidebarIcons}>
              {/* <LockOpenIcon className="icon-grey" aria-label="Unlocked" />
            <IconButton aria-label="Add to project">
              <StarBorderIcon />
            </IconButton> */}
            </div>
            <Button
              className={classes.downloadBtn}
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
            >
            Download options
            </Button>
            <Paper className={classes.card}>
              <div className={classes.cardContent}>
                <HelpIcon />
                <div>
                  <Typography variant="h3" component="p">
                  5
                  </Typography>
                  <Typography component="span"> Data Provider Q&As</Typography>
                </div>
              </div>
              <div className={classes.cardFooter}>
                <Button>View Details</Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        {/* <RelatedInfoList relatedInfo={data.related}/> */}
        <Footer />
      </Container>
    </ React.Fragment>
  );
}
