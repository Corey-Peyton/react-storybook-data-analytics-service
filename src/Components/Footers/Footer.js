import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@mdi/react';
import {mdiFacebook, mdiTwitter} from '@mdi/js';
const useStyles = makeStyles((theme) => ({
  footer: {
    margin: theme.spacing(3, 0, 3, 0),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      'justifyContent': 'center',
      '& ul': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  footerBtn: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 0.5, 0, 0),
  },
  canadaLogo: {
    height: '24px',
    flexGrow: 1,
    textAlign: 'right',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(3),
      textAlign: 'center',
    },
  },
  langBtnContainer: {
    paddingRight: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.divider,
  },
}));

const Footer = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <footer className={classes.footer} ref={ref} tabIndex="-1">
      <ul className="list-horizontal">
        <li>
          <div className={classes.langBtnContainer}>
            <h2 className="screen-reader-text">{t('Language selection')}</h2>
            <Button id="test" className={classes.footerBtn}>
              <span lang="fr">Français</span>
            </Button>
          </div>
        </li>
        <li>
          <IconButton
            aria-label={t('Facebook')}
            href="https://www.facebook.com/StatisticsCanada/"
            className={classes.footerBtn}
          >
            <Icon path={mdiFacebook} size={1} className="icon-grey" />
          </IconButton>
        </li>
        <li>
          <IconButton
            aria-label={t('Twitter')}
            href="https://twitter.com/StatCan_eng"
            className={classes.footerBtn}
          >
            <Icon path={mdiTwitter} size={1} className="icon-grey" />
          </IconButton>
        </li>
        <li>
          <Button className={classes.footerBtn}>{t('About')}</Button>
        </li>
        <li>
          <Button className={classes.footerBtn}>{t('Terms and conditions')}</Button>
        </li>
        <li>
          <Button className={classes.footerBtn}>{t('Privacy')}</Button>
        </li>
      </ul>
      <div className={classes.canadaLogo}>
        <img
          src={process.env.PUBLIC_URL + '/images/wmms.svg'}
          alt={t('Symbol of the Government of Canada')}
        />
      </div>
    </footer>
  );
});

export default Footer;
