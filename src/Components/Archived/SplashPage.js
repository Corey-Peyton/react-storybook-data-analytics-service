import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      width: '1050px',
      marginLeft: 'calc((100vw - 1050px)/2)',
      justifyContent: 'flex-end',
    },
  },
  card: {
    zIndex: '500',
    width: '500px',
    position: 'absolute',
    top: '35%',
    [theme.breakpoints.up('lg')]: {
      top: '20%',
      left: '-250px',
    },
  },
  cardActions: {
    'padding': theme.spacing(2),
    'backgroundColor': theme.palette.grey[100],
    '& a': {
      marginRight: theme.spacing(2),
      display: 'inline-block',
    },
  },
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  langButtons: {
    'margin': theme.spacing(4, 0, 2, 0),
    '& a': {
      minWidth: '120px',
    },
    '& a:nth-child(2)': {
      marginLeft: theme.spacing(3),
    },
  },
}));

export default function SplashPageArchived() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          src={process.env.PUBLIC_URL + '/images/login-background.jpg'}
          alt=""
        />
        <Card id="lang-card" className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid item xs={8}>
                <img src={process.env.PUBLIC_URL + '/images/sig-blk-en.svg'} alt="" />
                <span className="screen-reader-text">
                  Government of Canada /{' '}
                  <span lang="fr">Gouvernement du Canada</span>
                </span>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item className={classes.langButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/home"
                >
                  English
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/home"
                >
                  <span lang="fr">Français</span>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Link
                  component={RouterLink}
                  to="/terms-and-conditions"
                >
                  <Typography variant="body1">Terms and conditions</Typography>
                </Link>
                <Link
                  component={RouterLink}
                  to="/terms-and-conditions"
                >
                  <Typography variant="body1">
                    <span lang="fr">Avis</span>
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs>
                <img src={process.env.PUBLIC_URL + '/images/wmms-blk.svg'} alt="" />
                <span className="screen-reader-text">
                  Symbol of the Government of Canada /{' '}
                  <span lang="fr">Symbole du gouvernement du Canada</span>
                </span>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
