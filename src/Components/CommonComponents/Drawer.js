import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Typography,
  IconButton,
  Drawer as MUIDrawer,
  Button,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(0, -3, 3, 0),
    boxShadow: theme.shadows[0],
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    position: 'fixed',
    top: 0,
    zIndex: 500,
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    padding: theme.spacing(1.5, 3),
  },
  drawerContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(3),
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
  },
  drawerSection: {
    paddingTop: theme.spacing(2),
    flexShrink: 0,
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
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  btnGroup: {
    '& button': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export function Drawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const content = () => (
    <>
      <div className={classes.drawerHeader}>
        <Typography component="h2" variant="h6">
          {props.title}
        </Typography>
        <IconButton
          onClick={props.toggleDrawer}
          edge="end"
          aria-label={`${props.title} - ${t('close panel')}`}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.drawerContent}>{props.content}</div>
      <div className={classes.footer}>
        <Grid container justify="space-between">
          <Grid item>
            {props.thirdButton && (
              <Button
                className={clsx(classes.thirdButton, 'MuiIconButton-edgeStart')}
                color="primary"
                onClick={props.handleThirdClick}
              >
                {props.thirdButton}
              </Button>
            )}
          </Grid>

          <Grid item className={classes.btnGroup}>
            {props.secondaryButton && (
              <Button
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
          </Grid>
        </Grid>
      </div>
    </>
  );

  return (
    <>
      <MUIDrawer
        anchor="right"
        open={props.open}
        onEscapeKeyDown={props.toggleDrawer}
        onBackdropClick={(e) => {
          e.preventDefault();
        }}
        variant="temporary"
        className={classes.drawer}
      >
        {content()}
      </MUIDrawer>
    </>
  );
}

Drawer.propTypes = {
  /**
   Drawers default state, true = open, false = closed
  */
  open: PropTypes.bool,
  /**
   Drawer header text
   */
  title: PropTypes.string.isRequired,
  /**
   Drawer content
   */
  content: PropTypes.node.isRequired,
  /**
   Text for primary button
   */
  primaryButton: PropTypes.string.isRequired,
  /**
   Text for secondary button
   */
  secondaryButton: PropTypes.string,
  /**
   Text for third button
   */
  thirdButton: PropTypes.string,
  /**
   Click handler for primary action
   */
  handlePrimaryClick: PropTypes.func.isRequired,
  /**
   Click handler for secondary action
   */
  handleSecondaryClick: PropTypes.func,
  /**
   Click handler for third action
   */
  handleThirdClick: PropTypes.func,
};

Drawer.defaultProps = {
  open: false,
};
