/**
 * Converts a category string to a format with all lowercase letters and spaces replaced by underscores.
 * Example: 'ceramic art' becomes 'ceramic_art'.
 *
 * @param {string} str - The category string to format.
 * @returns {string} - The formatted category string with underscores instead of spaces.
 */
export const formatCategory = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '_');
};

/**
 * Reverses the formatting of a category string by replacing underscores with spaces and converting all letters to lowercase.
 * Example: 'ceramic_art' becomes 'ceramic art'.
 *
 * @param {string} category - The formatted category string to reverse.
 * @returns {string} - The original category string with spaces and lowercase letters.
 */
export const reverseFormatCategory = (category: string): string => {
  return category.replace(/_/g, ' ').toLowerCase();
};
