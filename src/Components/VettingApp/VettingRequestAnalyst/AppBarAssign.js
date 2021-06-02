import React from 'react';
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
    padding: theme.spacing(0.5, 2),
    paddingRight: theme.spacing(0),
  },
  statusLeft: {
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    alignItems: 'center',
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
}));

function Assignee(props) {
  const {toggleManageTeamDrawer, lead, support} = props;
  // No analysts assigned
  if (lead === '' && support.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        Unassigned
      </Typography>
    );
    // Only lead analyst assigned
  } else if (lead !== '' && support.length === 0) {
    return (
      <>
        <Chip
          label={lead}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
      </>
    );
    // Only support analysts assigned
  } else if (lead === '' && support.length !== 0) {
    return (
      <>
        <Typography variant="body2" color="textSecondary">
          Unassigned
        </Typography>
      </>
    );
    // Both load and support analysts assigned
  } else {
    return (
      <>
        <Chip
          label={lead}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
        <Chip
          label={`${support.length} support`}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
          className="ml-1"
        />
      </>
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
        <Grid item>
          <div className={classes.statusLeft}>
            <Icon path={mdiInboxArrowDown} size={1} />
            <Typography variant="body2" className={classes.icongrey}>
              Submitted
            </Typography>
          </div>
        </Grid>
        <Divider className={classes.divider} orientation="vertical" />
        <Grid item className={classes.assignee}>
          <div className={classes.statusRight}>
            <Assignee {...props} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
