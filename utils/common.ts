import moment from 'moment';

export const formatDate = (value: any) => {
  return moment(value).format('MM-DD-YYYY');
};

export const formatDateVN = (value: any) => {
  return moment(value).format('DD-MM-YYYY');
};

export const toUTCTime = (time: string | number | Date) => {
  let newTime = new Date(time);
  // let newTimeUTC = new Date(
  //   Date.UTC(newTime.getFullYear(), newTime.getMonth(), newTime.getDay())
  // );
  // newTime.setHours(newTime.getHours() + 7);
  let newTimeUTC = new Date(newTime.getTime());
  return newTimeUTC.toLocaleString(['en-GB'], {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
