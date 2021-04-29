import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
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
import BypassBlocks from '../CommonComponents/BypassBlocks';
import AppBar from './CommonComponents/AppBar';
import Footer from './CommonComponents/Footer';
import Banner from './Banner';
import Icon from '@mdi/react';
import {mdiChevronDown, mdiArrowRight} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(16),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    textAlign: 'center',
    background: theme.palette.grey[100],
  },
  card: {
    padding: theme.spacing(6),
    textAlign: 'left',
    height: '100%',
    boxSizing: 'border-box',
  },
  cardContent: {
    marginRight: theme.spacing(-4),
  },
  cardImage: {
    position: 'relative',
    left: theme.spacing(9),
  },
  toolsList: {
    paddingLeft: 0,
    listStyle: 'none',
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const mainRef = React.createRef();
  const aboutRef = React.createRef();

  return (
    <>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <AppBar />
      <main ref={mainRef} tabIndex="-1">
        <Container maxWidth={false} className={classes.pageContainer}>
          <Banner />
          <Typography variant="h3" component="h2" className="mb-6">
            {t('Check out our analytics platforms')}
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <Paper className={classes.card} variant="outlined">
                <Grid container alignItems="center" wrap="nowrap">
                  <Grid item className={classes.cardContent}>
                    <Typography variant="h5" component="h3" className="mb-3">
                      {t('Advanced Analytics Workspace (AAW)')}
                    </Typography>
                    <Button
                      className="edge-start"
                      color="primary"
                      endIcon={<Icon path={mdiArrowRight} size={1} />}
                    >
                      {t('Go to the AAW dashboard')}
                    </Button>
                    <Typography className="mt-3 mb-3">
                      {t(`This platform enables users to analyze, share, publish,
                      and streamline their data analysis and ML problems. Use
                      Kubeflow to create workspaces with RStudio, Jupyter, or a
                      Linux Desktop (VDI) with VS Code. All workspaces provide
                      easy-access storage with MinIO, and all have R-Shiny. The
                      platform also provides pipelines and integration with
                      Azure services, including Databricks and AzureML. The AAW
                      is entirely self-serve.`)}
                    </Typography>
                    <Accordion className="border-top">
                      <AccordionSummary
                        expandIcon={<Icon path={mdiChevronDown} size={1} />}
                        aria-controls="aaw-tools-content"
                        id="aaw-tools-header"
                      >
                        <Typography component="h4" variant="subtitle1">
                          {t('Available tools')}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul className={classes.toolsList}>
                          <li>
                            <Typography>{t('R - RStudio, RShiny')}</Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Python Development - JupyterLab')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t(`Geomatics Desktop - Linux Desktop (VDI) with VS
                              Code and QGIS`)}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t(
                                  'Management Portal - Kubeflow & Kubeflow Pipelines',
                              )}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Cost Monitoring & Reporting - Kubecost')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Storage - MinIO</Typography')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Model Management - MLflow')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Version Control & CI/CD - Github')}
                            </Typography>
                          </li>
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                    <Typography className="mt-3 mb-3">
                      {t(`At this time, the AAW is designed to improve collaboration
                      using non-Sensitive Statistical Information (SSI), such as
                      Public Use Microdata Files, or a researcher’s own publicly
                      available data.`)}
                    </Typography>
                    <Typography>
                      {t('Create any resource you need with just a click.')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img
                      className={classes.cardImage}
                      src={
                        process.env.PUBLIC_URL + '/images/data-report-bro.svg'
                      }
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper className={classes.card} variant="outlined">
                <Grid container alignItems="center" wrap="nowrap">
                  <Grid item className={classes.cardContent}>
                    <Typography variant="h5" component="h3" className="mb-3">
                      {t('Collaborative Analytics Environment (CAE)')}
                    </Typography>
                    <Button
                      className="edge-start"
                      color="primary"
                      endIcon={<Icon path={mdiArrowRight} size={1} />}
                    >
                      {t('Go to the CAE dashboard')}
                    </Button>
                    <Typography className="mt-3 mb-3">
                      {t(`This platform is designed to provide services for data
                      ingestion, transformation and preparation, as well as data
                      exploration and computation. Complete with tools for
                      collaborative analytics, machine learning environments,
                      and data visualization capabilities, this environment is
                      suitable for a variety of statistical software.`)}
                    </Typography>
                    <Accordion className="border-top">
                      <AccordionSummary
                        expandIcon={<Icon path={mdiChevronDown} size={1} />}
                        aria-controls="cae-tools-content"
                        id="cae-tools-header"
                      >
                        <Typography component="h4" variant="subtitle1">
                          {t('Available tools')}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.toolsDetails}>
                        <ul className={classes.toolsList}>
                          <li>
                            <Typography>{t('Azure Blob Storage')}</Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Azure Data Lake Storage')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>{t('Azure SQL Database')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('Azure Databricks')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('Azure Data Factory')}</Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Azure Machine Learning')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {t('Azure Virtual Machines')}
                            </Typography>
                          </li>
                          <li>
                            <Typography>{t('R')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('R Studio')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('Python')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('PowerBI')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('STATA')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('SPSS')}</Typography>
                          </li>
                          <li>
                            <Typography>{t('SAS')}</Typography>
                          </li>
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                    <Typography className="mt-3">
                      {t(`At this time, the CAE is securely designed to safely grant
                      access to both Sensitive Statistical Information (SSI)
                      (for those users who have met the requirements), such as
                      Statistics Canada data, and public information such as
                      Public Use Microdata Files (PUMFs).`)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img
                      className={classes.cardImage}
                      src={
                        process.env.PUBLIC_URL + '/images/visual-data-bro.svg'
                      }
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer ref={aboutRef} />
    </>
  );
}
export default LandingPage;
