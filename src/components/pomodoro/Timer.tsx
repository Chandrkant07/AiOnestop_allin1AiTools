import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import { usePomodoroContext } from '../../contexts/PomodoroContext';

interface TimerProps {
  onOpenSettings: () => void;
}

const Timer: React.FC<TimerProps> = ({ onOpenSettings }) => {
  const { timer, startTimer, pauseTimer, resetTimer, skipTimer } = usePomodoroContext();
  
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine color based on mode
  const getModeColor = () => {
    switch (timer.mode) {
      case 'work':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'shortBreak':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'longBreak':
        return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  // Display proper mode title
  const getModeTitle = () => {
    switch (timer.mode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  // Calculate progress percentage for the timer ring
  const progressPercentage = (): number => {
    const getFullTime = () => {
      switch (timer.mode) {
        case 'work':
          return usePomodoroContext().settings.workTime * 60;
        case 'shortBreak':
          return usePomodoroContext().settings.shortBreakTime * 60;
        case 'longBreak':
          return usePomodoroContext().settings.longBreakTime * 60;
      }
    };

    const fullTime = getFullTime();
    return ((fullTime - timer.timeLeft) / fullTime) * 100;
  };

  // SVG for circular progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage() / 100) * circumference;

  return (
    <div className="flex flex-col items-center my-6">
      <div className={`text-lg font-medium mb-4 px-4 py-1 rounded-full ${getModeColor()}`}>
        {getModeTitle()}
      </div>
      
      <div className="relative">
        <svg width="280" height="280" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={timer.mode === 'work' ? 'text-primary' : timer.mode === 'shortBreak' ? 'text-secondary' : 'text-accent'}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold mb-2">{formatTime(timer.timeLeft)}</span>
          <span className="text-sm text-muted-foreground">Round {timer.rounds + 1}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-6">
        {timer.isRunning ? (
          <button 
            onClick={pauseTimer}
            className="btn btn-primary flex items-center space-x-2"
            aria-label="Pause timer"
          >
            <Pause className="h-5 w-5" />
            <span>Pause</span>
          </button>
        ) : (
          <button 
            onClick={() => startTimer()}
            className="btn btn-primary flex items-center space-x-2"
            aria-label="Start timer"
          >
            <Play className="h-5 w-5" />
            <span>Start</span>
          </button>
        )}
        
        <button 
          onClick={resetTimer}
          className="btn btn-ghost flex items-center"
          aria-label="Reset timer"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        
        <button 
          onClick={skipTimer}
          className="btn btn-ghost flex items-center"
          aria-label="Skip to next phase"
        >
          <SkipForward className="h-5 w-5" />
        </button>
        
        <button 
          onClick={onOpenSettings}
          className="btn btn-ghost flex items-center"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Timer;