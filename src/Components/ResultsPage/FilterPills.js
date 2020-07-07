import React from 'react';
import {useTranslation} from 'react-i18next';
import {Chip, Typography, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0, 3, 3),
  },
  chipContainer: {
    display: 'flex',
    padding: theme.spacing(1, 0),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  clearContainer: {
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.divider,
  },
  clear: {
    backgroundColor: 'transparent',
  },
  searchTerm: {
    margin: theme.spacing(0, 0, 3, 1),
  },
}));

export default function FilterPills(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const filters = props.filters;

  const startDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(filters.date.startDate));

  const endDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(filters.date.endDate));

  const handleDelete = (e) => {
    console.log(e);
  };

  return (
    <div className={classes.root}>
      {props.searchTerm && (
        <div className={classes.searchTerm}>
          <Typography variant="h6">
            {t('Search results for')} "{props.searchTerm}"
          </Typography>
        </div>
      )}
      <Divider />
      <div className={classes.chipContainer}>
        {filters.selected && (
          <React.Fragment>
            <div className={classes.clearContainer}>
              <Chip
                className={classes.clear}
                component="button"
                aria-label="Clear all filters"
                onDelete={handleDelete}
                label={t('Clear all')}
                variant="outlined"
              />
            </div>
          </React.Fragment>
        )}
        {filters.subjects && (
          <React.Fragment>
            <div>
              {filters.subjects.map((subject) => {
                return (
                  <Chip
                    className={classes.chip}
                    component="button"
                    color="primary"
                    aria-label={`${t('Remove topic filter')}: ${subject}`}
                    key={subject}
                    label={
                      subject.length <= 25
                        ? subject
                        : `${subject.substring(0, 25)}...`
                    }
                    onDelete={handleDelete}
                    variant="outlined"
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
        {props.sources && (
          <React.Fragment>
            <div>
              {filters.surveys.map((survey, index) => {
                return (
                  <Chip
                    className={classes.chip}
                    component="button"
                    color="primary"
                    aria-label={`${t('Remove survey filter')} ${survey}`}
                    key={survey}
                    label={
                      survey.length <= 25
                        ? survey
                        : `${survey.substring(0, 25)}...`
                    }
                    onDelete={handleDelete}
                    variant="outlined"
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
        {filters.date.startDate && filters.date.endDate && (
          <React.Fragment>
            <div>
              <Chip
                className={classes.chip}
                component="button"
                color="primary"
                aria-label={`${t(
                    'Remove date filter'
                )}: ${startDate} - ${endDate}`}
                label={`${startDate} - ${endDate}`}
                onDelete={handleDelete}
                variant="outlined"
              />
            </div>
          </React.Fragment>
        )}
      </div>
      <Divider />
    </div>
  );
}
