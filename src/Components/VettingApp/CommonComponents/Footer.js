import React from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import {DRAWER_WIDTH} from '../Dashboard/Common/ProjectsDrawer';

const date = moment().format('YYYY-MM-DD');

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 'auto',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    background: theme.palette.grey[100],
  },
  footerContainer: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    margin: theme.spacing(0, 3, 0, 3),
    padding: theme.spacing(3, 0),
  },
  footerBtn: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1, 0, 0),
  },
  canadaLogo: {
    height: '24px',
    margin: theme.spacing(3, 0),
  },
  langBtnContainer: {
    marginRight: theme.spacing(1),
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.divider,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${DRAWER_WIDTH}px)`,
  },
}));

const Footer = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <footer
      className={clsx(classes.root, classes.footer, {
        [classes.contentShift]: props.open,
      })}
      ref={ref}
      tabIndex="-1"
    >
      <div className={classes.footerContainer}>
        <ul className="list-horizontal">
          <li>
            <div className={classes.langBtnContainer}>
              <h2 className="screen-reader-text">{t('Language selection')}</h2>
              <Button
                id="test"
                className={clsx(classes.footerBtn, 'MuiIconButton-edgeStart')}
              >
                <span lang="fr">Français</span>
              </Button>
            </div>
          </li>
          <li>
            <Button className={classes.footerBtn}>
              {t('Terms and conditions')}
            </Button>
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
        <Typography variant="body2" color="textSecondary" component="p">
          Date modified: {date}
        </Typography>
      </div>
    </footer>
  );
});

export default Footer;
