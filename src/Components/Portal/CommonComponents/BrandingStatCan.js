import React from 'react';
import {makeStyles} from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  brandImage: {
    height: '100%',
    width: '100%',
  },
}));
export default function BrandingStatsCan() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <a
        href="https://www.statcan.gc.ca/eng/start"
        className={classes.brandLink}
      >
        <img
          src={process.env.PUBLIC_URL + '/images/sig-stats-can-blk-en.svg'}
          alt=""
          className={classes.brandImage}
        />
        <span className="screen-reader-text">
          Statistics Canada / <span lang="fr">Statistique Canada</span>
        </span>
      </a>
    </React.Fragment>
  );
}
