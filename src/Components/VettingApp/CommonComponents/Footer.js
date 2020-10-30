import React from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import {DRAWER_WIDTH} from '../Dashboard/DashboardDrawer';

const date = moment().format('YYYY-MM-DD');

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    zIndex: 1200,
    padding: theme.spacing(3, 0, 3, 0),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: 'white',
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
  dateModified: {
    fontFamily: 'Roboto !important',
    color: '#0000008A',
    fontSize: '14px',
    fontWeight: '500',
    fontStyle: 'italic',
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
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
}));


const Footer = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <footer
      className={clsx(classes.footer, {
        [classes.contentShift]: props.open,
      })}
      ref={ref}
      tabIndex="-1">
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
          <Button className={classes.footerBtn}>{t('Terms and conditions')}</Button>
        </li>
        <li>
          <Button className={classes.footerBtn}>{t('Privacy')}</Button>
        </li>
        <li>
          <Typography variant="subtitle2" component="subtitle2" color="textSecondary"> Date modified: {date}</Typography>
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
