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
    height: '40px',
    marginTop: theme.spacing(1.25),
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
  },
  headerBtn: {
    marginLeft: theme.spacing(1),
  },
}));

function Assignee(props) {
  const {toggleManageTeamDrawer, lead, support, handleDialogOpen} = props;
  const classes = useStyles();
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
        <Chip
          label={`${support.length} support`}
          className={classes.headerBtn}
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
          No lead
        </Typography>
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
    // Both load and support analysts assigned
  } else {
    return (
      <>
        <Chip label={lead} onClick={handleDialogOpen} />
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
      <Grid item className={classes.title}>
        <Typography variant="subtitle1" component="p">
          Vetting request · ID 0101-000000
        </Typography>
        <Typography variant="h6" component="h1">
          {props.title}
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.statusLeft}>
          <Icon path={mdiInboxArrowDown} size={1} />
          <Typography variant="body2" className={classes.icongrey}>
            Submitted
          </Typography>
        </div>
      </Grid>
      <Divider className={classes.divider} orientation="vertical" flexItem />
      <Grid item className={classes.assignee}>
        <div className={classes.statusRight}>
          <Assignee {...props} />
        </div>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
