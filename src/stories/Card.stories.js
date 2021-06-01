import React from 'react';
import clsx from 'clsx';
import {Card} from '../Components/CommonComponents/Card';
import {
  IconButton,
  ListItemText,
  Typography,
  MenuItem,
  Button,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {grey} from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import {mdiMenuDown, mdiFileDocumentOutline} from '@mdi/js';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';

export default {
  title: 'Molecules/Card',
  component: Card,
};
const useStyles = makeStyles((theme) => ({
  addCard: {
    width: '100%',
    border: '2px dashed',
    borderColor: grey[500],
    justifyContent: 'start',
  },
  cardContainer: {
    maxWidth: '600px',
  },
}));

export const Default = (args) => {
  const classes = useStyles();
  // const {t} = useTranslation();
  // const [anchorEl, setAnchorEl] = React.useState(null);

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
      <Button color="primary" className={clsx(classes.addCard, 'mt-3')}>
        <AddIcon />
        Add card
      </Button>
    </div>
  );
};

export const Errors = (args) => {
  const classes = useStyles();
  // const {t} = useTranslation();
  // const [anchorEl, setAnchorEl] = React.useState(null);

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
        // icon={mdiFileDocumentOutline}
      />
      <Button color="primary" className={clsx(classes.addCard, 'mt-3')}>
        <AddIcon />
        Add card
      </Button>
    </div>
  );
};
