import dayjs from 'dayjs';

export const oneMinuteTypes = {
  방금전: '방금 전',
} as const;

const getPassedTimeString = (
  dateOrString: Date | string,
  _option?: { oneMinuteType: typeof oneMinuteTypes[keyof typeof oneMinuteTypes] }
) => {
  const date = typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;

  const diff = new Date().getTime() - date.getTime();

  const minute = 1000 * 60;
  if (diff < minute) {
    return oneMinuteTypes.방금전;
  }

  const hour = minute * 60;
  if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  }

  const day = hour * 24;
  if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  }

  const week = day * 7;
  if (diff < week) {
    return `${Math.floor(diff / day)}일 전`;
  }

  const sameYear = dayjs(dateOrString).year() === dayjs().year();
  if (sameYear) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  return dayjs(dateOrString).format('YYYY년 MM월 DD일');
};

export default getPassedTimeString;
