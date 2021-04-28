import {makeStyles, fade} from '@material-ui/core/styles';
import {deepOrange, deepPurple, green} from '@material-ui/core/colors';
import {theme} from './theme';

export const useStyles = makeStyles({
  '@global': {
    // ************* Overrides **************

    // Disable pulse animation
    '.MuiTouchRipple-childPulsate': {
      animation: 'none',
    },

    // Breadcrumbs
    '.MuiBreadcrumbs-root': {
      marginBottom: theme.spacing(2),
    },

    // Buttons
    '.MuiButton-label, .MuiTab-wrapper, .MuiFab-label': {
      textTransform: 'none',
    },
    '.MuiInputLabel-outlined': {
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.857)',
      },
    },
    '.MuiIconButton-root': {
      padding: theme.spacing(1),
    },
    '.MuiIconButton-edgeStart': {
      marginLeft: theme.spacing(-1),
    },
    '.MuiIconButton-edgeEnd': {
      marginRight: theme.spacing(-1),
    },
    '.MuiButton-text.edge-start': {
      marginLeft: theme.spacing(-1),
    },
    '.MuiButton-text.edge-end': {
      marginRight: theme.spacing(-1),
    },

    // Accordions
    '.MuiAccordion-root': {
      'borderRadius': [0, '!important'],
      '&::before': {
        display: 'none',
      },
      '&.MuiAccordion-root.Mui-expanded': {
        margin: 0,
      },
      'boxShadow': 'none',
      'borderBottom': '1px solid',
      'borderBottomColor': theme.palette.divider,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    '.MuiAccordionSummary-root': {
      padding: 0,
    },
    '.MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded': {
      margin: theme.spacing(3, 0),
    },
    '.MuiAccordionDetails-root': {
      padding: theme.spacing(0, 0, 3, 0),
    },

    // Forms
    '.MuiInputAdornment-root': {
      color: theme.palette.grey[500],
    },
    '.MuiInputBase-input::placeholder': {
      color: theme.palette.grey[600],
      opacity: 1,
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.42)',
    },
    '.MuiFormLabel-root.MuiFormLabel-filled': {
      marginTop: theme.spacing(0),
    },
    '.MuiFormLabel-root.Mui-focused': {
      marginTop: theme.spacing(0),
    },
    '.MuiFormLabel-root': {
      fontSize: '0.875rem',
      marginTop: '1px',
      color: theme.palette.text.primary,
    },
    '.MuiInputBase-input': {
      'fontSize': '0.875rem',
      '&:not(.MuiInputBase-inputMultiline)': {
        height: '1em',
      },
    },
    '.MuiOutlinedInput-inputMarginDense': {
      paddingTop: '13px',
      paddingBottom: '13px',
    },
    '.MuiFormControlLabel-root': {
      marginLeft: theme.spacing(-1),
    },
    '.input-margin': {
      'marginBottom': theme.spacing(3),
      'marginTop': 0,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '.radio-margin': {
      'marginBottom': theme.spacing(2),
      'marginTop': 0,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '.emphasisBox': {
      background: theme.palette.grey[200],
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px',
      borderLeftColor: theme.palette.primary.main,
    },

    // Links
    '.MuiLink-root': {
      border: '2px solid transparent',
    },
    '.MuiLink-root:focus': {
      border: '2px solid #0049b3',
      borderRadius: '2px',
    },

    // Lists
    'li::marker': {
      fontFamily: ['"Roboto"', 'sans-serif'],
    },

    // Datepickers
    '.MuiPickersToolbarText-toolbarTxt': {
      color: theme.palette.common.white,
    },
    '.MuiPickersCalendarHeader-dayLabel': {
      color: theme.palette.grey[600],
    },
    '.MuiPickersCalendarHeader-transitionContainer': {
      height: '1.5em',
    },

    // Tables
    '.MuiTableCell-root': {
      padding: theme.spacing(1),
    },
    '.MuiTableCell-stickyHeader': {
      backgroundColor: 'white',
    },
    '.MuiTableRow-root.Mui-selected, .MuiTableRow-root.Mui-selected:hover': {
      backgroundColor: fade(theme.palette.primary.main),
    },
    // Typography
    '.MuiTypography-gutterBottom': {
      marginBottom: '0.5em',
    },

    // Pagination
    '.MuiPaginationItem-root': {
      margin: '0px',
    },
    '.MuiPaginationItem-page': {
      height: '2.5rem',
      minWidth: '2.5rem',
      borderRadius: '24px',
    },

    // Dialogs
    '.MuiDialog-paperWidthSm': {
      'width': 'calc(100% - 64px)',
      // '& .MuiTextField-root': {
      //   width: '100%',
      // },
      '& .MuiDialogContent-root': {
        padding: 0,
      },
      '& .MuiDialogActions-spacing': {
        'padding': theme.spacing(1.75, 3),
        '&> :not(:first-child)': {
          marginLeft: theme.spacing(2),
        },
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
        'background-color': 'white',
      },
      '& .MuiOutlinedInput-multiline': {
        padding: 0,
      },
      '& .MuiOutlinedInput-inputMultiline': {
        'max-height': 130,
        'overflow': 'auto !important',
        'padding': theme.spacing(2),
      },
      '& .MuiAutocomplete-endAdornment': {
        top: '5.5px',
      },
    },

    // *********** Custom styles **************
    '.avatar-orange': {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    '.avatar-green': {
      color: theme.palette.getContrastText(green[800]),
      backgroundColor: green[800],
    },
    '.avatar-purple': {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    '.btn-edge-end': {
      marginRight: theme.spacing(-1),
    },
    '.btn-edge-start': {
      marginLeft: theme.spacing(-1),
    },
    '.form-control': {
      display: 'block',
      marginBottom: theme.spacing(3),
    },
    '.grey-section': {
      margin: theme.spacing(0, -4),
      padding: theme.spacing(4, 4),
      backgroundColor: theme.palette.grey[100],
    },
    '.heading-underline': {
      width: '100%',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: theme.palette.grey[300],
    },
    '.help-btn': {
      textTransform: 'none',
      zIndex: '2000',
      position: 'fixed',
      top: '93vh',
      left: '84vw',
    },
    '.icon-grey': {
      color: theme.palette.grey[600],
      fill: theme.palette.grey[600],
    },
    '.list-horizontal': {
      'display': 'flex',
      'alignItems': 'center',
      'padding': 0,
      '& li': {
        display: 'inline-block',
      },
    },
    '.page-container': {
      marginTop: theme.spacing(8),
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(16),
      },
    },
    '.paper-heading': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.grey[100],
      margin: theme.spacing(-2, -2, 2, -2),
      padding: theme.spacing(1, 2),
    },
    '.phone-num-lg': {
      fontSize: '1.5rem',
      fontWeight: 300,
    },
    '.resp-iframe-container': {
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '56.25%',
    },
    '.resp-iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0,
    },
    '.screen-reader-text': {
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: '1px',
      margin: 0,
      overflow: 'hidden',
      position: 'absolute',
      width: '1px',
    },
    'section': {
      marginBottom: theme.spacing(6),
    },
    '.section-divider': {
      marginBottom: theme.spacing(6),
    },
    '.tab-badge': {
      'display': 'flex',
      '& .MuiChip-root': {
        marginLeft: theme.spacing(1),
      },
      '& .MuiBadge-root': {
        'marginTop': theme.spacing(1.3),
        'marginLeft': theme.spacing(3),
        '& .MuiBadge-badge': {
          'backgroundColor': '#e0e0e0',
          'color': 'rgba(0,0,0,0.87)',
          'display': 'block',
          'padding': '4px 6px',
          'height': 'auto',
          '&.MuiBadge-colorPrimary': {
            color: '#fff',
            backgroundColor: '#1473e6',
          },
        },
      },
    },
    '.tabs-underline': {
      borderBottomColor: theme.palette.grey[300],
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
    },
    '.toggle-buttons': {
      '& button': {
        'justifyContent': 'flex-start',
        'margin': theme.spacing(0, 4, 2, 0),
        'borderRadius': 0,
        'minWidth': 0,
        'color': theme.palette.grey[600],
        'transition': 'border-left .1s',
        '&:hover': {
          borderBottomWidth: '2px',
          borderBottomStyle: 'solid',
          borderBottomColor: theme.palette.primary.main,
          color: [theme.palette.common.black, '!important'],
        },
      },
    },
    '.toggle-buttons .selected': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.primary.main,
      color: [theme.palette.common.black, '!important'],
    },
    '.vertical-toggle-buttons': {
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'flex-start',
      '& button': {
        'justifyContent': 'flex-start',
        'margin': theme.spacing(2, 0, 2, 0),
        'padding': theme.spacing(0, 0, 0, 2),
        'borderRadius': 0,
        'minWidth': 0,
        'color': theme.palette.grey[600],
        'transition': 'border-left .1s',
        'width': '50%',
        '&:hover': {
          borderLeftWidth: '2px',
          borderLeftStyle: 'solid',
          borderLeftColor: theme.palette.primary.main,
          paddingLeft: '14px',
          color: [theme.palette.common.black, '!important'],
        },
      },
    },
    '.vertical-toggle-buttons .selected': {
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main,
      paddingLeft: '14px',
      color: [theme.palette.common.black, '!important'],
    },
    '.row': {
      'display': 'flex',
      'margin': theme.spacing(1.5, 0),
      'flexFlow': 'row',
      'height': '100%',
      'justifyContent': 'space-between',
      'width': '100%',
      'alignItems': 'center',
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '.column': {
      'display': 'flex',
      'flexDirection': 'column',
      'width': '100%',
      'justifyContent': 'center',
      'marginRight': theme.spacing(1),
      'height': '100%',
      '&:last-child': {
        marginRight: 0,
      },
    },
    '.border-top': {
      borderTop: '1px solid',
      borderTopColor: theme.palette.divider,
    },
    '.border-bottom': {
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    '.mb-6': {
      marginBottom: theme.spacing(6),
    },
    '.mb-5': {
      marginBottom: theme.spacing(5),
    },
    '.mb-4': {
      marginBottom: theme.spacing(4),
    },
    '.mb-3': {
      marginBottom: theme.spacing(3),
    },
    '.mb-2': {
      marginBottom: theme.spacing(2),
    },
    '.mb-1': {
      marginBottom: theme.spacing(1),
    },
    '.mb-0': {
      marginBottom: theme.spacing(0),
    },
    '.mt-6': {
      marginTop: theme.spacing(6),
    },
    '.mt-5': {
      marginTop: theme.spacing(5),
    },
    '.mt-4': {
      marginTop: theme.spacing(4),
    },
    '.mt-3': {
      marginTop: theme.spacing(3),
    },
    '.mt-2': {
      marginTop: theme.spacing(2),
    },
    '.mt-1': {
      marginTop: theme.spacing(1),
    },
    '.mt-0': {
      marginTop: theme.spacing(0),
    },
    '.mr-6': {
      marginRight: theme.spacing(6),
    },
    '.mr-5': {
      marginRight: theme.spacing(5),
    },
    '.mr-4': {
      marginRight: theme.spacing(4),
    },
    '.mr-3': {
      marginRight: theme.spacing(3),
    },
    '.mr-2': {
      marginRight: theme.spacing(2),
    },
    '.mr-1': {
      marginRight: theme.spacing(1),
    },
    '.mr-0': {
      marginRight: theme.spacing(0),
    },
    '.ml-6': {
      marginLeft: theme.spacing(6),
    },
    '.ml-5': {
      marginLeft: theme.spacing(5),
    },
    '.ml-4': {
      marginLeft: theme.spacing(4),
    },
    '.ml-3': {
      marginLeft: theme.spacing(3),
    },
    '.ml-2': {
      marginLeft: theme.spacing(2),
    },
    '.ml-1': {
      marginLeft: theme.spacing(1),
    },
    '.ml-0': {
      marginLeft: theme.spacing(0),
    },
    '.m-6': {
      margin: theme.spacing(6),
    },
    '.m-5': {
      margin: theme.spacing(5),
    },
    '.m-4': {
      margin: theme.spacing(4),
    },
    '.m-3': {
      margin: theme.spacing(3),
    },
    '.m-2': {
      margin: theme.spacing(2),
    },
    '.m-1': {
      margin: theme.spacing(1),
    },
    '.m-0': {
      margin: theme.spacing(0),
    },
    '.p-6': {
      padding: theme.spacing(6),
    },
    '.p-5': {
      padding: theme.spacing(5),
    },
    '.p-4': {
      padding: theme.spacing(4),
    },
    '.p-3': {
      padding: theme.spacing(3),
    },
    '.p-2': {
      padding: theme.spacing(2),
    },
    '.p-1': {
      padding: theme.spacing(1),
    },
    '.p-0': {
      padding: theme.spacing(0),
    },
    '.pt-6': {
      paddingTop: theme.spacing(6),
    },
    '.pt-5': {
      paddingTop: theme.spacing(5),
    },
    '.pt-4': {
      paddingTop: theme.spacing(4),
    },
    '.pt-3': {
      paddingTop: theme.spacing(3),
    },
    '.pt-2': {
      paddingTop: theme.spacing(2),
    },
    '.pt-1': {
      paddingTop: theme.spacing(1),
    },
    '.pt-0': {
      paddingTop: theme.spacing(0),
    },
    '.pb-6': {
      paddingBottom: theme.spacing(6),
    },
    '.pb-5': {
      paddingBottom: theme.spacing(5),
    },
    '.pb-4': {
      paddingBottom: theme.spacing(4),
    },
    '.pb-3': {
      paddingBottom: theme.spacing(3),
    },
    '.pb-2': {
      paddingBottom: theme.spacing(2),
    },
    '.pb-1': {
      paddingBottom: theme.spacing(1),
    },
    '.pb-0': {
      paddingBottom: theme.spacing(0),
    },
    '.pr-6': {
      paddingRight: theme.spacing(6),
    },
    '.pr-5': {
      paddingRight: theme.spacing(5),
    },
    '.pr-4': {
      paddingRight: theme.spacing(4),
    },
    '.pr-3': {
      paddingRight: theme.spacing(3),
    },
    '.pr-2': {
      paddingRight: theme.spacing(2),
    },
    '.pr-1': {
      paddingRight: theme.spacing(1),
    },
    '.pr-0': {
      paddingRight: theme.spacing(0),
    },
    '.pl-6': {
      paddingLeft: theme.spacing(6),
    },
    '.pl-5': {
      paddingLeft: theme.spacing(5),
    },
    '.pl-4': {
      paddingLeft: theme.spacing(4),
    },
    '.pl-3': {
      paddingLeft: theme.spacing(3),
    },
    '.pl-2': {
      paddingLeft: theme.spacing(2),
    },
    '.pl-1': {
      paddingLeft: theme.spacing(1),
    },
    '.pl-0': {
      paddingLeft: theme.spacing(0),
    },
  },
});
