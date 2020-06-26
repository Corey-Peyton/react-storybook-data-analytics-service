import React from 'react';
import {Button} from '@material-ui/core';

export default function Language() {
  return (
    <React.Fragment>
      <h2 className="screen-reader-text">Language selection</h2>
      <Button>
        <span lang="fr">Français</span>
      </Button>
    </React.Fragment>
  );
}
