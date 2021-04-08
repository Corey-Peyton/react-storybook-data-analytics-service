import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Typography,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
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
  dialogFooter: {
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  secondaryButton: {
    marginRight: theme.spacing(1),
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

export function Dialog(props) {
  const classes = useStyles();
  const {
    toggleDialog,
    open,
    handleClose,
    id,
    title,
    content,
    primaryButton,
    secondaryButton,
    thirdButton,
    handlePrimaryClick,
    handleSecondaryClick,
    handleThirdClick,
  } = props;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <MUIDialog
        classes={{
          paper: classes.dialogPaper,
        }}
        onClose={handleClose}
        aria-labelledby={id}
        open={open}
        maxWidth="sm"
        fullWidth={true}
        disableBackdropClick
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle id={id} className={classes.dialogTitle} disableTypography>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton
            aria-label={`${title} - close`}
            onClick={toggleDialog}
            edge="end"
            onKeyPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.key === 'Enter') {
                toggleDialog(e);
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={classes.vettingSection}>{content}</div>
        </DialogContent>
        {secondaryButton || primaryButton ? (
          <DialogActions className={classes.dialogFooter}>
            <Grid container justify="space-between">
              <Grid item>
                {thirdButton && (
                  <Button
                    className={clsx(
                        classes.thirdButton,
                        'MuiIconButton-edgeStart',
                    )}
                    color="primary"
                    onKeyPress={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        handleThirdClick(e);
                      }
                    }}
                    onClick={handleThirdClick}
                  >
                    {secondaryButton}
                  </Button>
                )}
              </Grid>

              <Grid item>
                {secondaryButton && (
                  <Button
                    className={classes.secondaryButton}
                    variant="outlined"
                    color="primary"
                    onKeyPress={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        handleSecondaryClick(e);
                      }
                    }}
                    onClick={handleSecondaryClick}
                  >
                    {secondaryButton}
                  </Button>
                )}
                {primaryButton && (
                  <Button
                    variant="contained"
                    color="primary"
                    onKeyPress={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        handlePrimaryClick(e);
                      }
                    }}
                    onClick={handlePrimaryClick}
                  >
                    {primaryButton}
                  </Button>
                )}
              </Grid>
            </Grid>
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
   Text for third button
   */
  thirdButton: PropTypes.string,
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
  /**
   Click handler for third action
   */
  handleThirdClick: PropTypes.func,
};

Dialog.defaultProps = {
  open: false,
};
