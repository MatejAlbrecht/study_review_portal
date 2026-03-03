'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { createStudySession } from '@/actions/sessions'

const POMODORO_MINUTES = 25
const BREAK_MINUTES = 5

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(POMODORO_MINUTES)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
            if (!isBreak) {
              createStudySession(POMODORO_MINUTES, 'Pomodoro session completed')
              alert('Pomodoro complete! Time for a break.')
              setIsBreak(true)
              setMinutes(BREAK_MINUTES)
            } else {
              alert('Break complete! Ready for another session?')
              setIsBreak(false)
              setMinutes(POMODORO_MINUTES)
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, minutes, seconds, isBreak])

  const toggle = () => setIsActive(!isActive)

  const reset = () => {
    setIsActive(false)
    setIsBreak(false)
    setMinutes(POMODORO_MINUTES)
    setSeconds(0)
  }

  const formatTime = (mins: number, secs: number) => {
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0')
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>
      
      <div className="text-center">
        <div className="text-6xl font-bold mb-2 font-mono">
          {formatTime(minutes, seconds)}
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={toggle}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {isActive ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start
              </>
            )}
          </button>

          <button
            onClick={reset}
            className="px-6 py-3 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>25 minutes focus · 5 minutes break</p>
        </div>
      </div>
    </div>
  )
}
