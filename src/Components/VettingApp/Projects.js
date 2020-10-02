import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Typography,
  TableCell,
  TableRow,
  Grid,
  Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {sortByKey} from '../../Utils/sorting';
import {requestListResearchers} from '../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  info: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.grey[300],
    padding: [theme.spacing(0, 1), '!important'],
  },
  storage: {
    flexGrow: 1,
  },
  storageBar: {
    height: theme.spacing(1),
    width: '100%',
    backgroundColor: theme.palette.grey[300],
    margin: theme.spacing(0.5, 0),
  },
  storageBarGrey: {
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  storageBarFull: {
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.error.main,
    },
  },
  greyedOutIcon: {
    fill: theme.palette.grey[400],
  },
  tableRow: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
}));

export default function Projects(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const requestsSorted = sortByKey(requestListResearchers, 'name');

  return (
    <React.Fragment>
      {requestsSorted.map((request) => {
        if (request.status === props.status || props.status === 'All') {
          const isActive = request.status === 'Active';

          return (
            <TableRow
              key={request.id}
              hover={isActive ? true : false}
              className={classes.tableRow}
            >
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.submitted}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.updated}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item className={classes.storage}>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.requesterEmail}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item className={classes.storage}>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.analystEmail}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item className={classes.storage}>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.status}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item className={classes.storage}>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {request.files.length}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item className={classes.storage}>
                    <Button
                      variant="contained">
                        View summary
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          );
        } else {
          return '';
        }
      })}
    </React.Fragment>
  );
}
