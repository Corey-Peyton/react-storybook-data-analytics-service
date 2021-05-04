import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from '@material-ui/styles';
import {XS_SCREEN, SM_SCREEN} from '../../Theme/constants';
import Icon from '@mdi/react';
import {mdiTune} from '@mdi/js';

import {datasets} from '../../Data/fakeData';
import {sortByKey, sortByKeyDesc} from '../../Utils/sorting';
import BypassBlocks from '../CommonComponents/BypassBlocks';
import Footer from '../Footers/Footer';
import DefaultHeader from '../Headers/DefaultHeader';
import FilterPills from './FilterPills';
import Filters from './Filters';
import ResultItem from './ResultItem';

const useStyles = makeStyles((theme) => ({
  sortContainer: {
    'padding': theme.spacing(0, 1),
    '& .MuiGrid-item': {
      display: 'flex',
    },
  },
  sort: {
    flexGrow: 1,
  },
  numResults: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  results: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(0, 1),
  },
  pagination: {
    marginBottom: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
  filtersBtn: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Results(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    numResults: 437,
    sortBy: 10,
    searchTerm: queryString.parse(props.location.search).search,
    offset: 0,
    filters: {
      selected: true,
      subjects: ['Coal', 'Prices'],
      commodities: [],
      sources: [],
      date: {startDate: '2009-10-24', endDate: '2011-03-10'},
      frequency: [],
      geography: [],
    },
    windowWidth: window.innerWidth,
    drawer: false,
  });

  const mainRef = React.createRef();
  const aboutRef = React.createRef();
  const ref = React.createRef();
  const isSmScreen = state.windowWidth < SM_SCREEN;
  const isXsScreen = state.windowWidth < XS_SCREEN;

  const handleChangeSort = (event) => {
    setState({...state, sortBy: event.target.value});

    if (event.target.value === 20) {
      sortByKeyDesc(datasets, 'dateReleased');
    } else {
      sortByKey(datasets, 'id');
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({...state, drawer: open});
  };

  React.useEffect(() => {
    document.title = `${t('DAaaS - Results for Coal')}`;
    // document.title = `${t('DAaaS - Results for')} ${state.searchTerm}`;

    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state, state.searchTerm, t]);

  return (
    <React.Fragment>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <DefaultHeader />
      <main ref={mainRef} tabIndex="-1">
        <Container maxWidth="xl" className="page-container">
          <Typography variant="h1" className="screen-reader-text">
            {t('Search results')}
          </Typography>
          <Grid container>
            <Grid item sm={3} lg={3}>
              <Filters
                ref={ref}
                drawer={state.drawer}
                toggleDrawer={toggleDrawer}
                isSmScreen={isSmScreen}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              ref={ref}
              className={isSmScreen ? '' : 'pl-2'}
              tabIndex="-1"
            >
              <FilterPills searchTerm="Coal" filters={state.filters} />
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.sortContainer}
              >
                <Grid item xs={12} sm={12} md={5} lg={4}>
                  <FormControl variant="outlined" className={classes.sort}>
                    <InputLabel id="sort-by-label">{t('Sort by')}</InputLabel>
                    <Select
                      id="sort-by"
                      value={state.sortBy}
                      onChange={handleChangeSort}
                      labelId="sort-by-label"
                      margin="dense"
                      label={t('Sort by')}
                    >
                      <MenuItem value={10}>{t('Relevance')}</MenuItem>
                      <MenuItem value={20}>{t('Release date')}</MenuItem>
                    </Select>
                  </FormControl>
                  {isSmScreen && (
                    <IconButton
                      aria-label={t('Filters')}
                      className={classes.filtersBtn}
                      edge="end"
                      onClick={toggleDrawer(true)}
                    >
                      <Icon path={mdiTune} size={1} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.numResults}
                    variant="body2"
                    color="textSecondary"
                  >
                    {state.numResults} {t('results')} (0.78 {t('seconds')})
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="column" className={classes.results}>
                {datasets.map((pumf) => {
                  return <ResultItem key={pumf.id} {...pumf} />;
                })}
              </Grid>
              {isXsScreen ? (
                <Pagination
                  className={classes.pagination}
                  count={Math.ceil(state.numResults / 8)}
                  defaultPage={1}
                  siblingCount={0}
                />
              ) : (
                <Pagination
                  className={classes.pagination}
                  count={Math.ceil(state.numResults / 8)}
                />
              )}
              <Divider />
              <Grid item xs={12}>
                <Footer ref={aboutRef} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
