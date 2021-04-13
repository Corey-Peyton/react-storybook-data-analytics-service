import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {SM_SCREEN} from '../../../Theme/constants';
const defaultStyles = makeStyles((theme) => ({
  brandImage: {
    height: '100%',
    width: '100%',
  },
}));
export default function BrandingStatsCan() {
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
