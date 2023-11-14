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

// Transform Pitch Class Notation to string
export const parsePitchClass = note => {
    let key = note;
  
    switch (note) {
      case 0:
        key = 'C';
        break;
      case 1:
        key = 'D♭';
        break;
      case 2:
        key = 'D';
        break;
      case 3:
        key = 'E♭';
        break;
      case 4:
        key = 'E';
        break;
      case 5:
        key = 'F';
        break;
      case 6:
        key = 'G♭';
        break;
      case 7:
        key = 'G';
        break;
      case 8:
        key = 'A♭';
        break;
      case 9:
        key = 'A';
        break;
      case 10:
        key = 'B♭';
        break;
      case 11:
        key = 'B';
        break;
      default:
        return null;
    }
  
    return key;
  };