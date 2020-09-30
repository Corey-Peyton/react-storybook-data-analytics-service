import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

function Header(props) {
  const classes = useStyles();

  return <h1>Header</h1>;
}
export default Header;
