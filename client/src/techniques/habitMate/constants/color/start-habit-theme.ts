// src/utils/theme-config.ts

export const levelThemes: Record<
  number,
  { primary: string; secondary: string }
> = {
  1: { primary: '#4CAF50', secondary: '#81C784' }, // Green for Lv.1
  2: { primary: '#2196F3', secondary: '#64B5F6' }, // Blue for Lv.2
  3: { primary: '#FFC107', secondary: '#FFD54F' }, // Amber for Lv.3
  4: { primary: '#9C27B0', secondary: '#BA68C8' }, // Purple for Lv.4
  5: { primary: '#FF5722', secondary: '#FF8A65' }, // Deep Orange for Lv.5
}

// Fallback color in case a level is not defined in the record
export const defaultLevelTheme = {
  primary: '#607D8B',
  secondary: '#B0BEC5',
}
