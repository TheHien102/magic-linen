import moment from 'moment';

export const formatDate = (value: any) => {
  return moment(value).format('MM-DD-YYYY');
};

export const toUTCTime = (time: string | number | Date) => {
  let newTime = new Date(time);
  newTime.setHours(newTime.getHours() + 7);
  return newTime.toLocaleString(['en-GB'], {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
