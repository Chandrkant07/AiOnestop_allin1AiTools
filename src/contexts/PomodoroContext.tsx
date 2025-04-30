import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'todo' | 'inProgress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  status: TaskStatus;
  timeSpent: number; // in minutes
  createdAt: Date;
  completedAt?: Date;
}

interface TimerState {
  isRunning: boolean;
  mode: 'work' | 'shortBreak' | 'longBreak';
  timeLeft: number; // in seconds
  currentTaskId: string | null;
  rounds: number;
}

interface PomodoroSettings {
  workTime: number; // in minutes
  shortBreakTime: number; // in minutes
  longBreakTime: number; // in minutes
  roundsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
}

interface PomodoroContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'timeSpent'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  timer: TimerState;
  startTimer: (taskId?: string) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  settings: PomodoroSettings;
  updateSettings: (newSettings: Partial<PomodoroSettings>) => void;
  stats: {
    totalTasksCompleted: number;
    totalFocusTime: number; // in minutes
    todayFocusTime: number; // in minutes
  };
}

const defaultSettings: PomodoroSettings = {
  workTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  roundsBeforeLongBreak: 4,
  autoStartBreaks: true,
  autoStartPomodoros: true,
  soundEnabled: true,
};

const defaultTimer: TimerState = {
  isRunning: false,
  mode: 'work',
  timeLeft: defaultSettings.workTime * 60,
  currentTaskId: null,
  rounds: 0,
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoroContext must be used within a PomodoroProvider');
  }
  return context;
};

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved data from localStorage or use defaults
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    }
    return [];
  });
  
  const [timer, setTimer] = useState<TimerState>(() => {
    const savedTimer = localStorage.getItem('pomodoro-timer');
    if (savedTimer) {
      return JSON.parse(savedTimer);
    }
    return defaultTimer;
  });
  
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return defaultSettings;
  });

  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('pomodoro-stats');
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    return {
      totalTasksCompleted: 0,
      totalFocusTime: 0, // in minutes
      todayFocusTime: 0, // in minutes
    };
  });

  // Timer tick effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (timer.isRunning) {
      interval = window.setInterval(() => {
        setTimer((prev) => {
          if (prev.timeLeft <= 1) {
            // Timer finished
            playSound();
            
            const newMode = getNextTimerMode(prev.mode, prev.rounds);
            const newRounds = newMode === 'work' ? prev.rounds + 1 : prev.rounds;
            
            // Update time spent on task if in work mode
            if (prev.mode === 'work' && prev.currentTaskId) {
              updateTaskTimeSpent(prev.currentTaskId, settings.workTime);
            }
            
            // Auto start next timer based on settings
            const shouldAutoStart = 
              (newMode !== 'work' && settings.autoStartBreaks) || 
              (newMode === 'work' && settings.autoStartPomodoros);
            
            return {
              ...prev,
              mode: newMode,
              timeLeft: getModeTimeInSeconds(newMode),
              isRunning: shouldAutoStart,
              rounds: newRounds,
              // Clear current task if moving to a break
              currentTaskId: newMode !== 'work' ? null : prev.currentTaskId,
            };
          }
          
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, settings]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('pomodoro-timer', JSON.stringify(timer));
  }, [timer]);
  
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);
  
  useEffect(() => {
    localStorage.setItem('pomodoro-stats', JSON.stringify(stats));
  }, [stats]);

  // Helper functions
  const getNextTimerMode = (currentMode: 'work' | 'shortBreak' | 'longBreak', rounds: number): 'work' | 'shortBreak' | 'longBreak' => {
    if (currentMode === 'work') {
      return rounds % settings.roundsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  };
  
  const getModeTimeInSeconds = (mode: 'work' | 'shortBreak' | 'longBreak'): number => {
    switch (mode) {
      case 'work':
        return settings.workTime * 60;
      case 'shortBreak':
        return settings.shortBreakTime * 60;
      case 'longBreak':
        return settings.longBreakTime * 60;
    }
  };
  
  const playSound = () => {
    if (settings.soundEnabled) {
      try {
        const audio = new Audio('/notification.mp3');
        audio.play();
      } catch (error) {
        console.error('Error playing notification sound', error);
      }
    }
  };
  
  const updateTaskTimeSpent = (taskId: string, minutes: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, timeSpent: task.timeSpent + minutes } : task
      )
    );
    
    // Update stats when adding time
    setStats((prev) => ({
      ...prev,
      totalFocusTime: prev.totalFocusTime + minutes,
      todayFocusTime: prev.todayFocusTime + minutes,
    }));
  };

  // Context actions
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'timeSpent'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date(),
      timeSpent: 0,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          // If task is being marked as done, update stats
          if (task.status !== 'done' && updatedTask.status === 'done') {
            setStats((prev) => ({
              ...prev,
              totalTasksCompleted: prev.totalTasksCompleted + 1,
            }));
            return { ...updatedTask, completedAt: new Date() };
          }
          return updatedTask;
        }
        return task;
      })
    );
  };
  
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  
  const startTimer = (taskId?: string) => {
    setTimer((prev) => ({
      ...prev,
      isRunning: true,
      currentTaskId: taskId !== undefined ? taskId : prev.currentTaskId,
    }));
  };
  
  const pauseTimer = () => {
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
    }));
  };
  
  const resetTimer = () => {
    setTimer((prev) => ({
      ...prev,
      timeLeft: getModeTimeInSeconds(prev.mode),
      isRunning: false,
    }));
  };
  
  const skipTimer = () => {
    const newMode = getNextTimerMode(timer.mode, timer.rounds);
    const newRounds = newMode === 'work' ? timer.rounds + 1 : timer.rounds;
    
    setTimer({
      isRunning: false,
      mode: newMode,
      timeLeft: getModeTimeInSeconds(newMode),
      currentTaskId: newMode !== 'work' ? null : timer.currentTaskId,
      rounds: newRounds,
    });
  };
  
  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      
      // Adjust current timer if necessary
      setTimer((timerState) => ({
        ...timerState,
        timeLeft: getModeTimeInSeconds(timerState.mode),
      }));
      
      return updated;
    });
  };

  return (
    <PomodoroContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        timer,
        startTimer,
        pauseTimer,
        resetTimer,
        skipTimer,
        settings,
        updateSettings,
        stats,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};