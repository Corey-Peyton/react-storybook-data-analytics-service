import React from 'react';
// import PropTypes from 'prop-types';
import {
  Card as MUICard,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

export function Card(props) {
  const classes = useStyles();
  return (
    <MUICard className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Blah
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </MUICard>
    // <MUIIconButton
    //   className={props.className}
    //   classes={{
    //     root: classes.iconRoot,
    //     edgeStart: classes.edgeStart,
    //     edgeEnd: classes.edgeEnd,
    //     colorPrimary: classes.colorPrimary,
    //     disabled: classes.disabled,
    //     focusVisible: classes.focusVisible,
    //   }}
    //   {...props}
    //   TouchRippleProps={{
    //     classes: {
    //       childPulsate: classes.childPulsate,
    //       ripplePulsate: classes.ripplePulsate,
    //       rippleVisible: classes.rippleVisible,
    //     },
    //   }}
    // ></MUIIconButton>
  );
}

// const COLOR = {
//   DEFAULT: 'default',
//   INHERIT: 'inherit',
//   PRIMARY: 'primary',
//   SECONDARY: 'secondary',
// };

// const SIZE = {
//   SMALL: 'small',
//   MEDIUM: 'medium',
//   LARGE: 'large',
// };

// const EDGE = {
//   NONE: false,
//   START: 'start',
//   END: 'end',
// };

// IconButton.propTypes = {
//   /**
//     The color of the button
//   */
//   color: PropTypes.oneOf(Object.values(COLOR)),
//   /**
//     If true, the button will be disabled.
//   */
//   disabled: PropTypes.bool,
//   /**
//     The size of the button
//   */
//   size: PropTypes.oneOf(Object.values(SIZE)),
//   /**
//     If given, uses a negative margin to counteract the padding on one side
//   */
//   edge: PropTypes.oneOf(Object.values(EDGE)),
// };

// IconButton.defaultProps = {
//   color: COLOR.DEFAULT,
//   disabled: false,
//   size: SIZE.MEDIUM,
//   edge: EDGE.NONE,
// };
