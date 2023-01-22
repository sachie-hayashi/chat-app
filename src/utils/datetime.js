/**
 * Convert Firestore timestamp object ro timestamp in milliseconds
 * @param {object} timestampObj timestamp object from Firestore
 * @returns timestamp in milliseconds
 */
export const convertTimestamp = timestampObj => timestampObj.seconds * 1000;

/**
 * Format date & time
 * @param {object} timestampObj timestamp object from Firestore
 * @returns formatted date & time
 */
export const formatTime = timestampObj => {
  const timestamp = convertTimestamp(timestampObj); // milliseconds
  const time = new Date(timestamp);

  const options = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return new Intl.DateTimeFormat('en-US', options).format(time);
};
