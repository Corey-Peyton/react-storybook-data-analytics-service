import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card as MUICard,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    'marginTop': theme.spacing(2),
    '&:first-child': {
      marginTop: theme.spacing(0),
    },
    'flexGrow': 1,
    '& .MuiCardHeader-root': {
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  cardActionsError: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.error.light,
  },
  cardError: {
    'border': '1px solid',
    'borderColor': theme.palette.error.light,
    '& .MuiCardHeader-root': {
      color: theme.palette.error.main,
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.error.light,
    },
  },
}));

export function Card(props) {
  const classes = useStyles();
  const errorHeaderMsg = function() {
    if (props.error && props.totalErrors === 1) {
      return (
        <Typography variant="caption" component="p">
          1 error
        </Typography>
      );
    } else if (props.error && props.totalErrors > 99) {
      return (
        <Typography variant="caption" component="p">
          99+ errors
        </Typography>
      );
    } else if (
      props.error &&
      props.totalErrors > 1 &&
      props.totalErrors <= 99
    ) {
      return (
        <Typography variant="caption" component="p">
          {props.totalErrors} errors
        </Typography>
      );
    }
  };

  return (
    <MUICard
      className={clsx(classes.card, {
        [classes.cardError]: props.error,
      })}
      variant="outlined"
    >
      <CardHeader
        title={<Typography variant="subtitle2">{props.title}</Typography>}
        subheader={errorHeaderMsg()}
      />
      {props.content && (
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              {props.content}
            </Grid>
          </Grid>
        </CardContent>
      )}
      {(props.primaryButton || props.secondaryButton) && (
        <CardActions
          className={clsx({
            [classes.cardActions]: props.error === false,
            [classes.cardActionsError]: props.error === true,
          })}
        >
          <Button color="primary" onClick={props.primaryClick}>
            {props.primaryButton}
          </Button>
          {props.secondaryButton && (
            <Button color="primary" onClick={props.secondaryClick}>
              {props.secondaryButton}
            </Button>
          )}
        </CardActions>
      )}
    </MUICard>
  );
}

Card.propTypes = {
  /**
    The title of the card header.
  */
  title: PropTypes.string,
  /**
    Toggles the error state of the card.
  */
  error: PropTypes.bool,
  /**
    The amount of errors.
  */
  totalErrors: PropTypes.number,
  /**
 The content of the card body.
 */
  content: PropTypes.element,
  /**
    The label text of the primary button.
  */
  primaryButton: PropTypes.string.isRequired,
  /**
    The label text of the secondary button.
  */
  secondaryButton: PropTypes.string,
  /**
  The function of the primary button.
*/
  primaryClick: PropTypes.func,
  /**
  The function of the secondary button.
*/
  secondaryClick: PropTypes.func,
};
