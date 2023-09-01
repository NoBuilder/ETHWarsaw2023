'use client'

import { useCountdown } from '@/hooks'

type CountdownProps = {
  timestamp: number
}

export const Countdown: React.FC<CountdownProps> = ({ timestamp }) => {
  const { minutes, seconds, hours, days } = useCountdown(timestamp)

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-4xl font-bold text-gray-800">{days}</h3>
        <p className="text-sm font-semibold text-gray-500">Days</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-4xl font-bold text-gray-800">{hours}</h3>
        <p className="text-sm font-semibold text-gray-500">Hours</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-4xl font-bold text-gray-800">{minutes}</h3>
        <p className="text-sm font-semibold text-gray-500">Minutes</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-4xl font-bold text-gray-800">{seconds}</h3>
        <p className="text-sm font-semibold text-gray-500">Seconds</p>
      </div>
    </div>
  )
}
