import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Typography,
  Box,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Projects from './Projects';

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    '& .MuiBox-root': {
      paddingTop: 0,
      minHeight: 'calc(100vh - 184px - 144px)',
      maxHeight: 'calc(100vh - 184px - 144px)',
      overflowY: 'auto',
    },
  },
  tableHead: {
    '& th': {
      width: '33%',
      padding: theme.spacing(2.5, 1),
    },
  },
}));

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

export default function ProjectsPage(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <TabPanel value={props.value} index={0} className={classes.tabPanel}>
        <Table aria-label={t('Active projects')} stickyHeader >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>{t('Project')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Virtual machine')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Projects
              toggleDetailsDrawer={props.toggleDetailsDrawer}
              status="Active"
            />
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={props.value} index={1} className={classes.tabPanel}>
        <Table aria-label={t('Expired projects')} className={classes.table} stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>{t('Project')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Virtual machine')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Projects status="Expired" />
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={props.value} index={2} className={classes.tabPanel}>
        <Table aria-label={t('All projects')} className={classes.table} stickyHeader>
          <TableHead className={classes.tableHead} >
            <TableRow>
              <TableCell>{t('Project')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Virtual machine')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Projects
              toggleDetailsDrawer={props.toggleDetailsDrawer}
              status="All"
            />
          </TableBody>
        </Table>
      </TabPanel>
    </React.Fragment>
  );
}
