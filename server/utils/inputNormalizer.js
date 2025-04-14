// utils/inputNormalizer.js

/**
 * Normalizes user input by removing excessive whitespace,
 * converting to lowercase, and handling special characters
 * 
 * @param {string} input - The raw user input
 * @returns {string} - The normalized input
 */
export function normalizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim excess whitespace
  let normalized = input.trim();
  
  // Replace multiple spaces with a single space
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Handle special cases
  if (normalized.startsWith('/')) {
    // Don't lowercase commands to keep them intact
    return normalized;
  }
  
  // Remove special characters that aren't needed for meaning
  normalized = normalized.replace(/[^\w\s?!.,;:'"()[\]{}@#$%^&*-+=/<>]/g, '');
  
  return normalized;
}