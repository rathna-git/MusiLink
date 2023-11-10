/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(((ms % 60000) / 1000));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


/**
 * Higher order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = fn => {
    return function(...args) {
        return fn(...args).catch((err) => {
            console.log(err);
        });
    }
}

// Get year from YYYY-MM-DD
export const getYear = date => date.split('-')[0];