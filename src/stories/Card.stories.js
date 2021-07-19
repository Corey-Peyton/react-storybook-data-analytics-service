import React from 'react';
import clsx from 'clsx';
import {Card} from '../Components/CommonComponents/Card';
import {Paper, Typography, Button, Box} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiPlus} from '@mdi/js';
import {makeStyles, fade} from '@material-ui/core/styles';

export default {
  title: 'Molecules/Card',
  component: Card,
};
const useStyles = makeStyles((theme) => ({
  addBtn: {
    'marginTop': theme.spacing(-1),
    'borderStyle': 'dashed',
    'justifyContent': 'start',
    'width': '100%',
    'textAlign': 'left',
    'borderColor': fade(theme.palette.common.black, 0.23),
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
  },
  maxWidth: {
    maxWidth: '640px',
  },
  cardContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderColor: fade(theme.palette.common.black, 0.08),
    marginBottom: theme.spacing(3),
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export const Default = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p">
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Card
          title="Card title"
          error={false}
          primaryButton="Edit"
          secondaryButton="Delete"
          content={
            <>
              <Typography variant="body2" component="p">
                This is the content for the card.
              </Typography>
            </>
          }
        />
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        fullWidth={true}
        className={clsx(classes.addBtn, 'mt-2')}
      >
        Add card
      </Button>
    </div>
  );
};

export const Errors = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p">
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Card
          title="Card title"
          error={true}
          totalErrors={200}
          primaryButton="Edit"
          secondaryButton="Delete"
          content={
            <>
              <Typography variant="body2" component="p">
                This is the content for the card.
              </Typography>
            </>
          }
        />
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        fullWidth="true"
        className={clsx(classes.addBtn, 'mt-2')}
      >
        Add card
      </Button>
    </div>
  );
};

export const NoCard = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p">
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Typography variant="caption" component="p" color="textSecondary">
          No cards added
        </Typography>
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        fullWidth="true"
        className={clsx(classes.addBtn, 'mt-2')}
      >
        Add card
      </Button>
    </div>
  );
};

export const NoCardError = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p" className={classes.errorText}>
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className={clsx(classes.errorText, 'mb-2')}
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Typography variant="caption" component="p" color="textSecondary">
          No cards added
        </Typography>
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon path={mdiPlus} size={1} />}
        fullWidth="true"
        className={clsx(classes.addBtn, 'mt-2')}
      >
        Add card
      </Button>
    </div>
  );
};

export const ReadOnly = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p">
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Card
          title="Card title"
          error={false}
          primaryButton="View details"
          content={
            <>
              <Typography variant="body2" component="p">
                This is the content for the card.
              </Typography>
            </>
          }
        />
      </Paper>
    </div>
  );
};

export const NoCardReadOnly = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.maxWidth}>
      <Typography variant="body2" component="p">
        Add card... *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className="mb-2"
      >
        At least one card must be added
      </Typography>
      <Paper className={classes.cardContainer} variant="outlined">
        <Typography variant="caption" component="p" color="textSecondary">
          No cards added
        </Typography>
      </Paper>
    </div>
  );
};
