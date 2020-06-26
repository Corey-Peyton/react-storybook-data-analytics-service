
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Container, Grid, IconButton, Link, Typography} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {makeStyles} from '@material-ui/styles';

import {FOOT_H} from '../../Theme/constants';
import {withRouterAndRef} from '../Utilities/HOCs';

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  links: {
    'display': 'flex',
    'flexWrap': 'wrap',
    'listStyleType': 'none',
    '& li': {
      marginLeft: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      'width': '100%',
      'justifyContent': 'space-evenly',
      '& li': {
        margin: 0,
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& li': {
        flexBasis: '50%',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
      },
    },
  },
  root: {
    height: FOOT_H,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
  },
  socialMedia: {
    '& button': {
      marginRight: theme.spacing(2),
    },
  },
}));

const Footer = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <footer ref={ref} tabIndex="-1">
      <Container maxWidth="xl">
        <Grid container alignItems="center" className={classes.root}>
          <Grid item className={classes.socialMedia}>
            <IconButton
              aria-label={t('Facebook')}
              href="https://www.facebook.com/StatisticsCanada/"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label={t('Twitter')}
              href="https://twitter.com/StatCan_eng"
            >
              <TwitterIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.linkContainer}>
            <nav aria-labelledby="aboutsite">
              <h2 id="aboutsite" className="screen-reader-text">
                {t('About this site')}
              </h2>
              <ul className={classes.links}>
                <li>
                  <Link
                    color="textPrimary"
                    href="https://www.statcan.gc.ca/eng/reference/privacy?MM=1"
                  >
                    <Typography variant="body1">{t('Privacy')}</Typography>
                  </Link>
                </li>
                <li>
                  <Link
                    color="textPrimary"
                    href="https://www.statcan.gc.ca/eng/about/about?MM=as"
                  >
                    <Typography variant="body1">{t('About us')}</Typography>
                  </Link>
                </li>
                <li>
                  <Link
                    color="textPrimary"
                    href="https://www.statcan.gc.ca/eng/transparency-accountability"
                  >
                    <Typography variant="body1">{t('Transparency')}</Typography>
                  </Link>
                </li>
                <li>
                  <Link
                    color="textPrimary"
                    href="https://www.statcan.gc.ca/eng/reference/terms-conditions?MM=1"
                  >
                    <Typography variant="body1">{t('Terms and conditions')}</Typography>
                  </Link>
                </li>
              </ul>
            </nav>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
});

export default withRouterAndRef(Footer);
