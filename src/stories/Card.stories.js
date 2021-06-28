import React from 'react';
import clsx from 'clsx';
import {Card} from '../Components/CommonComponents/Card';
import {Typography, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';

export default {
  title: 'Molecules/Card',
  component: Card,
};
const useStyles = makeStyles((theme) => ({
  addBtn: {
    'borderStyle': 'dashed',
    'justifyContent': 'start',
    'textAlign': 'left',
    'borderColor': 'rgba(0, 0, 0, 0.23)',
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
  },
  cardContainer: {
    maxWidth: '640px',
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export const Default = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Typography variant="body2" component="p">
        Add card *
      </Typography>
      <Typography variant="caption" color="textSecondary" component="p">
        At least one card must be added
      </Typography>
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
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        fullWidth="true"
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
    <div className={classes.cardContainer}>
      <Typography variant="body2" component="p">
        Add card *
      </Typography>
      <Typography variant="caption" color="textSecondary" component="p">
        At least one card must be added
      </Typography>
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
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        fullWidth="true"
        className={clsx(classes.addBtn, 'mt-3')}
      >
        Add card
      </Button>
    </div>
  );
};

export const NoCard = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Typography variant="body2" component="p">
        Add card *
      </Typography>
      <Typography variant="caption" color="textSecondary" component="p">
        At least one card must be added
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
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
    <div className={classes.cardContainer}>
      <Typography variant="body2" component="p" className={classes.errorText}>
        Add card *
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        component="p"
        className={classes.errorText}
      >
        At least one card must be added
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        fullWidth="true"
        className={clsx(classes.addBtn, 'mt-2')}
      >
        Add card
      </Button>
    </div>
  );
};
