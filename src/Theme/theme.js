import {createMuiTheme} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';

const props = {
  MuiButton: {
    disableFocusRipple: true,
  },
  MuiIconButton: {
    disableFocusRipple: true,
  },
  MuiFormControl: {
    fullWidth: true,
  },
  MuiTextField: {
    margin: 'dense',
    variant: 'outlined',
    rows: 3,
    rowsMax: 100,
  },
};

const shadows = [
  'none',
  '0px 2px 1px -1px rgba(117,117,117,0.2),0px 1px 1px 0px rgba(117,117,117,0.14),0px 1px 3px 0px rgba(117,117,117,0.12)',
  '0px 3px 1px -2px rgba(117,117,117,0.2),0px 2px 2px 0px rgba(117,117,117,0.14),0px 1px 5px 0px rgba(117,117,117,0.12)',
  '0px 3px 3px -2px rgba(117,117,117,0.2),0px 3px 4px 0px rgba(117,117,117,0.14),0px 1px 8px 0px rgba(117,117,117,0.12)',
  '0px 2px 4px -1px rgba(117,117,117,0.2),0px 4px 5px 0px rgba(117,117,117,0.14),0px 1px 10px 0px rgba(117,117,117,0.12)',
  '0px 3px 5px -1px rgba(117,117,117,0.2),0px 5px 8px 0px rgba(117,117,117,0.14),0px 1px 14px 0px rgba(117,117,117,0.12)',
  '0px 3px 5px -1px rgba(117,117,117,0.2),0px 6px 10px 0px rgba(117,117,117,0.14),0px 1px 18px 0px rgba(117,117,117,0.12)',
  '0px 4px 5px -2px rgba(117,117,117,0.2),0px 7px 10px 1px rgba(117,117,117,0.14),0px 2px 16px 1px rgba(117,117,117,0.12)',
  '0px 5px 5px -3px rgba(117,117,117,0.2),0px 8px 10px 1px rgba(117,117,117,0.14),0px 3px 14px 2px rgba(117,117,117,0.12)',
  '0px 5px 6px -3px rgba(117,117,117,0.2),0px 9px 12px 1px rgba(117,117,117,0.14),0px 3px 16px 2px rgba(117,117,117,0.12)',
  '0px 6px 6px -3px rgba(117,117,117,0.2),0px 10px 14px 1px rgba(117,117,117,0.14),0px 4px 18px 3px rgba(117,117,117,0.12)',
  '0px 6px 7px -4px rgba(117,117,117,0.2),0px 11px 15px 1px rgba(117,117,117,0.14),0px 4px 20px 3px rgba(117,117,117,0.12)',
  '0px 7px 8px -4px rgba(117,117,117,0.2),0px 12px 17px 2px rgba(117,117,117,0.14),0px 5px 22px 4px rgba(117,117,117,0.12)',
  '0px 7px 8px -4px rgba(117,117,117,0.2),0px 13px 19px 2px rgba(117,117,117,0.14),0px 5px 24px 4px rgba(117,117,117,0.12)',
  '0px 7px 9px -4px rgba(117,117,117,0.2),0px 14px 21px 2px rgba(117,117,117,0.14),0px 5px 26px 4px rgba(117,117,117,0.12)',
  '0px 8px 9px -5px rgba(117,117,117,0.2),0px 15px 22px 2px rgba(117,117,117,0.14),0px 6px 28px 5px rgba(117,117,117,0.12)',
  '0px 8px 10px -5px rgba(117,117,117,0.2),0px 16px 24px 2px rgba(117,117,117,0.14),0px 6px 30px 5px rgba(117,117,117,0.12)',
  '0px 8px 11px -5px rgba(117,117,117,0.2),0px 17px 26px 2px rgba(117,117,117,0.14),0px 6px 32px 5px rgba(117,117,117,0.12)',
  '0px 9px 11px -5px rgba(117,117,117,0.2),0px 18px 28px 2px rgba(117,117,117,0.14),0px 7px 34px 6px rgba(117,117,117,0.12)',
  '0px 9px 12px -6px rgba(117,117,117,0.2),0px 19px 29px 2px rgba(117,117,117,0.14),0px 7px 36px 6px rgba(117,117,117,0.12)',
  '0px 10px 13px -6px rgba(117,117,117,0.2),0px 20px 31px 3px rgba(117,117,117,0.14),0px 8px 38px 7px rgba(117,117,117,0.12)',
  '0px 10px 13px -6px rgba(117,117,117,0.2),0px 21px 33px 3px rgba(117,117,117,0.14),0px 8px 40px 7px rgba(117,117,117,0.12)',
  '0px 10px 14px -6px rgba(117,117,117,0.2),0px 22px 35px 3px rgba(117,117,117,0.14),0px 8px 42px 7px rgba(117,117,117,0.12)',
  '0px 11px 14px -7px rgba(117,117,117,0.2),0px 23px 36px 3px rgba(117,117,117,0.14),0px 9px 44px 8px rgba(117,117,117,0.12)',
  '0px 11px 15px -7px rgba(117,117,117,0.2),0px 24px 38px 3px rgba(117,117,117,0.14),0px 9px 46px 8px rgba(117,117,117,0.12)',
];

const typography = {
  fontFamily: ['"Roboto"', 'sans-serif'],
  h1: {
    letterSpacing: '-0.01562em',
  },
  h2: {
    letterSpacing: '-0.00833em',
  },
  h3: {
    letterSpacing: '0em',
  },
  h4: {
    letterSpacing: '0.00735em',
  },
  h5: {
    letterSpacing: '0em',
  },
  h6: {
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    letterSpacing: '0.01071em',
  },
  subtitle2: {
    letterSpacing: '0.00714em',
  },
  body1: {
    letterSpacing: '0.00938em',
  },
  body2: {
    letterSpacing: '0.01071em',
  },
  button: {
    letterSpacing: '0.02857em',
  },
  caption: {
    letterSpacing: '0.03333em',
  },
  overline: {
    letterSpacing: '0.08333em',
  },
};

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1A73E8',
      light: '#d4e5ff',
      dark: '#1765CC',
    },
    secondary: {
      main: '#34dbc5',
      light: '#77fff8',
      dark: '#00a995',
    },
    error: {
      main: '#E91B0C',
    },
    buttons: {
      default: '#5F6368',
      defaultHover: '#54575C',
    },
  },
  props: props,
  shadows: shadows,
  typography: typography,
});

theme.overrides = {
  // BUTTONS
  MuiButton: {
    label: {
      textTransform: 'none',
    },
    endIcon: {
      marginRight: theme.spacing(-1),
    },
    startIcon: {
      marginLeft: theme.spacing(-1),
    },
    // contained
    contained: {
      'boxShadow': theme.shadows[0],
      // contained disabled
      '&$disabled': {
        color: fade(theme.palette.common.black, 0.4),
        backgroundColor: fade(theme.palette.common.black, 0.08),
      },
    },
    // contained primary
    containedPrimary: {
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[0],
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[0],
      },
    },
    // outlined
    outlined: {
      // outlined disabled
      '&$disabled': {
        color: fade(theme.palette.common.black, 0.4),
        borderColor: fade(theme.palette.common.black, 0.12),
      },
    },
    // outlined primary
    outlinedPrimary: {
      'borderColor': fade(theme.palette.primary.main, 0.4),
      '&:hover': {
        color: theme.palette.primary.dark,
        borderColor: fade(theme.palette.primary.main, 0.4),
        backgroundColor: fade(theme.palette.primary.main, 0.12),
      },
      '&$focusVisible': {
        color: theme.palette.primary.dark,
        backgroundColor: fade(theme.palette.primary.main, 0.12),
      },
    },
    // text
    text: {
      'color': theme.palette.buttons.default,
      '& $startIcon': {
        color: theme.palette.buttons.default,
        marginLeft: theme.spacing(0),
      },
      '& $endIcon': {
        color: theme.palette.buttons.default,
        marginRight: theme.spacing(0),
      },
      '&:hover': {
        'backgroundColor': fade(theme.palette.buttons.default, 0.12),
        'color': theme.palette.buttons.defaultHover,
        '& $startIcon': {
          color: theme.palette.buttons.defaultHover,
        },
        '& $endIcon': {
          color: theme.palette.buttons.defaultHover,
        },
      },
      '&$focusVisible': {
        'backgroundColor': fade(theme.palette.buttons.default, 0.12),
        'color': theme.palette.buttons.defaultHover,
        '& $startIcon': {
          color: theme.palette.buttons.defaultHover,
        },
        '& $endIcon': {
          color: theme.palette.buttons.defaultHover,
        },
      },
      // text disabled
      '&$disabled': {
        'color': fade(theme.palette.common.black, 0.4),
        '& $startIcon': {
          color: [fade(theme.palette.common.black, 0.4), '!important'],
        },
        '& $endIcon': {
          color: [fade(theme.palette.common.black, 0.4), '!important'],
        },
      },
    },
    // text primary
    textPrimary: {
      '& $startIcon': {
        color: theme.palette.primary.main,
      },
      '& $endIcon': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        'color': theme.palette.primary.dark,
        'backgroundColor': fade(theme.palette.primary.main, 0.12),
        '& $startIcon': {
          color: theme.palette.primary.dark,
        },
        '& $endIcon': {
          color: theme.palette.primary.dark,
        },
      },
      '&$focusVisible': {
        'color': theme.palette.primary.dark,
        'backgroundColor': fade(theme.palette.primary.main, 0.12),
        '& $startIcon': {
          color: theme.palette.primary.dark,
        },
        '& $endIcon': {
          color: theme.palette.primary.dark,
        },
      },
    },
    disabled: {},
    focusVisible: {},
  },
  // ICON BUTTONS
  MuiIconButton: {
    edgeStart: {
      marginLeft: theme.spacing(-1),
    },
    edgeEnd: {
      marginRight: theme.spacing(-1),
    },
    root: {
      'color': theme.palette.buttons.default,
      'padding': [theme.spacing(1), '!important'],
      '&:hover': {
        backgroundColor: fade(theme.palette.buttons.default, 0.12),
        color: theme.palette.buttons.defaultHover,
      },
      '&$focusVisible': {
        backgroundColor: fade(theme.palette.buttons.default, 0.12),
        color: theme.palette.buttons.defaultHover,
      },
      // disabled icon
      '&$disabled': {
        color: fade(theme.palette.common.black, 0.4),
      },
    },
    // primary icon
    colorPrimary: {
      '&:hover': {
        color: theme.palette.primary.dark,
        backgroundColor: fade(theme.palette.primary.main, 0.12),
      },
      '&$focusVisible': {
        color: theme.palette.primary.dark,
        backgroundColor: fade(theme.palette.primary.main, 0.12),
      },
    },
    disabled: {},
    focusVisible: {},
  },
  MuiTouchRipple: {
    'rippleVisible': {
      opacity: 0.2,
      animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
    },
    '@keyframes enter': {
      '0%': {
        transform: 'scale(0)',
        opacity: 0.1,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0.2,
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      fontSize: '0.75rem',
      backgroundColor: '#616161E6',
    },
  },
};

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    type: 'dark',
    background: {
      paper: '#173048',
    },
    text: {
      primary: theme.palette.common.white,
      secondary: fade(theme.palette.common.white, 0.7),
    },
    divider: fade(theme.palette.common.white, 0.12),
  },
  overrides: {
    ...theme.overrides,
    MuiButton: {
      ...theme.overrides.MuiButton,
      contained: {
        ...theme.overrides.MuiButton.contained,
        // contained disabled
        '&$disabled': {
          color: fade(theme.palette.common.white, 0.4),
          backgroundColor: fade(theme.palette.common.white, 0.08),
        },
      },
      // outlined
      outlined: {
        ...theme.overrides.MuiButton.outlined,
        'color': theme.palette.common.white,
        'borderColor': fade(theme.palette.common.white, 0.4),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.12),
        },
        '&$focusVisible': {
          backgroundColor: fade(theme.palette.common.white, 0.12),
        },
        // outlined disabled
        '&$disabled': {
          color: fade(theme.palette.common.white, 0.4),
          borderColor: fade(theme.palette.common.white, 0.12),
        },
      },
      // text
      text: {
        ...theme.overrides.MuiButton.text,
        'color': theme.palette.common.white,
        '& $startIcon': {
          color: theme.palette.common.white,
          marginLeft: theme.spacing(0),
        },
        '& $endIcon': {
          color: theme.palette.common.white,
          marginRight: theme.spacing(0),
        },
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.12),
        },
        '&$focusVisible': {
          backgroundColor: fade(theme.palette.common.white, 0.12),
        },
        // text disabled
        '&$disabled': {
          'color': fade(theme.palette.common.white, 0.4),
          '& $startIcon': {
            color: [fade(theme.palette.common.white, 0.4), '!important'],
          },
          '& $endIcon': {
            color: [fade(theme.palette.common.white, 0.4), '!important'],
          },
        },
      },
      startIcon: {},
      endIcon: {},
      disabled: {},
      focusVisible: {},
    },
  },
});
