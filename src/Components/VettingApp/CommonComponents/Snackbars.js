import React from 'react';
import {useTranslation} from 'react-i18next';

import {Snackbar} from '../../CommonComponents/Snackbar';

export function SnackbarCreateRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request created')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarSaveRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request saved')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarSubmitRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request submitted')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarSubmitRequestError(props) {
  const {t} = useTranslation();

  const errorString = () => {
    if (props.errors === 1) {
      return '1 error';
    } else if (props.errors > 99) {
      return '99+ errors';
    } else {
      return `${props.errors} errors`;
    }
  };

  return (
    <Snackbar
      message={t(`Request not submitted (${errorString()})`)}
      severity="error"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarWithdrawRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request withdrawn')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarChangeRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Change request sent')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarApproveRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request approved')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarDenyRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request denied')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarReactivateRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request reactivated')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarDeleteRequest(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request deleted')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAssignLead(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Assigned as lead')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAssignSupport(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Assigned as support')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarUnassign(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Unassigned')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAssigneeChange(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Assignee changes applied')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAddOutputFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Output file added')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarUpdateOutputFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Output file updated')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarDeleteOutputFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Output file deleted')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAddSupportFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Support file added')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarUpdateSupportFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Support file updated')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarDeleteSupportFile(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Support file deleted')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarSupportFab(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Support request sent')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarStartReview(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Request review started')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarAddVirtualMachine(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Virtual machine details added')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarEditVirtualMachine(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Virtual machine details updated')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}

export function SnackbarDeleteVirtualMachine(props) {
  const {t} = useTranslation();

  return (
    <Snackbar
      message={t('Virtual machine details deleted')}
      severity="success"
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}
