export const formatCreatedAt = (createdAtString) => {
  // Create a new Date object from the createdAtString
  const createdAt = new Date(createdAtString);

  // Get the month name from the Date object
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[createdAt.getMonth()];

  // Get the day and year from the Date object
  const day = createdAt.getDate();
  const year = createdAt.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
