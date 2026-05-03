export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const toISODate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toISOString().slice(0, 10);
};
