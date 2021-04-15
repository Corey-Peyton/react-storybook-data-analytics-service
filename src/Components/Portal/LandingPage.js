import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import AppBar from './CommonComponents/AppBar';
import Footer from './CommonComponents/Footer';
import Icon from '@mdi/react';
import {mdiChevronDown} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(16),
    paddingBottom: theme.spacing(18),
    textAlign: 'center',
    background: theme.palette.grey[100],
  },
  bannerBtn: {
    width: '320px',
    padding: theme.spacing(1.5),
  },
  banner: {
    textAlign: 'left',
    boxSizing: 'border-box',
    backgroundColor: '#19334D', // put this in theme??
    color: theme.palette.common.white,
    padding: theme.spacing(6, 12),
    margin: theme.spacing(0, -3, 6, -3),
  },
  logo: {
    marginRight: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(6, 3),
  },
  toolsDetails: {
    display: 'flex',
    justifyContent: 'center',
  },
  toolsList: {
    paddingLeft: 0,
    listStyle: 'none',
  },
}));

function LandingPage(props) {
  const classes = useStyles();

  // const [state, setState] = React.useState({});

  return (
    <>
      <AppBar />
      <main tabIndex="-1">
        <Container maxWidth="xl" className={classes.pageContainer}>
          <div className={classes.banner}>
            <Grid container>
              <Grid item>
                <img
                  className={classes.logo}
                  src={process.env.PUBLIC_URL + '/images/DAaaS_logo_1_EN.png'}
                  alt=""
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" component="h1">
                  Data Analytics as a Service
                </Typography>
                <Typography variant="h5" component="h2">
                  Harness the power of your data
                </Typography>
              </Grid>
            </Grid>
            <Typography className="mt-3 mb-6">
              Our platforms provide virtual access to Statistics Canada data.
              From these platforms, choose from a variety of tools to help
              prepare and transform datasets. Use the Collaborative Analytics
              Environment (CAE) and the Advanced Analytics Workspace (AAW) to
              analyze and present data to help share compelling data stories.
            </Typography>
            <Grid container direction="column">
              <Grid item>
                <Button
                  className={clsx(classes.bannerBtn, 'mb-3')}
                  variant="contained"
                  color="primary"
                >
                  Get started
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.bannerBtn} variant="outlined">
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </div>
          <Typography variant="h3" component="h2" className="mb-6">
            Check out our analytics platforms
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3" className="mb-3">
                  Advanced Analytics Workspace (AAW)
                </Typography>
                <Button
                  className={classes.bannerBtn}
                  variant="contained"
                  color="primary"
                >
                  Go to the AAW dashboard
                </Button>
                <Typography className="mt-3 mb-3">
                  This platform enables users to analyze, share, publish, and
                  streamline their data analysis and ML problems. Use Kubeflow
                  to create workspaces with RStudio, Jupyter, or a Linux Desktop
                  (VDI) with VS Code. All workspaces provide easy-access storage
                  with MinIO, and all have R-Shiny. The platform also provides
                  pipelines and integration with Azure services, including
                  Databricks and AzureML. The AAW is entirely self-serve.
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<Icon path={mdiChevronDown} size={1} />}
                    aria-controls="aaw-tools-content"
                    id="aaw-tools-header"
                  >
                    <Typography component="h2">Available tools</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.toolsDetails}>
                    <ul className={classes.toolsList}>
                      <li>
                        <Typography>R - RStudio, RShiny</Typography>
                      </li>
                      <li>
                        <Typography>Python Development - JupyterLab</Typography>
                      </li>
                      <li>
                        <Typography>
                          Geomatics Desktop - Linux Desktop (VDI) with VS Code
                          and QGIS
                        </Typography>
                      </li>
                      <li>
                        <Typography>
                          Management Portal - Kubeflow & Kubeflow Pipelines
                        </Typography>
                      </li>
                      <li>
                        <Typography>
                          Cost Monitoring & Reporting - Kubecost
                        </Typography>
                      </li>
                      <li>
                        <Typography>Storage - MinIO</Typography>
                      </li>
                      <li>
                        <Typography>Model Management - MLflow</Typography>
                      </li>
                      <li>
                        <Typography>
                          Version Control & CI/CD - Github
                        </Typography>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Typography className="mt-3 mb-3">
                  At this time, the AAW is designed to improve collaboration
                  using non-Sensitive Statistical Information (SSI), such as
                  Public Use Microdata Files, or a researcher’s own publicly
                  available data.
                </Typography>
                <Typography>
                  Create any resource you need with just a click.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3" className="mb-3">
                  Collaborative Analytics Environment (CAE)
                </Typography>
                <Button
                  className={classes.bannerBtn}
                  variant="contained"
                  color="primary"
                >
                  Go to the CAE dashboard
                </Button>
                <Typography className="mt-3 mb-3">
                  This platform is designed to provide services for data
                  ingestion, transformation and preparation, as well as data
                  exploration and computation. Complete with tools for
                  collaborative analytics, machine learning environments, and
                  data visualization capabilities, this environment is suitable
                  for a variety of statistical software.
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<Icon path={mdiChevronDown} size={1} />}
                    aria-controls="aaw-tools-content"
                    id="aaw-tools-header"
                  >
                    <Typography component="h2">Available tools</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.toolsDetails}>
                    <ul className={classes.toolsList}>
                      <li>
                        <Typography>Azure Blob Storage</Typography>
                      </li>
                      <li>
                        <Typography>Azure Data Lake Storage</Typography>
                      </li>
                      <li>
                        <Typography>Azure SQL Database</Typography>
                      </li>
                      <li>
                        <Typography>Azure Databricks</Typography>
                      </li>
                      <li>
                        <Typography>Azure Data Factory</Typography>
                      </li>
                      <li>
                        <Typography>Azure Machine Learning</Typography>
                      </li>
                      <li>
                        <Typography>Azure Virtual Machines</Typography>
                      </li>
                      <li>
                        <Typography>R</Typography>
                      </li>
                      <li>
                        <Typography>R Studio</Typography>
                      </li>
                      <li>
                        <Typography>Python</Typography>
                      </li>
                      <li>
                        <Typography>PowerBI</Typography>
                      </li>
                      <li>
                        <Typography>STATA</Typography>
                      </li>
                      <li>
                        <Typography>SPSS</Typography>
                      </li>
                      <li>
                        <Typography>SAS</Typography>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Typography className="mt-3">
                  At this time, the CAE is securely designed to safely grant
                  access to both Sensitive Statistical Information (SSI) (for
                  those users who have met the requirements), such as Statistics
                  Canada data, and public information such as Public Use
                  Microdata Files (PUMFs).
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
export default LandingPage;
