import React from 'react';
import clsx from 'clsx';
import {Grid, Chip, Typography, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {mdiInboxArrowDown} from '@mdi/js';
import Icon from '@mdi/react';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  assignee: {
    display: 'flex',
    alignItems: 'center',
  },
  icongrey: {
    marginLeft: theme.spacing(1),
  },
  statusContainer: {
    padding: theme.spacing(0, 2, 0, 0),
  },
  requesterContainer: {
    padding: theme.spacing(0, 2, 0, 2),
  },
  assigneeContainer: {
    padding: theme.spacing(0, 0, 0, 2),
  },
  headerBtn: {
    marginLeft: theme.spacing(1),
  },
  gridDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      marginTop: theme.spacing(3),
    },
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    height: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
}));

function Assignee(props) {
  const classes = useStyles();
  const {toggleManageTeamDrawer, lead, support} = props;
  // No analysts assigned
  if (lead === '' && support.length === 0) {
    return (
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          Unassigned
        </Typography>
      </div>
    );
    // Only lead analyst assigned
  } else if (lead !== '' && support.length === 0) {
    return (
      <div className={classes.details}>
        <Chip
          label={lead}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
      </div>
    );
    // Only support analysts assigned
  } else if (lead === '' && support.length !== 0) {
    return (
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          Unassigned
        </Typography>
      </div>
    );
    // Both load and support analysts assigned
  } else {
    return (
      <div className={classes.details}>
        <Chip
          label={lead}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
          className={'mr-1'}
        />
        <Chip
          label={`${support.length} support`}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
      </div>
    );
  }
}

function AppBarUnAssign(props) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item className={classes.title} md={5} xs={12}>
        <Typography variant="caption" component="p">
          Project 20-SSH-UTO-1111 · Request 0101-000000
        </Typography>
        <Typography variant="h5" component="h1">
          {props.title}
        </Typography>
      </Grid>
      <Grid item md={7} xs={12} className={classes.gridDetails}>
        <Grid item className={classes.alignCenter}>
          <div className={classes.statusContainer}>
            <Typography variant="caption" component="p">
              Status
            </Typography>
            <Grid className={clsx(classes.alignCenter, classes.details)}>
              <Icon path={mdiInboxArrowDown} size={1} />
              <Typography
                variant="body2"
                component="p"
                className={classes.icongrey}
              >
                Submitted
              </Typography>
            </Grid>
          </div>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <div className={classes.requesterContainer}>
              <Typography variant="caption" component="p">
                Requester
              </Typography>
              <div className={classes.details}>
                <Chip
                  label="Steve Rogers"
                  onClick={props.toggleRequesterDetails}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item className={classes.assignee}>
          <div className={classes.assigneeContainer}>
            <Typography variant="caption" component="p">
              Assignee
            </Typography>
            <Assignee {...props} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
