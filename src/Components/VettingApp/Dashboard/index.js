import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Typography,
  Box,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Header from '../CommonComponents/Header';
import Footer from '../CommonComponents/Footer';
import DashboardDrawer from './DashboardDrawer';
import AnalystModal from './AnalystModal';
import BypassBlocks from '../../BypassBlocks';

import {requestListResearchers} from '../../../Data/fakeData';
import CustomizedMenus from '../CommonComponents/ContextMenu';

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.grey[100],
    padding: '100px',
    minHeight: `calc(100vh - 284px)`,
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    position: 'static',
    top: 0,
    left: 'auto',
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  appBarHeader: {
    color: theme.palette.text.primary,
    background: theme.palette.grey[100],
    position: 'static',
    top: 0,
    left: 'auto',
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingRight: '0px !important',
    boxShadow: 'none !important',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
  tableContainer: {
    backgroundColor: 'white',
    width: 'auto',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  table: {
    padding: 0,
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
  thead: {
    width: '15.7%',
  },
  theadNarrow: {
    width: '7%',
  },
  tabs: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.grey[300],
  },
  tabPanel: {
    '& .MuiBox-root': {
      width: '100%',
      padding: 0,
      boxSizing: 'border-box',
      overflowY: 'auto',
      boxShadow: '0px 2px 4px -1px rgba(117,117,117,0.2), 0px 4px 5px 0px rgba(117,117,117,0.14), 0px 1px 10px 0px rgba(117,117,117,0.12)',
    },
  },
  tableHead: {
    '& th': {
      padding: theme.spacing(2.5, 1),
    },
  },
  tablesCellsFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function createData(id, statusHead, status, researcherEmail, analystEmail, submitted, updated) {
  return {id, statusHead, status, researcherEmail, analystEmail, submitted, updated};
}

let tabStatus = 'active';

const rows = requestListResearchers.map((el, index) =>
  createData(el.id, el.statusHead, el.status, el.researcherEmail, el.analystEmail, el.submitted, el.updated),
);

const filteredRows = () => {
  return (
    rows.filter((val) => val.statusHead === tabStatus)
  );
  // if (tabStatus === 'active') {
  //   return rows;
  // } else {
  //   return (
  //     rows.filter((val) => val.statusHead === tabStatus)
  //   );
  // }
};

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

const headCells = [
  {id: 'id', narrow: false, disablePadding: true, label: 'ID'},
  {id: 'status', narrow: false, disablePadding: false, label: 'Status'},
  {id: 'researcher', narrow: false, disablePadding: false, label: 'Researcher'},
  {id: 'analystEmail', narrow: false, disablePadding: false, label: 'Analyst'},
  {id: 'created', narrow: false, disablePadding: false, label: 'Created on'},
  {id: 'updated', narrow: false, disablePadding: false, label: 'Updated on'},
  {id: 'actions', narrow: true, disablePadding: false, label: 'Actions'},
];

function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort} = props;
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
              <Typography noWrap='true'>{headCell.label}</Typography>
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// /////////// TABPANEL
function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`projects-tabpanel-${index}`}
      aria-labelledby={`projects-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TableContainerComponent(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {t} = useTranslation();
  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const openAnalystModal = (event, el) => {
  //   console.log(event);
  // };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows().length - page * rowsPerPage);

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
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={filteredRows.length}
        />
        <TableBody>
          {
            stableSort(filteredRows(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell id={labelId} className={classes.tablesCells}>
                        <Typography variant="body2" noWrap='true'>{row.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap='true'>{row.status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap='true'>{row.researcherEmail}</Typography>
                      </TableCell>
                      <TableCell className={classes.tablesCellsFlex}>
                        <Typography variant="body2" noWrap='true'>{row.analystEmail}</Typography>
                        <AnalystModal/>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap='true'>{row.submitted}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap='true'>{row.updated}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <CustomizedMenus status={row.statusHead}/>
                      </TableCell>
                    </TableRow>
                  );
                })
          }
          {emptyRows > 0 && (
            <TableRow style={{height: (57) * emptyRows}}>
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
    </TableContainer>
  );
}

export default function VettingDashboardDeveloper() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState({
    drawer: false,
  });
  const [project, setProject] = React.useState({
    title: 'All projects',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        tabStatus = 'active';
        break;
      case 1:
        tabStatus = 'withdrawn';
        break;
      case 2:
        tabStatus = 'approved';
        break;
      case 3:
        tabStatus = 'denied';
        break;
      default:
        tabStatus = 'active';
    }
  };

  const toggleDrawer = () => {
    setOpen({...open, drawer: !open.drawer});
  };

  const handleProjectTitle = (value) => {
    setProject({...project, title: value});
  };

  const mainRef = React.createRef();
  const aboutRef = React.createRef();


  return (
    <React.Fragment>
      <Header clickHandler={toggleDrawer}/>
      <main className={classes.main}>
        <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
        <Paper
          className={clsx(classes.content, classes.paper, {
            [classes.contentShift]: open.drawer,
          })}
          elevation={0}
        >
          <DashboardDrawer
            open={open.drawer}
            projectTitle={handleProjectTitle}
          />
          <AppBar
            className={classes.appBarHeader}
            elevation={0}
          >
            <Typography
              variant="h4"
              component="h2"
            >
              {project.title}
            </Typography>
            <Button variant="contained" color="primary">
            New Vetting request
            </Button>
          </AppBar>
          <AppBar
            position="static"
            component="div"
            className={classes.appBar}
            ref={mainRef} tabIndex="-1"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Vetting request tabs"
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
            >
              <Tab label="ACTIVE" {...a11yProps(0)} />
              <Tab label="WITHDRAWN" {...a11yProps(1)} />
              <Tab label="APPROVED" {...a11yProps(2)} />
              <Tab label="DENIED" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <TableContainerComponent status="active" />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            <TableContainerComponent status="withdrawn"/>
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabPanel}>
            <TableContainerComponent status="approved"/>
          </TabPanel>
          <TabPanel value={value} index={3} className={classes.tabPanel}>
            <TableContainerComponent status="denied"/>
          </TabPanel>
        </Paper>
      </main>
      <Footer />
    </React.Fragment>
  );
}
