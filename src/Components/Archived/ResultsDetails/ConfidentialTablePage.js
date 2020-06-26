import {Box, Breadcrumbs, Button, Container, Grid, Link, Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

// import { datasets } from './CommonComponents/RelatedContent';
import {datasets} from '../../../Data/fakeData';
import Footer from '../../Footers/Footer';
import DefaultHeader from '../../Headers/DefaultHeader';

const useStyles = makeStyles((theme) => ({
  downloadBtn: {
    width: '80%',
    marginBottom: theme.spacing(3),
  },
  title: {
    width: '60em',
    marginBottom: theme.spacing(2),
  },
  content: {
    '& p, ol': {
      maxWidth: '60em',
      marginBottom: theme.spacing(2),
    },
    '& table p': {
      marginBottom: 0,
    },
  },
  lockedMsg: {
    'backgroundColor': theme.palette.primary.light,
    'maxWidth': '60em',
    'display': 'flex',
    'alignItems': 'center',
    'marginBottom': theme.spacing(4),
    'padding': theme.spacing(2),
    '& svg': {
      color: theme.palette.common.white,
      marginRight: theme.spacing(1),
      fontSize: '3rem',
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

export default function ConfidentialTablePage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const data = datasets[0];

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
              <Typography variant="h4" component="span">
                <LockIcon fontSize="large" />
              </Typography>
              <Typography variant="h4" component="h1" className={classes.title}>
                {data.title}
              </Typography>
            </div>
            <Paper className={classes.lockedMsg}>
              <LockIcon />
              <Typography>
                Preview mode. This data requires a subscription to see all of
                the information. If you're interested in seeing further
                information, press the request access button.
              </Typography>
            </Paper>
            <div className={classes.tabs}>
              <Tabs
                value={value}
                onChange={handleChange}
                className="tabs-underline"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Variables" {...a11yProps(1)} />
                <Tab label="Correction Notes" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <section className={classes.content}>
                  {data.abstract.split('\n').map((paragraph, index) => {
                    return <Typography key={index}>{paragraph}</Typography>;
                  })}
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
                          <Typography>Frequency:</Typography>
                        </td>
                        <td>
                          <Typography>{data.frequency}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Record number:</Typography>
                        </td>
                        <td>
                          <Typography>{data.recordNum}</Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <section className={classes.content}>
                  {/* <List>
                    {data.variables.map((variable, index) => (
                      <ListItem key={index} component="li" button>
                        <ListItemText primary={variable} />
                      </ListItem>
                    ))}
                    </List> */}
                </section>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <section className={classes.content}>
                  <Typography variant="h6" gutterBottom>
                    November 2019
                  </Typography>
                  <Typography>
                    In addition, this month we have a few questions concerning
                    the recent Federal election that was held on Monday October
                    21, 2019. Your participation is voluntary but your
                    cooperation is important.
                  </Typography>
                  <Typography>These questions were:</Typography>
                  <ol>
                    <li>Are you a Canadian citizen?</li>
                    <li>
                      The federal election was held on Monday, October 21. In
                      any election, some people are not able to vote because
                      they are sick or busy, or for some other reason. Others do
                      not want to vote. Did you vote in the recent federal
                      election?
                    </li>
                    <li>Why did you not vote?</li>
                    <li>Did you go to a polling station and try to vote? </li>
                    <li>
                      In the past 12 months, did you use Elections Canada's
                      online service to check, update or complete your voter
                      registration?
                    </li>
                  </ol>
                </section>
              </TabPanel>
            </div>
          </Grid>
          <Grid item xs={3} className={classes.sidebar}>
            <Button
              className={classes.downloadBtn}
              variant="contained"
              color="primary"
              startIcon={<LockOpenIcon />}
            >
              Request Access
            </Button>
          </Grid>
        </Grid>
        {/* <RelatedInfoList relatedInfo={data.related} /> */}
        <Footer />
      </Container>
    </React.Fragment>
  );
}
