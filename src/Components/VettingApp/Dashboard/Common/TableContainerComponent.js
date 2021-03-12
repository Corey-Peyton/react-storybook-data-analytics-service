import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles, fade} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
} from '@material-ui/core';

import {DialogAnalyst} from '../../CommonComponents/DialogBox';
import {ActionsMenu} from './ContextMenu';
import DashboardTableHead from './DashboardTableHead';
import AnalystCell from './AnalystCell';

export const ROW_HEIGHT = 57;

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
    'cursor': 'pointer',
    'height': ROW_HEIGHT,
    '&:focus': {
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
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
  const {
    role,
    filteredRows,
    headCells,
    contextSummaryClick,
    contextStatusClick,
    toggleManageTeamDrawer,
  } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState({
    info: false,
    role: '',
  });
  const {t} = useTranslation();
  const classes = useStyles();
  const history = useHistory();

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

  function toggleDialog(value, e, role) {
    e.stopPropagation();
    if (value === 'info') {
      setOpen({...open, info: !open.info, role: role});
    }
  }

  const navigateToRequest = () => {
    history.push({
      pathname:
        role === 'researcher' ?
          '/vetting-app/request-researcher' :
          '/vetting-app/request-analyst-assigned',
    });
  };

  const navigateRows = (e) => {
    const current = e.target;
    if (e.key === 'ArrowUp') {
      if (
        current.previousElementSibling &&
        current.previousElementSibling.classList.contains('MuiTableRow-root')
      ) {
        current.previousElementSibling.focus();
      }
    } else if (e.key === 'ArrowDown') {
      if (
        current.nextElementSibling &&
        current.nextElementSibling.classList.contains('MuiTableRow-root')
      ) {
        current.nextElementSibling.focus();
      }
    }
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows().length - page * rowsPerPage);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table
        className={classes.table}
        aria-label={t('All')}
        size="medium"
        stickyHeader
      >
        <DashboardTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={filteredRows.length}
          headCells={headCells}
        />
        <TableBody>
          {stableSort(filteredRows(), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
              // const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={0}
                    key={row.id}
                    className={classes.tableRow}
                    onClick={navigateToRequest}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        navigateToRequest();
                      }
                    }}
                    onKeyUp={navigateRows}
                  >
                    <TableCell id={labelId} className={classes.tablesCells}>
                      <Typography variant="body2" noWrap={true}>
                        {row.title}
                      </Typography>
                      <Typography variant="body2" noWrap={true}>
                      ID {row.id}
                      </Typography>
                    </TableCell>
                    {role === 'analyst' ? (
                    <TableCell>
                      <Typography
                        variant="body2"
                        noWrap={true}
                        className={classes.status}
                      >
                        {row.project}
                      </Typography>
                    </TableCell>
                  ) : (
                    false
                  )}
                    <TableCell>
                      <Typography
                        variant="body2"
                        noWrap={true}
                        className={classes.status}
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.researcher}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDialog('info', e, 'requester');
                        }}
                      />
                    </TableCell>
                    <AnalystCell
                      lead={row.lead}
                      support={row.support}
                      role={role}
                      toggleDialog={(e) => {
                        e.stopPropagation();
                        toggleDialog('info', e, 'assignee');
                      }}
                      toggleManageTeamDrawer={toggleManageTeamDrawer}
                    />
                    <TableCell>
                      <Typography variant="body2" noWrap={true}>
                        {row.created}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap={true}>
                        {row.updated}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ActionsMenu
                        status={row.status}
                        contextSummaryClick={contextSummaryClick}
                        contextStatusClick={contextStatusClick}
                        toggleManageTeamDrawer={toggleManageTeamDrawer}
                        role={role}
                        controls={index}
                        analyst={row}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

          {emptyRows > 0 && (
            <TableRow style={{height: ROW_HEIGHT * emptyRows}}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        className={classes.tablePagination}
        component="div"
        count={filteredRows().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DialogAnalyst
        open={open.info}
        toggleDialog={(e) => toggleDialog('info', e, open.role)}
        header={
          open.role === 'assignee' ? 'Assignee details' : 'Requester details'
        }
      />
    </TableContainer>
  );
}
