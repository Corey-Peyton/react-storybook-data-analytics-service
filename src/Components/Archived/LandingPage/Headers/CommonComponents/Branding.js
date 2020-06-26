import React from 'react';
import {makeStyles} from '@material-ui/styles';

export default function Branding() {
  const defaultStyles = makeStyles((theme) => ({
    brandImage: {
      margin: theme.spacing(1.5),
    },
    brandLink: {
      '&:focus img': {
        border: '2px solid #0049b3',
        borderRadius: '2px',
      },
    },
  }));

  const classes = defaultStyles();

  return (
    <React.Fragment>
      <a href="https://www.canada.ca/en.html" className={classes.brandLink}>
        <img
          src={process.env.PUBLIC_URL + '/images/sig-blk-en.svg'}
          alt=""
          className={classes.brandImage}
        />
        <span className="screen-reader-text">
          Government of Canada / <span lang="fr">Gouvernement du Canada</span>
        </span>
      </a>
    </React.Fragment>
  );
}
