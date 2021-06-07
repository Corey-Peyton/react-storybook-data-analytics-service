import React from 'react';
import clsx from 'clsx';
import {Card} from '../Components/CommonComponents/Card';
import {Typography, Button} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';

export default {
  title: 'Molecules/Card',
  component: Card,
};
const useStyles = makeStyles((theme) => ({
  addCard: {
    'width': '100%',
    'borderStyle': 'dashed',
    // borderColor: grey[500],
    'justifyContent': 'start',
    '&.MuiButton-outlinedPrimary:hover': {
      borderStyle: 'dashed',
    },
  },
  cardContainer: {
    maxWidth: '600px',
  },
}));

export const Default = (args) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Typography variant="h6">Add card *</Typography>
      <Typography variant="body2">Helper text</Typography>
      <Card
        title="Card title"
        error={false}
        primaryButton="Edit"
        secondaryButton="Delete"
        content={
          <>
            <Typography variant="body2">
              This is the content for the card.
            </Typography>
          </>
        }
      />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        className={clsx(classes.addCard, 'mt-3')}
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
      <Typography variant="h6">Add card *</Typography>
      <Typography variant="body2">Helper text</Typography>
      <Card
        title="Card title"
        error={true}
        totalErrors={200}
        primaryButton="Edit"
        secondaryButton="Delete"
        content={
          <>
            <Typography variant="body2">
              This is the content for the card.
            </Typography>
          </>
        }
      />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        className={clsx(classes.addCard, 'mt-3')}
      >
        Add card
      </Button>
    </div>
  );
};
