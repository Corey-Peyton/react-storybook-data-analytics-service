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
  divider: {
    height: theme.spacing(5),
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
  statusRight: {
    padding: theme.spacing(0.5, 0),
    paddingLeft: theme.spacing(2),
  },
  statusLeft: {
    padding: theme.spacing(0.5, 2, 0.5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
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
          Vetting request · ID 0101-000000
        </Typography>
        <Typography variant="h5" component="h1">
          {props.title}
        </Typography>
      </Grid>
      <Grid item md={7} xs={12} className={classes.gridDetails}>
        <Grid item className={classes.alignCenter}>
          <div className={classes.statusLeft}>
            <Typography>Status</Typography>
            <Grid className={clsx(classes.alignCenter, classes.details)}>
              <Icon path={mdiInboxArrowDown} size={1} />
              <Typography variant="body2" className={classes.icongrey}>
                Submitted
              </Typography>
            </Grid>
          </div>
          <Grid item>
            <div className={classes.statusLeft}>
              <Typography>Requester</Typography>
              <div className={classes.details}>
                <Chip
                  label="Steve Rogers"
                  onClick={props.toggleManageTeamDrawer}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider className={classes.divider} orientation="vertical" />

        <Grid item className={classes.assignee}>
          <div className={classes.statusRight}>
            <Typography>Assignees</Typography>
            <Assignee {...props} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
