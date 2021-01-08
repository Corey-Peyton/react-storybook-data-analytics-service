import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Drawer,
  Chip,
  Button,
} from '@material-ui/core';
import {
  green,
  orange,
} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
  drawerHeader: {
    'display': 'flex',
    'alignItems': 'center',
    'zIndex': 10,
    'height': '4em',
    'minHeight': '4em',
    'position': 'sticky',
    'top': 0,
    'background': 'white',
    'borderBottomWidth': '1px',
    'borderBottomStyle': 'solid',
    'borderBottomColor': theme.palette.divider,
    '& > svg': {
      marginRight: theme.spacing(2),
    },
    'margin': theme.spacing(0, 2),
  },
  drawerLabel: {
    textTransform: 'uppercase',
  },
  drawerText: {
    height: '100%',
    marginBottom: theme.spacing(2),
    overflowY: 'auto',
  },
  drawerSection: {
    padding: theme.spacing(2, 2, 0, 2),
    flexShrink: 0,
  },
  closeBtn: {
    flexGrow: 1,
    textAlign: 'right',
  },
  listIcon: {
    color: theme.palette.common.black,
  },
  drawerButton: {
    height: 36,
    alignSelf: 'flex-end',
    margin: theme.spacing(0, 3, 3, 0),
  },
  chip: {
    '& .MuiChip-label:first-letter': {
      textTransform: 'uppercase',
    },
  },
  chipGreen: {
    backgroundColor: green[500],
    color: 'white',
  },
  chipRed: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  chipBlue: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  chipGrey: {
    backgroundColor: theme.palette.grey[300],
    color: 'black',
  },
  chipOrange: {
    backgroundColor: orange[500],
    color: 'white',
  },
}));

export default function SummaryDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const content = () => (
    <div className={classes.drawerContent}>
      <div className={classes.drawerHeader}>
        <Typography component="h2" variant="h6">{t('Vetting request summary')}</Typography>
        <div className={classes.closeBtn}>
          <IconButton
            onClick={props.clickHandler}
            edge="end"
            id="details-close"
            aria-label={t('Project information panel - close panel')}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.drawerText}>
        <div className={classes.drawerSection}>
          <Chip label={props.status}
            className={clsx(classes.chip, {
              [classes.chipGreen]: props.status === 'Approved',
              [classes.chipRed]: props.status === 'Denied',
              [classes.chipBlue]: props.status === 'Submitted',
              [classes.chipGrey]: props.status === 'Draft' || props.status === 'Withdrawn',
              [classes.chipOrange]: props.status === 'Disclosure analysis' || props.status === 'Update requested',
            })} />
        </div>
        <div className={classes.drawerSection}>
          <Typography component="h3" variant="subtitle2" className={classes.drawerLabel}>{t('Project Name')}</Typography>
          <Typography variant="body2">{t('DAaas-45789')}</Typography>
          <Typography variant="body2">{t('ID_102020_4564677')}</Typography>
        </div>
        <div className={classes.drawerSection}>
          <Typography component="h3" variant="subtitle2" className={classes.drawerLabel}>{t('Files requested')}</Typography>
          <Typography variant="body2">{t('This is file #1')}</Typography>
          <Typography variant="body2">{t('Another file')}</Typography>
          <Typography variant="body2">{t('A large file name with lorem ipsum')}</Typography>
          <Typography variant="body2">{t('File 8')}</Typography>
          <Typography variant="body2">{t('File 13')}</Typography>
          <Typography variant="body2">{t('File 57')}</Typography>
        </div>
        <div className={classes.drawerSection}>
          <Typography component="h3" variant="subtitle2" className={classes.drawerLabel}>{t('Approved date')}</Typography>
          <Typography variant="body2">{t('September 29, 2020')}</Typography>
        </div>
        <div className={classes.drawerSection}>
          <Typography component="h3" variant="subtitle2" className={classes.drawerLabel}>{t('Principal analyst')}</Typography>
          <Typography variant="body2">Brian Bill</Typography>
          <Typography variant="body2">brian.bill@cloud.statcan.ca</Typography>
          <Typography variant="body2">(613) 333-3333</Typography>
        </div>
        <div className={classes.drawerSection}>
          <Typography component="h3" variant="subtitle2" className={classes.drawerLabel}>{t('Total billable hours')}</Typography>
          <Typography variant="body2">15 {t('Hours')}</Typography>
        </div>
      </div>
      <Button variant="contained" color="primary" className={classes.drawerButton} >
        {t('View vetting request')}
      </Button>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor='right'
        open={props.open}
        onEscapeKeyDown={props.clickHandler}
        onBackdropClick={props.clickHandler}
        variant='temporary'
      >
        {content()}
      </Drawer>
    </div>
  );
}