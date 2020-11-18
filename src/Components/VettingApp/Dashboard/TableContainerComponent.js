import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';

import DialogBox from './DialogBox';
import CustomizedMenus from '../CommonComponents/ContextMenu';
import DashboardTableHead from './DashboardTableHead';

const ROW_HEIGHT = 57;

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: 'white',
    width: 'auto',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  table: {
    padding: 0,
  },
  tablesCellsFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: `calc(${ROW_HEIGHT}px - ${theme.spacing(2)}px)`,
  },
  tableRow: {
    cursor: 'pointer',
    height: ROW_HEIGHT,
  },
  status: {
    textTransform: 'uppercase',
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function TableContainerComponent(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {t} = useTranslation();
  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.filteredRows().length - page * rowsPerPage);

  return (
    <TableContainer
      className={classes.tableContainer}
    >
      <Table
        className={classes.table}
        aria-label={t('All')}
        size='medium'
        stickyHeader
      >
        <DashboardTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={props.filteredRows.length}
          headCells={props.headCells}
        />
        <TableBody>
          {
            stableSort(props.filteredRows(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      className={classes.tableRow}
                      // onClick={(event) => handleClick(event, row.id)}
                      // aria-checked={isItemSelected}
                      // selected={isItemSelected}
                    >
                      <TableCell id={labelId} className={classes.tablesCells}>
                        <Typography variant="body2" noWrap={true}>{row.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap={true} className={classes.status}>{row.status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap={true}>{row.researcher}</Typography>
                      </TableCell>
                      <TableCell className={classes.tablesCellsFlex}>
                        <Typography variant="body2" noWrap={true}>{row.lead}</Typography>
                        <DialogBox selectedValue='null'/>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap={true}>{row.created}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap={true}>{row.updated}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <CustomizedMenus
                          status={row.status}
                          contextSummaryClick={props.contextSummaryClick}
                          contextStatusClick={props.contextStatusClick}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
          }
          {emptyRows > 0 && (
            <TableRow style={{height: (ROW_HEIGHT) * emptyRows}}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        className={classes.tablePagination}
        component="div"
        count={props.filteredRows().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
