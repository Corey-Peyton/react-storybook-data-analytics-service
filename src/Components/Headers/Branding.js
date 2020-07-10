import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {SM_SCREEN} from '../../Theme/constants';

const defaultStyles = makeStyles((theme) => ({
  brandLink: {
    '&:focus img': {
      border: '2px solid #0049b3',
      borderRadius: '2px',
    },
  },
}));

export default function Branding() {
  const classes = defaultStyles();

  const [state, setState] = React.useState({
    windowWidth: window.innerWidth,
  });

  const isSmScreen = state.windowWidth < SM_SCREEN;

  React.useEffect(() => {
    // Detect screen size
    const handleResize = () =>
      setState({...state, windowWidth: window.innerWidth});
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [state]);

  return (
    <React.Fragment>
      {isSmScreen ? (
        <a href="https://www.canada.ca/en.html" className={classes.brandLink}>
          <img
            src={process.env.PUBLIC_URL + '/images/flag.svg'}
            alt=""
            className={classes.brandImage}
          />
          <span className="screen-reader-text">
            Government of Canada / <span lang="fr">Gouvernement du Canada</span>
          </span>
        </a>
      ) : (
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
      )}
    </React.Fragment>
  );
}
