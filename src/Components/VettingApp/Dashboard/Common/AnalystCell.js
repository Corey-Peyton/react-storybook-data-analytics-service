import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, TableCell, Chip} from '@material-ui/core';

import {ROW_HEIGHT} from './TableContainerComponent';

const useStyles = makeStyles((theme) => ({
  tablesCellsFlex: {
    display: 'flex',
    alignItems: 'center',
    minHeight: `calc(${ROW_HEIGHT}px - ${theme.spacing(2)}px)`,
  },
  leadChip: {
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
  },
}));

export default function AnalystCell(props) {
  const {t} = useTranslation();
  const {
    role,
    analysts,
    support,
    toggleDialog,
    toggleManageTeamDrawer,
  } = props;
  const extraAnalysts = support.length;
  const classes = useStyles();

  if (role === 'researcher') {
    if (analysts !== '') {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analysts} onClick={toggleDialog} />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('Unassigned')}
          </Typography>
        </TableCell>
      );
    }
  } else if (role === 'analyst') {
    if (analysts !== '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip
            label={analysts}
            onClick={(e) => {
              e.stopPropagation();
              toggleManageTeamDrawer(e);
            }}
            className="mr-1"
          />
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleManageTeamDrawer(e);
            }}
          />
        </TableCell>
      );
    } else if (analysts !== '' && support.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip
            label={analysts}
            onClick={(e) => {
              e.stopPropagation();
              toggleManageTeamDrawer(e);
            }}
          />
        </TableCell>
      );
    } else if (analysts === '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('No lead')}
          </Typography>
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleManageTeamDrawer(e);
            }}
            className="ml-1"
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('Unassigned')}
          </Typography>
        </TableCell>
      );
    }
  }
}
