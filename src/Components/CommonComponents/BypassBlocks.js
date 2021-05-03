import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/styles';
import {Button} from '@material-ui/core';
import {withRouterAndRef} from '../Utilities/HOCs';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyleType: 'none',
  },
  block: {
    left: 0,
    position: 'absolute',
    textAlign: 'center',
    top: '10px',
    width: '100%',
    zIndex: 1300,
  },
}));

const BypassBlocks = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const pathname = props.history.location.pathname;
  const [state, setState] = React.useState({
    mainFocused: null,
    aboutFocused: null,
  });

  const handleMainFocus = () => {
    setState({...state, mainFocused: true});
  };

  const handleMainBlur = () => {
    setState({...state, mainFocused: false});
  };

  const handleAboutFocus = () => {
    setState({...state, aboutFocused: true});
  };

  const handleAboutBlur = () => {
    setState({...state, aboutFocused: false});
  };

  const handleMainClick = () => {
    ref.main.current.focus();
  };

  const handleAboutClick = () => {
    ref.about.current.focus();
  };

  if (pathname === '/') {
    return null;
  } else {
    return (
      <div>
        <ul className={classes.root}>
          <li className={classes.block}>
            <Button
              className={state.mainFocused ? '' : 'screen-reader-text'}
              color="primary"
              variant="contained"
              onFocus={handleMainFocus}
              onBlur={handleMainBlur}
              onClick={handleMainClick}
            >
              {t('Skip to main content')}
            </Button>
          </li>
          <li className={classes.block}>
            <Button
              className={state.aboutFocused ? '' : 'screen-reader-text'}
              color="primary"
              variant="contained"
              onFocus={handleAboutFocus}
              onBlur={handleAboutBlur}
              onClick={handleAboutClick}
            >
              {t('Skip to footer')}
            </Button>
          </li>
        </ul>
      </div>
    );
  }
});

export default withRouterAndRef(BypassBlocks);
