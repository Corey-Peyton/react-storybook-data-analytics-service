import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardAction: {
    'height': 'inherit',
    '&:hover .MuiCardActionArea-focusHighlight': {
      opacity: 0.1,
    },
  },
  cardContent: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    boxSizing: 'border-box',
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: 0,
    transform: 'translateY(-100%)',
  },
  cardMedia: {
    display: 'block',
    position: 'relative',
    height: '100%',
  },
}));

export default function CustomExpansionPanel(props) {
  const classes = useStyles();

  return (
    <Card className={props.className}>
      <CardActionArea
        className={classes.cardAction}
        href={props.href}
      >
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt=""
          image={props.img}
        />
        <CardContent className={classes.cardContent}>
          {props.content}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
