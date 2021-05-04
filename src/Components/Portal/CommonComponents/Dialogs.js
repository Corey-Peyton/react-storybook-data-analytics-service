import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
  Divider,
  IconButton,
  Grid,
  Link,
} from '@material-ui/core';
import {Drawer} from '../../CommonComponents/Drawer';
import {Dialog} from '../../CommonComponents/Dialog';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiEmail,
  mdiBookOpenPageVariant,
  mdiInformationOutline,
} from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  helpDetails: {
    display: 'block',
  },
  additionalStepsAcc: {
    margin: [theme.spacing(2, 0, 2, 4), '!important'],
  },
}));

export function HelpDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [open, setOpen] = React.useState({
    supportDialog: false,
  });

  const toggleDialog = (element, value) => {
    setOpen({...open, [element]: value});
  };

  const content = () => (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="support-content"
          id="support-header"
        >
          <Typography component="h3" variant="subtitle1">
            {t('Contact the support team')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            {t(`For general concerns and inquiries, please contact the support team
            for guidance. A team member will be happy to assist you.`)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiEmail} size={1} />}
            onClick={() => toggleDialog('supportDialog', !open.supportDialog)}
          >
            {t('Contact the support team')}
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="aaw-content"
          id="aaw-header"
        >
          <Typography component="h3" variant="subtitle1">
            {t('Advanced Analytics Workspace (AAW)')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            {t(`Please consult the AAW user guide listed below if you encounter
            difficulties related to AAW-specific system components or tools. For
            general concerns and inquiries, please contact the support team for
            further assistance. A DAaaS team member will be happy to help you.`)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiBookOpenPageVariant} size={1} />}
            href="https://statcan.github.io/daaas/en/"
          >
            {t('User guide')}
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Icon path={mdiChevronDown} size={1} />}
          aria-controls="cae-content"
          id="cae-header"
        >
          <Typography component="h3" variant="subtitle1">
            {t('Collaborative Analytics Environment (CAE)')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.helpDetails}>
          <Typography variant="body2" className="mb-3">
            {t(`Please consult the CAE user guide listed below if you encounter
            difficulties related to CAE-specific system components or tools. For
            general concerns and inquiries, please contact the support team for
            further assistance. A DAaaS team member will be happy to help you.`)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icon path={mdiBookOpenPageVariant} size={1} />}
            href="https://statcan.github.io/cae-eac/"
          >
            {t('User guide')}
          </Button>
        </AccordionDetails>
      </Accordion>
      {/* Support dialog */}
      <SupportDialog
        open={open.supportDialog}
        toggleDialog={() => toggleDialog('supportDialog', !open.supportDialog)}
      />
    </>
  );

  return (
    <Drawer
      open={props.open}
      title={t('Help')}
      content={content()}
      primaryButton={t('Close')}
      handlePrimaryClick={props.closeDrawer}
      toggleDrawer={props.closeDrawer}
    />
  );
}

export function SupportDialog(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    supportCategory: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="input-margin">
          <Typography variant="body2">
            {t('Required fields are marked with an asterisk *.')}
          </Typography>
        </Grid>
        <Grid item className="input-margin">
          <TextField
            className="input-margin"
            id="work-email"
            label={t('Work email')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
        </Grid>
        <Divider className="input-margin" />
        <Grid item className="radio-margin">
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              {t(`Help us direct your support request to the right people. Select
              the category that best fits your support request.`)}
            </FormLabel>
            <RadioGroup
              id="supportCategory"
              value={state.supportCategory}
              name="supportCategory"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="account"
                control={<Radio color="primary" />}
                label={t('Sign in / Register for an account')}
              />
              <FormControlLabel
                value="aaw"
                control={<Radio color="primary" />}
                label={t('AAW dashboard or tools')}
              />
              <FormControlLabel
                value="cae"
                control={<Radio color="primary" />}
                label={t('CAE dashboard or tools')}
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label={t('Other')}
              />
              {state.supportCategory === 'other' && (
                <TextField
                  className="ml-4 mb-1"
                  id="other-specify"
                  label={t('Please specify')}
                  variant="outlined"
                  margin="dense"
                  required
                />
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item className="input-margin">
          <TextField
            id="help"
            label={t('What do you need help with?')}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="support-dialog"
      open={props.open}
      title={t('Contact the support team')}
      content={content()}
      primaryButton={t('Submit')}
      secondaryButton={t('Cancel')}
      handlePrimaryClick={props.toggleDialog}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function FeedbackDialog(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    feedbackRating: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="input-margin">
          <Typography variant="body2">
            {t('Required fields are marked with an asterisk *.')}
          </Typography>
        </Grid>
        <Grid item className="input-margin">
          <TextField
            id="feedback"
            label={t('What would you like to tell us?')}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item className="input-margin">
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              {t('How has your experience been so far?')}
            </FormLabel>
            <RadioGroup
              id="feedbackRating"
              value={state.feedbackRating}
              name="feedbackRating"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Positive"
                control={<Radio color="primary" />}
                label={t('Positive')}
              />
              <FormControlLabel
                value="Neutral"
                control={<Radio color="primary" />}
                label={t('Neutral')}
              />
              <FormControlLabel
                value="Negative"
                control={<Radio color="primary" />}
                label={t('Negative')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="feedback-dialog"
      open={props.open}
      title={t('Feedback')}
      content={content()}
      primaryButton={t('Submit')}
      secondaryButton={t('Cancel')}
      handlePrimaryClick={props.toggleDialog}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function AccountDetailsDialog(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    accountIssuer: null,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="input-margin">
          <TextField
            className="input-margin"
            id="fname"
            label={t('First name')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
          <TextField
            className="input-margin"
            id="lname"
            label={t('Last name')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
          <TextField
            className="input-margin"
            id="organization"
            label={t('Organization')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
          <TextField
            className="input-margin"
            id="job-title"
            label={t('Job title')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
          <TextField
            className="input-margin"
            id="work-email"
            label={t('Work email')}
            variant="outlined"
            fullWidth
            margin="dense"
            required
          />
        </Grid>
        <Divider className="input-margin" />
        <Grid item className="input-margin">
          <FormControl component="fieldset" fullWidth required>
            <FormLabel component="legend">
              {t('Who issued your Azure cloud account?')}
            </FormLabel>
            <RadioGroup
              id="accountIssuer"
              value={state.accountIssuer}
              name="accountIssuer"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Statistics Canada"
                control={<Radio color="primary" />}
                label={t('Statistics Canada')}
              />
              <FormControlLabel
                value="Other organization"
                control={<Radio color="primary" />}
                label={t('Other organization')}
              />
              {state.accountIssuer === 'Other organization' && (
                <TextField
                  className="input-margin ml-4"
                  id="issuer-organization"
                  label={t('Organization')}
                  variant="outlined"
                  margin="dense"
                  required
                />
              )}
              <FormControlLabel
                value="I don't have an Azure cloud account"
                control={<Radio color="primary" />}
                label={t('I don\'t have an Azure cloud account')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="account-details-dialog"
      open={props.open}
      title={t('Account details')}
      content={content()}
      primaryButton={t('Next')}
      secondaryButton={t('Cancel')}
      handlePrimaryClick={props.handleNext}
      handleSecondaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function DataUseDialog(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    nonPublicData: null,
    useOwnData: null,
    publicMicrodata: false,
    summaryTables: false,
    customTabulations: false,
    other: false,
    confidential: false,
    public: false,
  });

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="radio-margin">
          <FormControl component="fieldset" fullWidth required>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <FormLabel component="legend">
                  {t(
                      'Do you require access to Statistics Canada non-public data?',
                  )}
                </FormLabel>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label={t('Additional information')}
                  onClick={props.additionalInfo}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      props.additionalInfo();
                    }
                  }}
                  edge="end"
                >
                  <Icon path={mdiInformationOutline} size={1} />
                </IconButton>
              </Grid>
            </Grid>
            <RadioGroup
              id="nonPublicData"
              value={state.nonPublicData}
              name="nonPublicData"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label={t('Yes')}
              />
              {state.nonPublicData === 'Yes' && (
                <Accordion
                  defaultExpanded
                  className={`${classes.additionalStepsAcc} border-top`}
                >
                  <AccordionSummary
                    expandIcon={<Icon path={mdiChevronDown} size={1} />}
                    aria-controls="additional-steps-content"
                    id="additional-steps-header"
                  >
                    <Typography variant="subtitle1" component="h3">
                      {t(
                          'Additional steps will be required after registration',
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {t(`For confidential microdata access, applicants will be
                      asked to submit a Project Application after submitting
                      this registration form. Once the Application is approved,
                      they will be asked to complete the Guidelines for data
                      access. Requests for this type of access will be assessed
                      on a case by case basis. Confidential microdata access may
                      still be accessed in a Research Data Centre or Federal
                      Research Data Centre. Please visit the Research Data
                      Centre website for more information.`)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label={t('No')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {state.nonPublicData === 'No' && (
          <Grid item className="radio-margin">
            <FormControl component="fieldset" fullWidth required>
              <FormLabel component="legend">
                {t('What type of data do you need access to?')}
              </FormLabel>
              <FormHelperText>{t('Select all that apply')}</FormHelperText>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.publicMicrodata}
                      onChange={handleChbxChange}
                      name="publicMicrodata"
                      color="primary"
                    />
                  }
                  label={t('Public microdata')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.summaryTables}
                      onChange={handleChbxChange}
                      name="summaryTables"
                      color="primary"
                    />
                  }
                  label={t('Summary tables')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.customTabulations}
                      onChange={handleChbxChange}
                      name="customTabulations"
                      color="primary"
                    />
                  }
                  label={t('Custom tabulations')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.other}
                      onChange={handleChbxChange}
                      name="other"
                      color="primary"
                    />
                  }
                  label={t('Other')}
                />
              </FormGroup>
              {state.other === true && (
                <TextField
                  className="input-margin ml-4"
                  id="other-input"
                  label={t('Please specify')}
                  variant="outlined"
                  margin="dense"
                  required
                />
              )}
            </FormControl>
          </Grid>
        )}

        <Grid item className="radio-margin">
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              {t('Are you planning on using your own data?')}
            </FormLabel>
            <RadioGroup
              id="useOwnData"
              value={state.useOwnData}
              name="useOwnData"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label={t('Yes')}
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label={t('No')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {state.useOwnData === 'Yes' && (
          <Grid item className="radio-margin">
            <FormControl component="fieldset" required>
              <FormLabel component="legend">
                {t('What type of data are you planning to use?')}
              </FormLabel>
              <FormHelperText>{t('Select all that apply')}</FormHelperText>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.confidential}
                      onChange={handleChbxChange}
                      name="confidential"
                      color="primary"
                    />
                  }
                  label={t('Confidential')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.public}
                      onChange={handleChbxChange}
                      name="public"
                      color="primary"
                    />
                  }
                  label={t('Public')}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </>
  );

  return (
    <Dialog
      id="data-use-dialog"
      open={props.open}
      title={t('Data use details')}
      content={content()}
      primaryButton={t('Next')}
      secondaryButton={t('Cancel')}
      backButton={t('Back to account details')}
      handlePrimaryClick={props.handleNext}
      handleSecondaryClick={props.toggleDialog}
      handleBackClick={props.handleBack}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function AdditionalInfoDialog(props) {
  const {t} = useTranslation();
  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="input-margin">
          <Typography variant="h5" component="h3">
            {t('Definition')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className="input-margin">
            {t('Statistics Canada confidential data:')}
          </Typography>
          <ol>
            <li>
              <Typography>
                {t(`Data obtained directly from respondents or from third parties in
                identifiable mode, under the authority of the Statistics Act or
                of the Corporations Returns Act;`)}
              </Typography>
            </li>
            <li>
              <Typography>
                {t(`Data holdings stripped of identifiers but held in a detail or
                geographical structure or format which could permit a direct
                relation to be established between such data holdings and
                specific respondents;`)}
              </Typography>
            </li>
          </ol>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="additional-info-dialog"
      open={props.open}
      title={t('Additional information')}
      content={content()}
      primaryButton={t('Done')}
      handlePrimaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function TasksToolsDialog(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    sql: false,
    python: false,
    scala: false,
    sas: false,
    desktop: false,
    vis: false,
    machineLearning: false,
    geomatics: false,
    pipelines: false,
    management: false,
    metrics: false,
    cost: false,
    storage: false,
    model: false,
    versionCtrl: false,
    platform: false,
    other: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="radio-margin">
          <FormControl component="fieldset" required>
            <FormLabel component="legend">
              {t('What tasks do you plan to perform?')}
            </FormLabel>
            <FormHelperText>{t('Select all that apply')}</FormHelperText>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.sql}
                    onChange={handleChbxChange}
                    name="sql"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('R, SQL')}</Typography>
                    <Typography variant="caption">
                      {t('Provided tools: Azure Databricks, RShiny, RStudio')}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.python}
                    onChange={handleChbxChange}
                    name="python"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('R, Python')}</Typography>
                    <Typography variant="caption">
                      {t(
                          'Provided tools: Azure Databricks, JupyterLab, VS Code',
                      )}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.scala}
                    onChange={handleChbxChange}
                    name="scala"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Scala')}</Typography>
                    <Typography variant="caption">
                      {t(`Provided tools: Azure Databricks, JupyterLab (Scala can be
                      added on request)`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.sas}
                    onChange={handleChbxChange}
                    name="sas"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('SAS, SPSS, Stata')}</Typography>
                    <Typography variant="caption">
                      {t(`Provided tools: Virtual Machine (Bastion) - DataScience VM
                      - Windows or Linux`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.desktop}
                    onChange={handleChbxChange}
                    name="desktop"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Desktop (All languages)')}</Typography>
                    <Typography variant="caption">
                      {t(`Provided tools: DataScience Linux Desktop (Open Source
                      only), Virtual Machine (Bastion) - DataScience VM -
                      Windows or Linux`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.vis}
                    onChange={handleChbxChange}
                    name="vis"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>
                      {t('Public Visualizations / Dashboards')}
                    </Typography>
                    <Typography variant="caption">
                      {t(`Provided tools: Azure Databricks (R-Shiny -isolated
                      environment), Dash, JupyterLab (Matplotlib & More),
                      Kibana, PowerBI, RShiny`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.machineLearning}
                    onChange={handleChbxChange}
                    name="machineLearning"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>
                      {t('Public Machine Learning API serving')}
                    </Typography>
                    <Typography variant="caption">
                      {t('Provided tools: Kubeflow Serving, Seldon Core')}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.geomatics}
                    onChange={handleChbxChange}
                    name="geomatics"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Geomatics')}</Typography>
                    <Typography variant="caption">
                      {t(
                          'Provided tools: DataScience Linux Desktop, Gdal, QGIS',
                      )}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.pipelines}
                    onChange={handleChbxChange}
                    name="pipelines"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Pipelines')}</Typography>
                    <Typography variant="caption">
                      {t(
                          'Provided tools: Azure Data Factory, Kubeflow Pipelines',
                      )}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.management}
                    onChange={handleChbxChange}
                    name="management"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Management')}</Typography>
                    <Typography variant="caption">
                      {t('Provided tools: Azure Portal, Kubeflow')}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.metrics}
                    onChange={handleChbxChange}
                    name="metrics"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Metrics Monitoring')}</Typography>
                    <Typography variant="caption">
                      {t(
                          'Grafana Azure Portal - Azure Log Analyitics (Cloud Team)',
                      )}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.cost}
                    onChange={handleChbxChange}
                    name="cost"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>
                      {t('Cost Monitoring and Reporting')}
                    </Typography>
                    <Typography variant="caption">
                      {t(`Azure Portal - Azure Cost Management (Cloud team),
                      Kubecost`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.storage}
                    onChange={handleChbxChange}
                    name="storage"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Storage')}</Typography>
                    <Typography variant="caption">
                      {t(`Azure Blob Storage, Azure Datalake Gen 2, Azure SQL
                      Database, Boathouse (for Azure Datalakes), MinIO`)}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.model}
                    onChange={handleChbxChange}
                    name="model"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Model Management')}</Typography>
                    <Typography variant="caption">
                      {t('Azure ML, ML Flow')}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.versionCtrl}
                    onChange={handleChbxChange}
                    name="versionCtrl"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Version Control and CI/CD')}</Typography>
                    <Typography variant="caption">{t('GitHub')}</Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.platform}
                    onChange={handleChbxChange}
                    name="platform"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Platform')}</Typography>
                    <Typography variant="caption">
                      {t('Azure PaaS Offerings, Kubernetes Service')}
                    </Typography>
                  </>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.other}
                    onChange={handleChbxChange}
                    name="other"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography>{t('Other')}</Typography>
                  </>
                }
              />
              {state.other === true && (
                <TextField
                  className="input-margin ml-4"
                  id="other-input"
                  label={t('Please specify')}
                  variant="outlined"
                  margin="dense"
                  required
                />
              )}
            </FormGroup>
          </FormControl>
        </Grid>
        <Divider className="input-margin" />
        <Grid item className="input-margin">
          <TextField
            className="input-margin"
            id="other-tools"
            label={t('Do you require additional tools to perform your tasks?')}
            variant="outlined"
            margin="dense"
            helperText={t('List all the additional tools you require')}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="tasks-tools-dialog"
      open={props.open}
      title={t('Tasks and tools')}
      content={content()}
      primaryButton={t('Next')}
      secondaryButton={t('Cancel')}
      backButton={t('Back to data use details')}
      handlePrimaryClick={props.handleNext}
      handleSecondaryClick={props.toggleDialog}
      handleBackClick={props.handleBack}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function RegisterDialog(props) {
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    terms: false,
    research: false,
  });

  const handleChbxChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const content = () => (
    <>
      <Grid container direction="column">
        <Grid item className="input-margin">
          <FormControl component="fieldset">
            <FormLabel component="legend" className="screen-reader-text">
              {t('Select if you agree')}
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.terms}
                    onChange={handleChbxChange}
                    name="terms"
                    color="primary"
                    required
                  />
                }
                label={
                  <Typography>
                    {t('I agree to the')}{' '}
                    <Link
                      underline="always"
                      href="https://www.statcan.gc.ca/eng/reference/terms-conditions"
                    >
                      {t('Terms and conditions')}
                    </Link>{' '}
                    and{' '}
                    <Link
                      underline="always"
                      href="https://www.statcan.gc.ca/eng/reference/privacy"
                    >
                      {t('Privacy policy')}
                    </Link>
                    . *
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.research}
                    onChange={handleChbxChange}
                    name="research"
                    color="primary"
                  />
                }
                label={t(
                    'I would like to participate in future research activities to help Statistics Canada improve their tools and services.',
                )}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Dialog
      id="register-dialog"
      open={props.open}
      title={t('Accept and register')}
      content={content()}
      primaryButton={t('Register')}
      secondaryButton={t('Cancel')}
      backButton={t('Back to tasks and tools')}
      handlePrimaryClick={props.submitRegistration}
      handleSecondaryClick={props.toggleDialog}
      handleBackClick={props.handleBack}
      toggleDialog={props.toggleDialog}
    />
  );
}

export function SuccessDialog(props) {
  const {t} = useTranslation();
  return (
    <Dialog
      id="success-dialog"
      open={props.open}
      title={t('Thank you!')}
      content={
        <Typography>
          {t(`The information provided has been sent to the Statistics Canada
          Analytical Platform team and they will contact you within 2 business
          days.`)}
        </Typography>
      }
      primaryButton={t('Close')}
      handlePrimaryClick={props.toggleDialog}
      toggleDialog={props.toggleDialog}
    />
  );
}
