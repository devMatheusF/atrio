import { colors } from './colors';

export const shadows = {
  card: '0 8px 24px rgba(0, 0, 0, 0.05)',
  focus: `0 0 0 3px ${colors.primary[100]}`,
  mui: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.12)',
    '0px 4px 10px rgba(0,0,0,0.10)',
    '0px 8px 24px rgba(0,0,0,0.08)',
    // pode repetir os últimos valores até preencher 25 itens se precisar
  ],
};
