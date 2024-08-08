export function convertToMSSQLDate(dateString) {
  const date = new Date(dateString);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format to MSSQL date string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
