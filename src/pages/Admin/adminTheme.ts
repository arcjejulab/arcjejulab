export type AdminThemeMode = 'light' | 'dark';

export const getSavedAdminTheme = (): AdminThemeMode => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return localStorage.getItem('adminTheme') === 'dark' ? 'dark' : 'light';
};

export const saveAdminTheme = (mode: AdminThemeMode) => {
  localStorage.setItem('adminTheme', mode);
};

export const getAdminTheme = (mode: AdminThemeMode) => {
  const isDark = mode === 'dark';

  return {
    isDark,
    pageBg: isDark ? '#111827' : '#f7f7f7',
    cardBg: isDark ? '#1f2937' : '#ffffff',
    cardBgSoft: isDark ? '#182230' : '#fafafa',
    text: isDark ? '#f9fafb' : '#222222',
    subText: isDark ? '#d1d5db' : '#666666',
    border: isDark ? '#374151' : '#dddddd',
    buttonBg: isDark ? '#f9fafb' : '#333333',
    buttonText: isDark ? '#111827' : '#ffffff',
    outlineButtonBg: isDark ? '#111827' : '#ffffff',
    shadow: isDark ? '0 4px 14px rgba(0,0,0,0.35)' : '0 4px 14px rgba(0,0,0,0.04)'
  };
};
