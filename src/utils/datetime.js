import dayjs from 'dayjs';

/**
 * Format date
 * @param {number} timestamp timestamp (seconds)
 * @returns formatted date (time)
 */
export const formatDate = timestamp => {
  const date = dayjs.unix(timestamp);
  const aWeekAgo = dayjs().subtract(1, 'week');
  const aDayAgo = dayjs().subtract(1, 'day');

  // If the date is before a week ago
  if (date.isBefore(aWeekAgo)) return date.format('MMM D, YYYY');

  // If the date is before a day ago
  if (date.isBefore(aDayAgo)) return date.format('ddd, MMM D');

  return date.format('h:mm a');
};
