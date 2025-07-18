/**
 * Locale mapping utility for converting language codes to locale identifiers
 */

export interface LocaleMapping {
  [key: string]: string;
}

/**
 * Mapping of language codes to their corresponding locale identifiers
 */
const LOCALE_MAP: LocaleMapping = {
  'en': 'en_US',
  'pl': 'pl_PL',
};

/**
 * Default locale to use when language is not supported
 */
const DEFAULT_LOCALE = 'pl_PL';

/**
 * Maps a language code to its corresponding locale identifier
 * @param lang - The language code (e.g., 'en', 'pl')
 * @returns The corresponding locale identifier (e.g., 'en_US', 'pl_PL')
 */
export function getLocaleFromLang(lang: string): string {
  // Return the mapped locale or fallback to default
  return LOCALE_MAP[lang] || DEFAULT_LOCALE;
}

/**
 * Gets all supported language codes
 * @returns Array of supported language codes
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(LOCALE_MAP);
}

/**
 * Checks if a language code is supported
 * @param lang - The language code to check
 * @returns True if the language is supported, false otherwise
 */
export function isLanguageSupported(lang: string): boolean {
  return lang in LOCALE_MAP;
}