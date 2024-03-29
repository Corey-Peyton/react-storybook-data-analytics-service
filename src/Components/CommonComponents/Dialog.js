import React from 'react';
import {useTranslation} from 'react-i18next';
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
  Button,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@mdi/react';
import {mdiArrowLeft} from '@mdi/js';

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
  btnGroup: {
    '& button': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export function Dialog(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {
    toggleDialog,
    open,
    id,
    title,
    content,
    primaryButton,
    secondaryButton,
    thirdButton,
    backButton,
    handlePrimaryClick,
    handleSecondaryClick,
    handleThirdClick,
    handleBackClick,
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
        onClose={toggleDialog}
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
          <Grid container alignItems="center">
            {backButton && (
              <Grid item>
                <IconButton
                  className="mr-1"
                  aria-label={backButton}
                  edge="start"
                  onClick={handleBackClick}
                  onKeyPress={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      handleBackClick();
                    }
                  }}
                >
                  <Icon path={mdiArrowLeft} size={1} />
                </IconButton>
              </Grid>
            )}
            <Grid item>
              <Typography component="h2" variant="h6">
                {title}
              </Typography>
            </Grid>
          </Grid>
          <IconButton
            aria-label={`${title} - ${t('close')}`}
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
          <div className={classes.dialogContent}>{content}</div>
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
                    {thirdButton}
                  </Button>
                )}
              </Grid>

              <Grid item className={classes.btnGroup}>
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
   Text for back button
   */
  backButton: PropTypes.string,
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
  /**
   Click handler for back button
   */
  handleBackClick: PropTypes.func,
};

Dialog.defaultProps = {
  open: false,
};
