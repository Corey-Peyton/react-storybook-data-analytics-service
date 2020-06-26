import {Breadcrumbs, Button, Container, Divider, ExpansionPanel, ExpansionPanelSummary, Grid, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Footer from '../../Footers/Footer';
import DefaultHeader from '../../Headers/DefaultHeader';
import {ContactUs, Source} from './CommonComponents/Contact';
import {RelatedInfo, RelatedNews} from './CommonComponents/RelatedContent';
import SignUp from './CommonComponents/SignUp';

const useStyles = makeStyles((theme) => ({
  title: {
    maxWidth: '60em',
  },
  content: {
    '& p': {
      maxWidth: '60em',
      marginBottom: theme.spacing(2),
    },
    '& table p': {
      marginBottom: 0,
    },
  },
  downloadBtn: {
    width: '80%',
    marginBottom: theme.spacing(6),
    marginLeft: '10%',
  },
}));

export default function VisualizationPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DefaultHeader />
      <Container maxWidth="xl" className={`page-container ${classes.root}`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/">
          Home
          </Link>
          <Link component={RouterLink} to="/results">
          Search results
          </Link>
          <Typography>Energy statistics: Interactive dashboard</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <div className="icon-heading">
              <Typography
                variant="h4"
                component="h1"
                className={classes.title}
                gutterBottom
              >
              Energy statistics: Interactive dashboard
              </Typography>
            </div>
            <section className={classes.content}>
              <Typography>
              This interactive data visualization dashboard provides a
              comprehensive picture of the Canadian energy sector with a focus
              on monthly statistics. Users will find an extensive coverage of
              energy statistics from a variety of Statistics Canada data
              sources. The dashboard currently features energy-related
              statistics on production and consumption, international trade and
              gross domestic production. A map is available for users to view
              data by province or territory.
              </Typography>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Typography>Published:</Typography>
                    </td>
                    <td>
                      <Typography>2019-06-06</Typography>
                    </td>
                  </tr>
                  {/* <tr>
                  <td>
                    <Typography>Collection cycle:</Typography>
                  </td>
                  <td>
                    <Typography>Quarterly</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Related geography:</Typography>
                  </td>
                  <td>
                    <Typography>Alberta only</Typography>
                  </td>
                </tr> */}
                </tbody>
              </table>
            </section>
            <section>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="data-content"
                  id="data-header"
                >
                  <Typography>Data</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <div className="resp-iframe-container">
                <iframe
                  title="Energy statistics: Interactive dashboard"
                  className="resp-iframe"
                  src="https://dv-vd.cloud.statcan.ca/home/index/71-607-x2019001_en"
                ></iframe>
              </div>
            </section>
          </Grid>
          <Grid item xs={3} className={classes.sideBar}>
            <Button
              className={classes.downloadBtn}
              color="primary"
              variant="contained"
              startIcon={<GetAppIcon />}
            >
            Download
            </Button>
            <Source />
            <RelatedInfo />
          </Grid>
        </Grid>
        <RelatedNews />
        <Divider className="section-divider" />
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <ContactUs />
          </Grid>
          <Grid item xs={5}>
            <SignUp />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </ React.Fragment>
  );
}
