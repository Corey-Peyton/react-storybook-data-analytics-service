import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {SM_SCREEN} from '../../../Theme/constants';
import {Button, Grid, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {HelpDrawer, FeedbackDialog} from './Dialogs';

const useStyles = makeStyles((theme) => ({
  footer: {
    margin: theme.spacing(3, 0, 3, 0),
  },
  footerBtn: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 0.5, 0, 0),
  },
  canadaLogo: {
    height: '24px',
  },
}));

const Footer = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });
  const [open, setOpen] = React.useState({
    helpDrawer: false,
    feedbackDialog: false,
  });

  const toggleDialog = (state, value) => {
    setOpen({...open, [state]: value});
  };

  const openDrawer = (element) => {
    setOpen({...open, [element]: true});
  };

  const closeDrawer = (element) => {
    setOpen({...open, [element]: false});
  };
  const isSmScreen = state.windowWidth < SM_SCREEN;

  React.useEffect(() => {
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state]);

  return (
    <>
      <footer className={classes.footer} ref={ref} tabIndex="-1">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <ul
                className={clsx({
                  'list-horizontal': !isSmScreen,
                })}
              >
                <li>
                  <Button className={classes.footerBtn}>{t('About')}</Button>
                </li>
                <li>
                  <Button
                    href="https://www.statcan.gc.ca/eng/reference/terms-conditions"
                    className={classes.footerBtn}
                  >
                    {t('Terms and conditions')}
                  </Button>
                </li>
                <li>
                  <Button
                    href="https://www.statcan.gc.ca/eng/reference/privacy"
                    className={classes.footerBtn}
                  >
                    {t('Privacy')}
                  </Button>
                </li>
                <li>
                  <Button
                    className={classes.footerBtn}
                    onClick={() => openDrawer('helpDrawer')}
                  >
                    {t('Help')}
                  </Button>
                </li>
                <li>
                  <Button
                    className={classes.footerBtn}
                    onClick={() =>
                      toggleDialog('feedbackDialog', !open.feedbackDialog)
                    }
                  >
                    {t('Feedback')}
                  </Button>
                </li>
              </ul>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Last modified on Feb 24, 2021
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <div className={classes.canadaLogo}>
                <img
                  src={process.env.PUBLIC_URL + '/images/wmms.svg'}
                  alt={t('Symbol of the Government of Canada')}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </footer>

      {/* Help drawer */}
      <HelpDrawer
        open={open.helpDrawer}
        closeDrawer={() => closeDrawer('helpDrawer')}
      />
      {/* Feedback dialog */}
      <FeedbackDialog
        open={open.feedbackDialog}
        toggleDialog={() =>
          toggleDialog('feedbackDialog', !open.feedbackDialog)
        }
      />
    </>
  );
});

export default Footer;
