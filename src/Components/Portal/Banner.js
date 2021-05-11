import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import clsx from 'clsx';
import {Typography, Button, Grid, Paper} from '@material-ui/core';
import {darkTheme} from '../../Theme/theme';
import {
  AccountDetailsDialog,
  DataUseDialog,
  AdditionalInfoDialog,
  TasksToolsDialog,
  RegisterDialog,
  SuccessDialog,
} from './CommonComponents/Dialogs';

const useStyles = makeStyles((theme) => ({
  banner: {
    textAlign: 'left',
    boxSizing: 'border-box',
    borderRadius: 0,
    margin: theme.spacing(0, -6, 6, -6),
  },
  bannerWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  bannerContent: {
    padding: theme.spacing(12, 0, 12, 6),
  },
  bannerBtn: {
    width: '320px',
    padding: theme.spacing(1.5),
  },
  logo: {
    marginRight: theme.spacing(3),
  },
  triangles: {
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL +
      '/images/daaas-triangles.svg'})`,
    backgroundPosition: 'left',
    backgroundRepeat: 'repeat',
    width: '100%',
  },
}));

function Banner(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [open, setOpen] = React.useState({
    accountDetailsDialog: false,
    dataUseDialog: false,
    additionalInfoDialog: false,
    tasksToolsDialog: false,
    registerDialog: false,
    successDialog: false,
  });

  const toggleDialog = (element, value) => {
    setOpen({...open, [element]: value});
  };

  const handleNext = (current, next) => {
    setOpen({...open, [current]: false, [next]: true});
  };

  const handleBack = (prev, current) => {
    setOpen({...open, [prev]: true, [current]: false});
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper className={classes.banner}>
          <Grid
            container
            justify="space-between"
            className={classes.bannerWrapper}
          >
            <Grid item xs={8} lg={6} className={classes.bannerContent}>
              <Grid container alignItems="center">
                <Grid item>
                  <img
                    className={classes.logo}
                    src={process.env.PUBLIC_URL + '/images/daaas-logo.svg'}
                    alt=""
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h3" component="h1" color="textPrimary">
                    {t('Data Analytics as a Service')}
                  </Typography>
                  <Typography variant="h5" component="h2" color="textPrimary">
                    {t('Harness the power of your data')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className="mt-3 mb-6" color="textPrimary">
                {t(`Our platforms provide virtual access to Statistics Canada data.
                From these platforms, choose from a variety of tools to help
                prepare and transform datasets. Use the Collaborative Analytics
                Environment (CAE) and the Advanced Analytics Workspace (AAW) to
                analyze and present data to help share compelling data stories.`)}
              </Typography>
              <Grid container direction="column">
                <Grid item>
                  <Button
                    className={clsx(classes.bannerBtn, 'mb-3')}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      toggleDialog(
                          'accountDetailsDialog',
                          !open.accountDetailsDialog,
                      )
                    }
                  >
                    {t('Get started')}
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.bannerBtn} variant="outlined">
                    {t('Sign in')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} lg={6} className={classes.triangles} />
          </Grid>
        </Paper>
      </ThemeProvider>

      {/* Account details dialog */}
      <AccountDetailsDialog
        open={open.accountDetailsDialog}
        toggleDialog={() =>
          toggleDialog('accountDetailsDialog', !open.accountDetailsDialog)
        }
        handleNext={() => handleNext('accountDetailsDialog', 'dataUseDialog')}
      />
      {/* Data use details dialog */}
      <DataUseDialog
        open={open.dataUseDialog}
        toggleDialog={() => toggleDialog('dataUseDialog', !open.dataUseDialog)}
        handleNext={() => handleNext('dataUseDialog', 'tasksToolsDialog')}
        handleBack={() => handleBack('accountDetailsDialog', 'dataUseDialog')}
        additionalInfo={() =>
          toggleDialog('additionalInfoDialog', !open.additionalInfoDialog)
        }
      />
      {/* Additional info dialog */}
      <AdditionalInfoDialog
        open={open.additionalInfoDialog}
        toggleDialog={() =>
          toggleDialog('additionalInfoDialog', !open.additionalInfoDialog)
        }
      />
      {/* Tasks and tools dialog */}
      <TasksToolsDialog
        open={open.tasksToolsDialog}
        toggleDialog={() =>
          toggleDialog('tasksToolsDialog', !open.tasksToolsDialog)
        }
        handleNext={() => handleNext('tasksToolsDialog', 'registerDialog')}
        handleBack={() => handleBack('dataUseDialog', 'tasksToolsDialog')}
      />
      {/* Register dialog */}
      <RegisterDialog
        open={open.registerDialog}
        toggleDialog={() =>
          toggleDialog('registerDialog', !open.registerDialog)
        }
        submitRegistration={() => handleNext('registerDialog', 'successDialog')}
        handleBack={() => handleBack('tasksToolsDialog', 'registerDialog')}
      />
      {/* Register dialog */}
      <SuccessDialog
        open={open.successDialog}
        toggleDialog={() => toggleDialog('successDialog', !open.successDialog)}
      />
    </>
  );
}
export default Banner;
