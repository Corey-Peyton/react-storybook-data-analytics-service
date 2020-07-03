import React from 'react';
import {useTranslation} from 'react-i18next';
import {Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import queryString from 'query-string';

import {datasets} from '../../Data/fakeData';
import {sortByKey, sortByKeyDesc} from '../../Utils/sorting';
import BypassBlocks from '../BypassBlocks';
import Footer from '../Footers/Footer';
import DefaultHeader from '../Headers/DefaultHeader';
import Pagination from '../Pagination';
import FilterPills from './FilterPills';
import Filters from './Filters';
import ResultItem from './ResultItem';

const useStyles = makeStyles((theme) => ({
  sortContainer: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(1.5),
  },
  sort: {
    width: '100%',
  },
  results: {
    margin: theme.spacing(4, 0, 8, 0),
    paddingLeft: theme.spacing(1.5),
  },
  tab: {
    'minWidth': 0,
    '& svg': {
      verticalAlign: 'middle',
      marginRight: theme.spacing(0.5),
    },
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
    tab: 0,
  });

  const mainRef = React.createRef();
  const aboutRef = React.createRef();
  const ref = React.createRef();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChangeSort = (event) => {
    setState({...state, sortBy: event.target.value});

    if (event.target.value === 20) {
      sortByKeyDesc(datasets, 'dateReleased');
    } else {
      sortByKey(datasets, 'id');
    }
  };

  React.useEffect(() => {
    document.title = `${t('DAaaS - Results for')} ${state.searchTerm}`;
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [state.searchTerm, t]);

  return (
    <React.Fragment>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <DefaultHeader />
      <main ref={mainRef} tabIndex="-1">
        <Container maxWidth="xl" className="page-container">
          <Typography variant="h1" className="screen-reader-text">{t('Search results')}</Typography>
          <Grid container>
            <Grid item xs={4} lg={3}>
              <Filters ref={ref} />
            </Grid>
            <Grid item xs={8} lg={9} ref={ref} tabIndex="-1">
              <Grid container>
                <Grid item xs={12} lg={10} className="mb-3">
                  <FilterPills
                    searchTerm="Coal"
                    filters={state.filters}
                  />
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className={classes.sortContainer}
                  >
                    <Grid item xs={3} lg={2}>
                      <FormControl variant="outlined" className={classes.sort}>
                        <InputLabel id="sort-by-label" ref={inputLabel}>
                          {t('Sort by')}
                        </InputLabel>
                        <Select
                          value={state.sortBy}
                          onChange={handleChangeSort}
                          variant="outlined"
                          labelWidth={labelWidth}
                          labelId="sort-by-label"
                          margin="dense"
                          inputProps={{
                            'id': 'sort-by',
                          }}
                        >
                          <MenuItem value={10}>{t('Relevancy')}</MenuItem>
                          <MenuItem value={20}>{t('Release date')}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="textSecondary">
                        {state.numResults} {t('results')} (0.78 {t('seconds')})
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    className={classes.results}
                  >
                    {datasets.map((pumf) => {
                      return <ResultItem key={pumf.id} {...pumf} />;
                    })}
                  </Grid>
                  <Pagination pageCount={Math.ceil(state.numResults / 8)} />
                </Grid>
              </Grid>
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
