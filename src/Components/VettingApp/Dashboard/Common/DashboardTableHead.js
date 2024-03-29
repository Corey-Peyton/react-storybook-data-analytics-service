import React from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  thead: {
    width: '15.7%',
  },
  theadNarrow: {
    width: '7%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function DashboardTableHead(props) {
  const {order, orderBy, onRequestSort, headCells} = props;
  const {t} = useTranslation();
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.narrow ? classes.theadNarrow : classes.thead}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography noWrap={true}>{t(headCell.label)}</Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DashboardTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
