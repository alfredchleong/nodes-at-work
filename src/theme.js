import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#13131f',
      paper: '#1a1a28',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#22222f',
          border: '1px solid #2e2e3e',
          color: '#e2e8f0',
          fontSize: '0.75rem',
          borderRadius: '6px',
        },
        arrow: {
          color: '#22222f',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'all 0.15s ease',
        },
      },
    },
  },
});

export default muiTheme;
