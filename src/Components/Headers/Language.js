import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';

export default function Language() {
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <h2 className="screen-reader-text">{t('Language selection')}</h2>
      <Button>
        <span lang="fr">Français</span>
      </Button>
    </React.Fragment>
  );
}
