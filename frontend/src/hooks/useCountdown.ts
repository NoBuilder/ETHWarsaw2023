import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns'
import { useEffect, useState } from 'react'
import { differenceInDays, fromUnixTime } from '@/utils'

export const useCountdown = (timestamp: number) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = fromUnixTime(timestamp)
    const intervalId = setInterval(() => {
      const now = new Date()
      const diffInSeconds = differenceInSeconds(targetDate, now)

      if (diffInSeconds <= 0) {
        clearInterval(intervalId)
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      } else {
        const days = differenceInDays(targetDate, now)
        const hours = differenceInHours(targetDate, now) % 24
        const minutes = differenceInMinutes(targetDate, now) % 60
        const seconds = diffInSeconds % 60

        setCountdown({
          days,
          hours,
          minutes,
          seconds
        })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timestamp])

  return countdown
}
