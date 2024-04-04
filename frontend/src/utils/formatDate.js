export const formatDate = (isoDate) => {
  // Create a new Date object from the ISO string
  const date = new Date(isoDate);
  // Get the year, month, and day from the date object
  const year = date.getFullYear();
  // Add 1 to month because getMonth returns zero-based index
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  // Return the formatted date string in "yyyy-MM-dd" format
  return `${year}-${month}-${day}`;
};

