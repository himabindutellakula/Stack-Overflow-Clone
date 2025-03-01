/**
 * the function is used to format a given date.
 * For a question posted on Day X, 
 * the post date should appear in seconds (if posted 0 mins. ago), 
 * minutes (if posted 0 hours ago), 
 * or hours (if posted less than 24 hours ago). 
 * The displayed string should read "<Month><day> at <hh:min>"
 * after 24 hours of posting. 
 * Date should be displayed as "<Month><day>, <year> at <hh:min>"
 * if viewed after a year of posting.
 * @param date 
 * @returns {string} - formatted string which indicates the date and time of the post
 */
const getMetaData = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return formatSeconds(diffInSeconds);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return formatMinutes(diffInMinutes);

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return formatHours(diffInHours);

  return formatDate(date, now);
};

/** 
* Formats time in seconds 
*/
const formatSeconds = (seconds: number): string => `${seconds} seconds ago`;

/** 
* Formats time in minutes 
*/
const formatMinutes = (minutes: number): string => `${minutes} minutes ago`;

/** 
* Formats time in hours 
*/
const formatHours = (hours: number): string => `${hours} hours ago`;

/**
* Formats a date into "<Month> <day> at <hh:min>" or "<Month> <day>, <year> at <hh:min>".
*/
const formatDate = (date: Date, now: Date): string => {
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate().toString().padStart(2, "0"); 
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return now.getFullYear() === year
    ? `${month} ${day} at ${hours}:${minutes}`
    : `${month} ${day}, ${year} at ${hours}:${minutes}`;
};

export { getMetaData };