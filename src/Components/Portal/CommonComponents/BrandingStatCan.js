import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Link} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  brandLink: {
    display: 'block',
  },
  brandImage: {
    height: '100%',
    width: '100%',
  },
}));
export function BrandingStatCanEn() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Link
        href="https://www.statcan.gc.ca/eng/start"
        className={classes.brandLink}
      >
        <img
          src={process.env.PUBLIC_URL + '/images/sig-stats-can-blk-en.svg'}
          alt="Statistics Canada"
          className={classes.brandImage}
        />
      </Link>
    </React.Fragment>
  );
}

export function BrandingStatCanFr() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Link
        href="https://www.statcan.gc.ca/fra/debut"
        className={classes.brandLink}
      >
        <img
          src={process.env.PUBLIC_URL + '/images/sig-blk-fr.svg'}
          alt="Statistique Canada"
          className={classes.brandImage}
        />
      </Link>
    </React.Fragment>
  );
}
