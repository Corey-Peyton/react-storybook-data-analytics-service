import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Typography,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {Button} from './Button';
import {IconButton} from './IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 3),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
  dialogFooter: {
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  secondaryButton: {
    marginRight: theme.spacing(1),
  },
}));

export function Dialog(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MUIDialog
        classes={{
          paper: classes.dialogPaper,
        }}
        onClose={props.handleClose}
        aria-labelledby={props.id}
        open={props.open}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          id={props.id}
          className={classes.dialogTitle}
          disableTypography
        >
          <Typography variant="h6" component="h2">
            {props.title}
          </Typography>
          <IconButton onClick={props.handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {props.content}
        </DialogContent>
        {props.secondaryButton || props.primaryButton ? (
          <DialogActions className={classes.dialogFooter}>
            {props.secondaryButton && (
              <Button
                className={classes.secondaryButton}
                variant="outlined"
                color="primary"
                onClick={props.handleSecondaryClick}
              >
                {props.secondaryButton}
              </Button>
            )}
            {props.primaryButton && (
              <Button
                variant="contained"
                color="primary"
                onClick={props.handlePrimaryClick}
              >
                {props.primaryButton}
              </Button>
            )}
          </DialogActions>
        ) : (
          ''
        )}
      </MUIDialog>
    </React.Fragment>
  );
}

Dialog.propTypes = {
  /**
   Dialog id used for a11y
  */
  id: PropTypes.string.isRequired,
  /**
   Dialogs default state, true = open, false = closed
  */
  open: PropTypes.bool,
  /**
   Dialog header text
   */
  title: PropTypes.string.isRequired,
  /**
   Dialog content
   */
  content: PropTypes.node.isRequired,
  /**
   Text for primary button
   */
  primaryButton: PropTypes.string,
  /**
   Text for secondary button
   */
  secondaryButton: PropTypes.string,
  /**
   Click handler to close dialog
   */
  handleClose: PropTypes.func.isRequired,
  /**
   Click handler for primary action
   */
  handlePrimaryClick: PropTypes.func,
  /**
   Click handler for secondary action
   */
  handleSecondaryClick: PropTypes.func,
};

Dialog.defaultProps = {
  open: false,
};
