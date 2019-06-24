import { format } from 'date-fns';

export const formatDate = (date, dateFormat) => {
  const d = date.split('.').reverse();
  d[1] = d[1] - 1;
  return format(new Date(...d), dateFormat);
};
