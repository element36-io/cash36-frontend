import moment from 'moment';

export const formatDate = (date, dateFormat) =>
  moment(date, 'DD-MM-YYYY').format(dateFormat);
