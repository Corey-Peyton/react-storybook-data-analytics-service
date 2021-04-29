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
import Icon from '@mdi/react';
import {
  mdiUndo,
  mdiFileEditOutline,
  mdiInboxArrowDown,
  mdiProgressCheck,
  mdiCheck,
  mdiCancel,
  mdiEmailEditOutline,
} from '@mdi/js';

import {
  DialogRequesterDetails,
  DialogAssigneeDetails,
} from '../../CommonComponents/DialogBox';
import {ActionsMenu} from './ContextMenu';
import DashboardTableHead from './DashboardTableHead';
import AnalystCell from './AnalystCell';
import {currentDateTime} from '../../../../Data/fakeData';

export const ROW_HEIGHT = 58;

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
  statusCell: {
    display: 'flex',
  },
  status: {
    'paddingLeft': theme.spacing(1),
    '&:first-letter': {
      textTransform: 'capitalize',
    },
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
    statusHead,
  } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState({
    dialogRequesterDetails: false,
    dialogAssigneeDetails: false,
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

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

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

  const statusIcon = (value) => {
    switch (value) {
      case 'withdrawn':
        return <Icon path={mdiUndo} size={1} className={classes.statusIcon} />;
      case 'draft':
        return (
          <Icon
            path={mdiFileEditOutline}
            size={1}
            className={classes.statusIcon}
          />
        );
      case 'submitted':
        return (
          <Icon
            path={mdiInboxArrowDown}
            size={1}
            className={classes.statusIcon}
          />
        );
      case 'under review':
        return (
          <Icon
            path={mdiProgressCheck}
            size={1}
            className={classes.statusIcon}
          />
        );
      case 'approved':
        return <Icon path={mdiCheck} size={1} className={classes.statusIcon} />;
      case 'denied':
        return (
          <Icon path={mdiCancel} size={1} className={classes.statusIcon} />
        );
      case 'changes requested':
        return (
          <Icon
            path={mdiEmailEditOutline}
            size={1}
            className={classes.statusIcon}
          />
        );
      default:
        return;
    }
  };

  const handleDateTime = (value) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const timeDifference = currentDateTime - value;
    const month = months[value.getMonth()];
    const day = value.getDate();
    const year = value.getFullYear();
    let time;
    // 1000ms = 1s
    // 60000ms = 1min
    // 3600000 = 1hr
    // 86400000 = 24hr

    if (timeDifference < 60000) {
      // under 1 minute
      return 'Just now';
    } else if (timeDifference >= 60000 && timeDifference < 3600000) {
      // between 1 minute - 1 hour
      time = Math.floor(timeDifference / 60000);
      if (time === 1) {
        return '1 min ago';
      } else {
        return time + ' mins ago';
      }
    } else if (timeDifference >= 3600000 && timeDifference < 86400000) {
      // between 1 hour - 24 hours
      time = Math.floor(timeDifference / 3600000);
      if (time === 1) {
        return '1 hour ago';
      } else {
        return time + ' hours ago';
      }
    } else if (timeDifference >= 86400000) {
      // over 24 hours
      return month + ' ' + day + ', ' + year;
    }
  };

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
                      <Typography variant="body2" noWrap={true}>
                        {row.project}
                      </Typography>
                    </TableCell>
                  ) : (
                    false
                  )}
                    <TableCell>
                      <div className={classes.tablesCellsFlex}>
                        {statusIcon(row.status)}
                        <Typography
                          variant="body2"
                          noWrap={true}
                          className={classes.status}
                        >
                          {row.status}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.researcher}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDialog(
                              'dialogRequesterDetails',
                              !open.dialogRequesterDetails,
                              e,
                          );
                        }}
                      />
                    </TableCell>
                    <AnalystCell
                      lead={row.lead}
                      support={row.support}
                      role={role}
                      statusHead={row.statusHead}
                      toggleManageTeamDrawer={toggleManageTeamDrawer}
                      clickHandler={(e) => {
                        toggleDialog(
                            'dialogAssigneeDetails',
                            !open.dialogAssigneeDetails,
                            e,
                        );
                      }}
                    />
                    <TableCell>
                      <Typography variant="body2" noWrap={true}>
                        {row.created}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap={true}>
                        {handleDateTime(row.updated)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ActionsMenu
                        statusHead={row.statusHead}
                        status={row.status}
                        contextSummaryClick={contextSummaryClick}
                        contextStatusClick={contextStatusClick}
                        toggleManageTeamDrawer={toggleManageTeamDrawer}
                        role={role}
                        controls={index}
                        request={row}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

          {emptyRows > 0 && (
            <TableRow style={{height: ROW_HEIGHT * emptyRows}}>
              <TableCell colSpan={8} />
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
      <DialogRequesterDetails
        open={open.dialogRequesterDetails}
        toggleDialog={(e) =>
          toggleDialog(
              'dialogRequesterDetails',
              !open.dialogRequesterDetails,
              e,
          )
        }
      />
      <DialogAssigneeDetails
        open={open.dialogAssigneeDetails}
        toggleDialog={(e) => {
          toggleDialog('dialogAssigneeDetails', !open.dialogAssigneeDetails, e);
        }}
        role={role}
        statusHead={statusHead}
      />
    </TableContainer>
  );
}
