import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, fade} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Divider,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@mdi/react';
import {mdiChevronRight} from '@mdi/js';
import {
  DialogOutputMethodHelp,
  DialogAddFile,
  DialogDelete,
} from '../DialogBox';
import {SnackbarDeleteSupportFile} from '../Snackbars';
import {Card} from '../../../../Components/CommonComponents/Card';

const useStyles = makeStyles((theme) => ({
  lineHeight: {
    lineHeight: 'normal',
  },
  appBar: {
    'backgroundColor': theme.palette.common.white,
    'margin': theme.spacing(0, -3, 3, 0),
    'boxShadow': theme.shadows[0],
    'borderBottom': '1px solid',
    'borderBottomColor': theme.palette.divider,
    'position': 'fixed',
    'top': 0,
    'zIndex': 500,
    'width': '400px',
    '& .MuiToolbar-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(0, 3),
    },
  },
  body: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(3, 3, 3, 3),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(-3),
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    position: 'fixed',
    bottom: 0,
    width: '400px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  tooltipLabel: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  addBtn: {
    'borderStyle': 'dashed',
    'justifyContent': 'start',
    'width': '100%',
    'textAlign': 'left',
    'borderColor': fade(theme.palette.common.black, 0.23),
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
  },
  cardContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderColor: fade(theme.palette.common.black, 0.08),
  },
  filePath: {
    display: 'flex',
    flexFlow: 'wrap',
    alignItems: 'flex-end',
  },
  filePathItem: {
    display: 'flex',
    alignItems: 'center',
  },
  indentedSection: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderLeft: '1px solid',
    borderLeftColor: theme.palette.divider,
  },
}));

// ////////////////// BOOTSTRAP TOOLTIP - SAVED FOR LATER
// const useStylesBootstrap = makeStyles((theme) => ({
//   arrow: {
//     color: theme.palette.common.black,
//   },
//   tooltip: {
//     backgroundColor: theme.palette.common.black,
//   },
// }));

/* <FormLabel component="legend" className={classes.tooltipLabel}>
  Are variables related to income, earnings, tax and/or dollar values included?{' '}
  <BootstrapTooltip title="If no, future vetting release reuests under this contract may be restricted due to residual disclosure. You are strongly encouraged to consult with your Analyst.">
    <InfoIcon />
  </BootstrapTooltip>
</FormLabel>; */

const outputMethods = {
  '1.Descriptive': [
    'ANOVA',
    'Correlation matrix',
    'Cross-tabular analysis',
    'Distributions',
    'Frequencies',
    'Kurtosis',
    'Means',
    'Medians',
    'Modes',
    'Percentages',
    'Quartiles',
    'Ranges',
    'Ratios',
    'Regression models with only one independent variable',
    'Skewness',
    'Standard deviations',
    'Totals',
    'Variances',
  ],
  '2.Scaling': ['Factor Analysis'],
  '3.Graphs': ['Histograms'],
  '4.Multivariable regression analysis': [
    'Logistic Regression',
    'OLS',
    'Poisson',
    'Probit',
    'Tobit',
  ],
  '5.Complex modeling': [
    'Event History Analysis',
    'Fixed Effects Models',
    'Growth Analysis',
    'Hierarchical Linear Modeling',
    'Random Effects Models',
    'Simultaneous-Equations Models',
    'Structural equation modeling',
    'Survival Analysis',
  ],
  '6.Other': [],
};

const outputMethodsTerms = [];
for (const [key, value] of Object.entries(outputMethods)) {
  if (value.length > 0) {
    for (const term of value) {
      outputMethodsTerms.push({method: key, term: term});
    }
  }
}

const outputMethodsList = [
  'Descriptive',
  'Scaling',
  'Graphs',
  'Multivariable regression analysis',
  'Complex modeling',
  'Other',
];

export function OutputFile(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <Typography variant="h6" component="h2" className={classes.title}>
            {props.drawerType === 'addFile' ?
              'Add file for output' :
              props.drawerType === 'editFile' ?
              'Edit for for output' :
              'View file for output'}
          </Typography>
          <IconButton
            aria-label="Close add output file"
            className={classes.margin}
            edge="end"
            onClick={(e) => props.toggleDrawer(e, props.drawerType)}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <AddFileForm {...props} />
      </div>
      {props.drawerType === 'addFile' && (
        <div className={classes.footer}>
          <Button
            className="mr-2"
            variant="outlined"
            color="primary"
            onClick={(e) => props.toggleDrawer(e, props.drawerType)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.createFile}
          >
            Add
          </Button>
        </div>
      )}
      {props.drawerType === 'editFile' && (
        <div className={classes.footer}>
          <Button
            className="mr-2"
            variant="outlined"
            color="primary"
            onClick={(e) => props.toggleDrawer(e, props.drawerType)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.updateFile}
          >
            Update
          </Button>
        </div>
      )}
      {props.drawerType === 'viewFile' && (
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => props.toggleDrawer(e, props.drawerType)}
          >
            Close
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

function AddFileForm(props) {
  const {t} = useTranslation();
  const classes = useStyles();

  const [state, setState] = React.useState({
    researcher: () => {
      if (props.drawerType === 'addFile' || props.drawerType === 'editFile') {
        return true;
      } else {
        return false;
      }
    },
    includeWeightVariable: null,
    linkedData: null,
    descriptiveStats: null,
    covariance: null,
    dollarIncluded: null,
    equivalentDescriptiveStats: null,
    matrixContinuous: null,
    matrixDichotomous: null,
    matrixCorrelated: null,
    roundingOutput: null,
    dialogOutputMethodHelp: false,
    dialogAddFile: false,
    snackbarSupportDelete: false,
    dialogSupportDelete: false,
    dialogFileFunction: '',
    filePath: {
      value: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    sheetname: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'For spreadsheets only. Add a file for each sheet.',
    },
    survey: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: 'Seperate by semicolon (e.g. LFS 2012; LFS 2011; CCHS 2009)',
    },
    outputMethod: {
      value: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    outputMethodDescription: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    weightvariable: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
    sample: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '(e.g. Males 50 years of age or older)',
    },
    geography: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '(e.g. National, provincial, municipal)',
    },
    linkage: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '(e.g. Person based, record based, matching geographies)',
    },
    rounding: {
      text: '',
      errorText: '',
      invalid: '',
      commands: '',
      helperText: '',
    },
  });

  const handleClickOpen = (element, val) => {
    setState({...state, [element]: true});
    if (val) {
      setState({
        ...state,
        [element]: true,
        dialogFileFunction: val,
      });
    } else {
      setState({
        ...state,
        [element]: true,
      });
    }
  };

  const handleClickClose = (element) => {
    setState({...state, [element]: false});
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    setState({
      ...state,
      [name]: {
        ...state[name],
        value: val,
      },
    });
  };

  const deleteSupportFile = () => {
    setState({
      ...state,
      snackbarSupportDelete: true,
      dialogSupportDelete: false,
    });
  };

  return (
    <>
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Select output file')}
      </Typography>
      <FormControl
        className="mb-3"
        margin="dense"
        required
        variant="outlined"
        fullWidth
      >
        <InputLabel id="file-path-select-label">File path</InputLabel>
        <Select
          label={t('File path')}
          labelId="file-path-select-label"
          id="filePath"
          name="filePath"
          value={state.filePath.value}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={'spreadsheet1'}>spreadsheet1.xls</MenuItem>
          <MenuItem value={'spreadsheet2'}>spreadsheet2.doc</MenuItem>
          <MenuItem value={'spreadsheet3'}>spreadsheet3.xls</MenuItem>
        </Select>
      </FormControl>
      {Boolean(state.filePath.value) && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <TextField
            label={t('Sheet name')}
            fullWidth
            margin="dense"
            variant="outlined"
            required
            className="mb-3"
          />
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Output details')}
      </Typography>

      <TextField
        className="mb-3"
        margin="dense"
        id="datasetName"
        label={t('Surveys/Datasets and cycles')}
        variant="outlined"
        fullWidth
        required
        defaultValue={state.survey.text}
        error={Boolean(state.survey.errorText)}
        helperText={state.survey.helperText}
      />
      <FormControl
        className="mb-3"
        margin="dense"
        required
        variant="outlined"
        fullWidth
      >
        <InputLabel id="output-select-label">{t('Output method')}</InputLabel>
        <Select
          id="outputMethod"
          label={t('Output method')}
          labelId="output-select-label"
          onChange={handleSelectChange}
          name="outputMethod"
          value={state.outputMethod.value}
          required
        >
          {outputMethodsList.map((term, index) => (
            <MenuItem value={term} key={index}>
              {term}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {t('Need help?')}{' '}
          <Link
            underline="always"
            color="inherit"
            onClick={() => handleClickOpen('dialogOutputMethodHelp')}
            component="button"
          >
            {t('Learn about output methods')}
          </Link>
        </FormHelperText>
      </FormControl>
      {state.outputMethod.value === 'Graphs' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <Typography variant="body2" component="p">
            {t('Add file for supporting tabulations for graphs *')}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mt-2 mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
        </div>
      )}
      {state.outputMethod.value === 'Other' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <TextField
            className="mb-3"
            margin="dense"
            id="outputMethodDescription"
            label={t('Output method description')}
            variant="outlined"
            fullWidth
            required
            multiline
            defaultValue={state.outputMethodDescription.text}
            error={Boolean(state.outputMethodDescription.errorText)}
            helperText={state.outputMethodDescription.errorText}
          />
        </div>
      )}
      <TextField
        className="mb-3"
        margin="dense"
        id="sample-input"
        label={t('Sample, sub-samaple, inclusion/exclusion')}
        variant="outlined"
        fullWidth
        required
        defaultValue={state.sample.text}
        error={Boolean(state.sample.errorText)}
        helperText={state.sample.helperText}
      />
      <TextField
        className="mb-3"
        margin="dense"
        id="geography-input"
        label={t('Geography level')}
        variant="outlined"
        fullWidth
        required
        defaultValue={state.geography.text}
        error={Boolean(state.geography.errorText)}
        helperText={state.geography.helperText}
      />
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Weighted variable')}
      </Typography>
      <FormControl component="fieldset" className="mb-2" required>
        <FormLabel component="legend">
          {t('Does this output include a weight variable?')}
        </FormLabel>
        <RadioGroup
          id="includeWeightVariable"
          value={state.includeWeightVariable}
          name="includeWeightVariable"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.includeWeightVariable === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <TextField
            className="mb-3"
            margin="dense"
            id="weightVariableName"
            label={t('Weighted variable name')}
            variant="outlined"
            required
            fullWidth
            defaultValue={state.weightvariable.text}
            error={Boolean(state.weightvariable.errorText)}
            helperText={state.weightvariable.errorText}
          />
          <FormControl component="fieldset" className="mb-2" required>
            <FormLabel component="legend">
              {t('Was the weighted variable scaled/normalized?')}
            </FormLabel>
            <RadioGroup id="weightVariableType">
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Linked data')}
      </Typography>
      <FormControl component="fieldset" className="mb-2" required>
        <FormLabel component="legend">{t('Is linked data used?')}</FormLabel>
        <RadioGroup
          id="linkedData"
          value={state.linkedData}
          name="linkedData"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.linkedData === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <TextField
            className="mb-3"
            margin="dense"
            id="linkageDescription"
            label={t('Linkage method')}
            variant="outlined"
            fullWidth
            required
            defaultValue={state.linkage.text}
            error={Boolean(state.linkage.errorText)}
            helperText={state.linkage.helperText}
          />
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Financial variables')}
      </Typography>
      <FormControl
        className="mb-2"
        component="fieldset"
        required
        error={Boolean(props.errors)}
      >
        <FormLabel component="legend" className={classes.tooltipLabel}>
          {t(
              'Are variables related to income, earnings, tax and/or dollar values included?',
          )}
        </FormLabel>
        <RadioGroup
          id="dollarIncluded"
          value={state.dollarIncluded}
          name="dollarIncluded"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.dollarIncluded === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <Typography variant="body2" component="p">
            {t('Add file for unweighted supporting sample counts *')}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          {state.researcher() ? (
            <>
              <Paper className={classes.cardContainer} variant="outlined">
                <Card
                  title={t('File 1 · Unweighted supporting sample counts')}
                  error={false}
                  primaryButton={t('Edit')}
                  secondaryButton={t('Delete')}
                  primaryClick={() => handleClickOpen('dialogAddFile', 'edit')}
                  secondaryClick={() => handleClickOpen('dialogSupportDelete')}
                  content={
                    <>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('File path')}
                      </Typography>
                      <div className={clsx(classes.filePath, 'mb-2')}>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Project folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Request folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'First level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Second level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography variant="body2" component="p">
                            {'Suporting file name example.doc'}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('Notes')}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {t(
                            'Notes section to include any details regarding the syntax file added. This will be helpful for the Researcher/Analyst during the vetting process.',
                        )}
                      </Typography>
                    </>
                  }
                />
                <Card
                  title={t('File 2 · Unweighted supporting sample counts')}
                  error={false}
                  primaryButton={t('Edit')}
                  secondaryButton={t('Delete')}
                  primaryClick={() => handleClickOpen('dialogAddFile', 'edit')}
                  secondaryClick={() => handleClickOpen('dialogSupportDelete')}
                  content={
                    <>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('File path')}
                      </Typography>
                      <div className={clsx(classes.filePath, 'mb-2')}>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Project folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Request folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'First level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Second level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography variant="body2" component="p">
                            {'Suporting file name example.doc'}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('Notes')}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {t(
                            'Notes section to include any details regarding the syntax file added. This will be helpful for the Researcher/Analyst during the vetting process.',
                        )}
                      </Typography>
                    </>
                  }
                />
              </Paper>
            </>
          ) : (
            <>
              <Paper className={classes.cardContainer} variant="outlined">
                <Card
                  title={t('File 1 · Unweighted supporting sample counts')}
                  error={false}
                  content={
                    <>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('File path')}
                      </Typography>
                      <div className={clsx(classes.filePath, 'mb-2')}>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Project folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Request folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'First level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Second level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography variant="body2" component="p">
                            {'Suporting file name example.doc'}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('Notes')}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {t(
                            'Notes section to include any details regarding the syntax file added. This will be helpful for the Researcher/Analyst during the vetting process.',
                        )}
                      </Typography>
                    </>
                  }
                />
                <Card
                  title={t('File 2 · Unweighted supporting sample counts')}
                  error={false}
                  content={
                    <>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('File path')}
                      </Typography>
                      <div className={clsx(classes.filePath, 'mb-2')}>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Project folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Request folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'First level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography
                            variant="body2"
                            component="p"
                            className="mr-1"
                          >
                            {'Second level folder example'}
                          </Typography>
                          <Icon
                            path={mdiChevronRight}
                            size={0.5}
                            className="mr-1"
                          />
                        </div>
                        <div className={classes.filePathItem}>
                          <Typography variant="body2" component="p">
                            {'Suporting file name example.doc'}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {t('Notes')}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {t(
                            'Notes section to include any details regarding the syntax file added. This will be helpful for the Researcher/Analyst during the vetting process.',
                        )}
                      </Typography>
                    </>
                  }
                />
              </Paper>
            </>
          )}
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, ' mt-2', 'mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
          <Typography variant="body2" component="p">
            {t(
                'Add file for syntax used for variable creation/analysis/running vetting tests *',
            )}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mt-2', 'mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
          <Typography variant="body2" component="p">
            {t('Add file for vetting test results *')}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mt-2', 'mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Descriptive statistics')}
      </Typography>
      <FormControl className="mb-2" component="fieldset">
        <FormLabel component="legend">
          {t('Does the request include descriptive statistics?')}
        </FormLabel>
        <RadioGroup
          id="descriptiveStats"
          value={state.descriptiveStats}
          name="descriptiveStats"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.descriptiveStats === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <FormControl className="mb-2" component="fieldset">
            <FormLabel component="legend" className={classes.lineHeight}>
              {t(
                  'Is the output clearly labelled (tables have a title and variables/categories are labelled)?',
              )}
            </FormLabel>
            <RadioGroup id="outpuLabelled">
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl className="mb-2" component="fieldset">
            <FormLabel component="legend">
              {t('Are minimum cell sizes met as per the rules for the data? *')}
            </FormLabel>
            <RadioGroup id="minimumCellSizes">
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
          <Typography variant="body2" component="p">
            {t(
                'Add file for supporting documentation (requirements in vetting rules) *',
            )}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mt-2', 'mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
        </div>
      )}
      <FormControl className="mb-2" component="fieldset" required>
        <FormLabel component="legend" className={classes.tooltipLabel}>
          {t(
              'Does this request include model output or graphs that are equivalent to a descriptive statistics?',
          )}
        </FormLabel>
        <RadioGroup
          id="equivalentDescriptiveStats"
          value={state.equivalentDescriptiveStats}
          name="equivalentDescriptiveStats"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.equivalentDescriptiveStats === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mb-3')}>
          <Typography variant="body2" component="p">
            {t(
                'Add file for unweighted frequency table for respondent counts *',
            )}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mt-2', 'mb-3')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Correlation/Covariance matrix')}
      </Typography>
      <FormControl className="mb-2" component="fieldset">
        <FormLabel component="legend">
          {t('Does this output include a correlation or covariance matrix?')}
        </FormLabel>
        <RadioGroup
          id="includeMatrix"
          value={state.covariance}
          name="covariance"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      {state.covariance === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'pb-3', 'mb-3')}>
          <FormControl className="mb-2" component="fieldset">
            <FormLabel component="legend">
              {t('Does the matrix include continuous variables?')}
            </FormLabel>
            <RadioGroup
              id="matrixContinuous"
              value={state.matrixContinuous}
              name="matrixContinuous"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          {state.matrixContinuous === 'Yes' && (
            <div className={clsx(classes.indentedSection, 'mb-3')}>
              <Typography variant="body2" component="p">
                {t('Add file for unweighted sample size *')}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                className="mb-2"
              >
                {t('At least one file must be added')}
              </Typography>
              <Paper className={classes.cardContainer} variant="outlined">
                <Typography variant="body2" component="p" color="textSecondary">
                  No files for support added
                </Typography>
              </Paper>
              {state.researcher() && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={clsx(classes.addBtn, 'mb-3', 'mt-2')}
                  onClick={() => handleClickOpen('dialogAddFile', 'add')}
                >
                  {t('Add file for support')}
                </Button>
              )}
            </div>
          )}
          <FormControl className="mb-2" component="fieldset">
            <FormLabel component="legend">
              {t('Does the matrix inclue dichotomous variables?')}
            </FormLabel>
            <RadioGroup
              id="matrixDichotomous"
              value={state.matrixDichotomous}
              name="matrixDichotomous"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          {state.matrixDichotomous === 'Yes' && (
            <div className={clsx(classes.indentedSection, 'mb-3')}>
              <Typography variant="body2" component="p">
                {t('Add file for unweighted cross-tabulation table *')}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                className="mb-2"
              >
                {t('At least one file must be added')}
              </Typography>
              <Paper className={classes.cardContainer} variant="outlined">
                <Typography variant="body2" component="p" color="textSecondary">
                  No files for support added
                </Typography>
              </Paper>
              {state.researcher() && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={clsx(classes.addBtn, 'mb-3', 'mt-2')}
                  onClick={() => handleClickOpen('dialogAddFile', 'add')}
                >
                  {t('Add file for support')}
                </Button>
              )}
            </div>
          )}
          <FormControl className="n-mb-1" component="fieldset">
            <FormLabel component="legend" className={classes.lineHeight}>
              {t(
                  'Does the matrix include a dichotomous variable correlated with continuous variable?',
              )}
            </FormLabel>
            <RadioGroup
              id="matrixCorrelated"
              value={state.matrixCorrelated}
              name="matrixCorrelated"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          {state.matrixCorrelated === 'Yes' && (
            <div className={clsx(classes.indentedSection, 'mt-3')}>
              <Typography variant="body2" component="p">
                {t(
                    'Add file for unweighted sub-totals for the categories of the dichotomous variable correlated with a continuous variable *',
                )}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                className="mb-2"
              >
                {t('At least one file must be added')}
              </Typography>
              <Paper className={classes.cardContainer} variant="outlined">
                <Typography variant="body2" component="p" color="textSecondary">
                  No files for support added
                </Typography>
              </Paper>
              {state.researcher() && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={clsx(classes.addBtn, 'mt-2', 'mb-3')}
                  onClick={() => handleClickOpen('dialogAddFile', 'add')}
                >
                  {t('Add file for support')}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      <Divider className="mb-3" />
      <Typography variant="subtitle2" component="h3" className="mb-3">
        {t('Rounding')}
      </Typography>
      <FormControl component="fieldset" className="n-mb-1" required>
        <FormLabel component="legend">
          {t('Is rounding of output required for this vetting request?')}
        </FormLabel>
        <RadioGroup
          id="roundingOutput"
          value={state.roundingOutput}
          name="roundingOutput"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      {state.roundingOutput === 'Yes' && (
        <div className={clsx(classes.indentedSection, 'mt-3')}>
          <TextField
            className="mb-3"
            margin="dense"
            id="roundingDesc"
            label={t('Rounding approach description')}
            variant="outlined"
            fullWidth
            required
            multiline
            defaultValue={state.rounding.text}
            error={Boolean(state.rounding.errorText)}
            helperText={state.rounding.errorText}
          />
          <Typography variant="body2" component="p">
            {t('Add file for unrounded version of this output *')}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className="mb-2"
          >
            {t('At least one file must be added')}
          </Typography>
          <Paper className={classes.cardContainer} variant="outlined">
            <Typography variant="body2" component="p" color="textSecondary">
              No files for support added
            </Typography>
          </Paper>
          {state.researcher() && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              className={clsx(classes.addBtn, 'mb-3', 'mt-2')}
              onClick={() => handleClickOpen('dialogAddFile', 'add')}
            >
              {t('Add file for support')}
            </Button>
          )}
        </div>
      )}
      {/* Output method help dialog */}
      <DialogOutputMethodHelp
        toggleDialog={() => handleClickClose('dialogOutputMethodHelp')}
        open={state.dialogOutputMethodHelp}
      />
      {/* Add file dialog */}
      <DialogAddFile
        submitDialog={() => handleClickClose('dialogAddFile')}
        toggleDialog={() => handleClickClose('dialogAddFile')}
        open={state.dialogAddFile}
        fileFunction={state.dialogFileFunction}
      />
      {/* Delete supporting file dialog */}
      <DialogDelete
        submitDialog={deleteSupportFile}
        open={state.dialogSupportDelete}
        toggleDialog={() => handleClickClose('dialogSupportDelete')}
      />
      {/* Delete supporting file snackbar */}
      <SnackbarDeleteSupportFile
        open={state.snackbarSupportDelete}
        handleClose={() => handleClickClose('snackbarSupportDelete')}
      />
    </>
  );
}
