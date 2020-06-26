import React from 'react';
import ReactPaginate from 'react-paginate';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'color': theme.palette.primary.main,
    'listStyleType': 'none',
    'fontFamily': theme.typography.fontFamily,
    'textAlign': 'center',
    'cursor': 'pointer',
    'padding': 0,
    '& li': {
      margin: theme.spacing(0, 1),
      textDecoration: 'underline',
    },
    '& .break': {
      display: 'none',
    },
    '& .selected': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
    '& .previous, & .next': {
      margin: theme.spacing(0, 4),
      textDecoration: 'none',
    },
    '& .disabled': {
      cursor: 'default',
    },
  },
}));

export default function Pagination(props) {
  const classes = useStyles();

  return (
    <ReactPaginate
      {...props}
      pageRangeDisplayed={9}
      marginPagesDisplayed={0}
      containerClassName={classes.pagination}
      previousClassName="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary previous"
      nextClassName="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary next"
      disabledClassName="Mui-disabled disabled"
    />
  );
}
