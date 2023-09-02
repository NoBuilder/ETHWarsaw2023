import {
  getUnixTime,
  getSeconds,
  getMinutes,
  getHours,
  differenceInDays,
  fromUnixTime,
  format
} from 'date-fns'

export const getCurrentYear = () => new Date().getFullYear()

export const getNowUnix = () => getUnixTime(new Date())

export { getSeconds, getMinutes, getHours, differenceInDays, fromUnixTime }

export const unixToDate = (unix: number) =>
  format(fromUnixTime(unix), 'dd.MM.yyyy')
