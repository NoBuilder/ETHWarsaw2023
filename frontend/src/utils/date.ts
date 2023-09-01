import {
  getUnixTime,
  getSeconds,
  getMinutes,
  getHours,
  differenceInDays,
  fromUnixTime
} from 'date-fns'

export const getCurrentYear = () => new Date().getFullYear()

export const getNowUnix = () => getUnixTime(new Date())

export { getSeconds, getMinutes, getHours, differenceInDays, fromUnixTime }
