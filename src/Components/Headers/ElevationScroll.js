import React from 'react';
import PropTypes from 'prop-types';
import {useScrollTrigger} from '@material-ui/core';

export default function ElevationScroll(props) {
  const {children, window} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};
