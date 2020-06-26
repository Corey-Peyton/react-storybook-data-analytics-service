import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@mdi/react';
import {mdiFacebook, mdiTwitter} from '@mdi/js';
const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: theme.spacing(3),
    },
  },
  footerBtn: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 0.5),
  },
  canadaLogo: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(6),
    height: '24px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  langBtnContainer: {
    paddingRight: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey[300],
    display: 'inline-block',
    height: 'auto',
  },
}));

const LoginFooter = (props) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.langBtnContainer}>
        <h2 className="screen-reader-text">{t('Language selection')}</h2>
        <Button id="test" className={classes.footerBtn}>
          <span lang="fr">Français</span>
        </Button>
      </div>
      <IconButton
        aria-label={t('Facebook')}
        href="https://www.facebook.com/StatisticsCanada/"
        className={classes.footerBtn}
      >
        <Icon path={mdiFacebook} size={1} className="icon-grey" />
      </IconButton>
      <IconButton
        aria-label={t('Twitter')}
        href="https://twitter.com/StatCan_eng"
        className={classes.footerBtn}
      >
        <Icon path={mdiTwitter} size={1} className="icon-grey" />
      </IconButton>
      <Button className={classes.footerBtn}>{t('About')}</Button>
      <Button className={classes.footerBtn}>{t('Terms and conditions')}</Button>
      <Button className={classes.footerBtn}>{t('Privacy')}</Button>
      <img
        src={process.env.PUBLIC_URL + '/images/wmms.svg'}
        alt={t('Symbol of the Government of Canada')}
        className={classes.canadaLogo}
      />
    </footer>
  );
};

export default LoginFooter;
