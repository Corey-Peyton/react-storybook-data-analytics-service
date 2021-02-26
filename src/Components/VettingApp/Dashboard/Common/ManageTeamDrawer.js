import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {green, blue, red} from '@material-ui/core/colors';
import {
  Typography,
  IconButton,
  Drawer,
  Button,
  Box,
  Avatar,
  Link,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import {AnalystMenu} from '../../Dashboard/Common/ContextMenu';
import {analystList} from '../../../../Data/fakeData';

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiLink-root:focus': {
      border: 'none',
    },
  },
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
  drawerLabel: {
    textTransform: 'uppercase',
  },
  drawerContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
  },
  drawerSection: {
    'paddingTop': theme.spacing(3),
    'flexShrink': 0,
    '&:first-child': {
      padding: 0,
    },
  },
  listIcon: {
    color: theme.palette.common.black,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1.75, 3),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    position: 'fixed',
    bottom: 0,
    width: '400px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    zIndex: 500,
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'padding': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  vettingText: {
    paddingLeft: theme.spacing(1),
  },
  analystListing: {
    display: 'flex',
    flexFlow: 'column',
    marginRight: 'auto',
  },
  avatar: {
    color: theme.palette.grey[100],
  },
  widthAuto: {
    width: 'auto !important',
  },
  textNowrap: {
    whiteSpace: 'nowrap',
  },
}));

export default function ManageTeamDrawer(props) {
  const classes = useStyles();
  const {clickHandler, open, colorList} = props;
  const {t} = useTranslation();
  const [analysts, setAnalysts] = React.useState(analystList);
  const [selected, setSelected] = React.useState([]);

  const makeLead = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.role === 'lead' ?
          {...item, role: 'support'} :
          item.id === value.id ?
          {...item, role: 'lead'} :
          item,
        ),
    );
  };

  const makeSupport = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ? {...item, role: 'support'} : item,
        ),
    );
  };

  const unassignRequest = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ?
          {...item, assigned: false, role: 'support'} :
          item,
        ),
    );
  };

  function selectSupports(value) {
    const ids = value.map((item) => {
      return item.id;
    });

    setAnalysts(
        analysts.map((item) =>
        ids.includes(item.id) ?
          {...item, assigned: true, role: 'support'} :
          item,
        ),
    );

    setSelected([]);
  }

  const handleAvatarStyle = (value) => {
    return {
      backgroundColor: value,
    };
  };

  const leadAnalysts = () => {
    const content = analysts
        .filter((analyst) => analyst.assigned && analyst.role === 'lead')
        .map((analyst, index) => {
          console.log(analyst.avatar);
          return (
            <div className={classes.vettingRow} key={analyst.id}>
              <Avatar
                style={handleAvatarStyle(analyst.avatar)}
                className={classes.avatar}
              >
                {handleInitials(analyst.name)}
              </Avatar>
              <div className={classes.analystListing}>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.name}
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  {analyst.email}
                </Typography>
              </div>
              <AnalystMenu
                role={'lead'}
                makeSupport={makeSupport(analyst)}
                unassignRequest={unassignRequest(analyst)}
                controls={index}
              />
            </div>
          );
        });
    if (content.length > 0) {
      return content;
    } else {
      return (
        <div className={classes.vettingRow}>
          <Box fontStyle="italic" className={classes.box}>
            <Typography>{t('No lead assigned')}</Typography>
          </Box>
        </div>
      );
    }
  };

  const handleInitials = (value) => {
    const name = value;
    const splitName = name.split(' ');
    const initA = splitName[0].charAt(0).toUpperCase();
    const initB = splitName[1].charAt(0).toUpperCase();
    return initA.concat(initB);
  };

  const content = () => (
    <div className={classes.root}>
      <div className={classes.drawerHeader}>
        <Typography component="h2" variant="h6">
          {t('Manage assignees')}
        </Typography>
        <IconButton
          onClick={clickHandler}
          edge="end"
          id="details-close"
          aria-label={t('Project information panel - close panel')}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.drawerContent}>
        <div className={classes.vettingSection}>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Typography variant="subtitle2">{t('Lead')}</Typography>
            </div>
            <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
              <Link
                variant="body2"
                component="button"
                className={classes.textNowrap}
              >
                Assign to me
              </Link>
            </div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>{leadAnalysts()}</div>
          </div>
          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <Typography variant="subtitle2">
                {t('Support Analysts')}
              </Typography>
            </div>
          </div>

          <div className={classes.vettingRow}>
            <div className={classes.vettingColumn}>
              <div className={classes.supportAnalysts}>
                {analysts
                    .filter(
                        (analyst) => analyst.assigned && analyst.role === 'support',
                    )
                    .map((analyst, index) => {
                      return (
                        <div
                          className={classes.vettingRow}
                          key={analyst.id}
                          style={{height: 'auto'}}
                        >
                          <Avatar
                            style={handleAvatarStyle(analyst.avatar)}
                            className={classes.avatar}
                          >
                            {handleInitials(analyst.name)}
                          </Avatar>
                          <div className={classes.analystListing}>
                            <Typography
                              className={classes.vettingText}
                              variant="body2"
                            >
                              {analyst.name}
                            </Typography>
                            <Typography
                              className={classes.vettingText}
                              variant="body2"
                            >
                              {analyst.email}
                            </Typography>
                          </div>
                          <AnalystMenu
                            role={'support'}
                            makeLead={makeLead(analyst)}
                            unassignRequest={unassignRequest(analyst)}
                            controls={index}
                          />
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <Button variant="contained" color="primary">
          {t('View vetting request')}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onEscapeKeyDown={clickHandler}
        onBackdropClick={clickHandler}
        variant="temporary"
        className={classes.drawer}
      >
        {content()}
      </Drawer>
    </div>
  );
}
