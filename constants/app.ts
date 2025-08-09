// Файловые ограничения
export const FILE_CONSTRAINTS = {
  TOOL_MAX_SIZE: 50 * 1024 * 1024, // 50MB в байтах
  ALLOWED_TOOL_TYPES: ['application/zip', 'application/x-zip-compressed'],
  ALLOWED_TOOL_EXTENSIONS: ['.zip'],
} as const;

// UI константы
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  CARD_MIN_WIDTH: 280,
  CARD_MAX_WIDTH: 320,
  GRID_GAP: 16,
  ANIMATION_DURATION: 200,
} as const;

// Пагинация
export const PAGINATION = {
  TOOLS_PER_PAGE: 12,
  WORKSPACES_PER_PAGE: 10,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

// Версионирование
export const VERSIONS = {
  TOOLS_STORE: 2,
  WORKSPACES_STORE: 1,
  SETTINGS_STORE: 2,
} as const;

// API конфигурация
export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 30000, // 30 секунд
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 секунда
} as const;

// Ключи для localStorage/sessionStorage
export const STORAGE_KEYS = {
  TOOLS: 'tools',
  WORKSPACES: 'workspaces',
  SETTINGS: 'app-settings',
  THEME: 'theme',
  LOCALE: 'locale',
  LAST_VISITED_WORKSPACE: 'last-visited-workspace',
} as const;

// Валидация
export const VALIDATION = {
  WORKSPACE_NAME_MIN_LENGTH: 1,
  WORKSPACE_NAME_MAX_LENGTH: 50,
  WORKSPACE_DESCRIPTION_MAX_LENGTH: 200,
  TOOL_NAME_MIN_LENGTH: 1,
  TOOL_NAME_MAX_LENGTH: 100,
  SEARCH_QUERY_MIN_LENGTH: 1,
  SEARCH_QUERY_MAX_LENGTH: 100,
} as const;
