import { createTheme } from '@mui/material/styles';
import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { typography } from './tokens/typography';
import { shadows } from './tokens/shadows';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: colors.text.onPrimary,
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: colors.text.onSecondary,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.surface,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    success: { main: colors.feedback.success },
    error: { main: colors.feedback.error },
    warning: { main: colors.feedback.warning },
    info: { main: colors.feedback.info },
  },
  spacing: spacing.unit,
  shape: {
    borderRadius: radius.md,
  },
  typography: {
    fontFamily: typography.fontFamily.base,
  },
  shadows: shadows.mui as any,
});
