import React from 'react';
import { Check, Clock } from 'lucide-react';
import { usePomodoroContext } from '../../contexts/PomodoroContext';

const Stats: React.FC = () => {
  const { stats, tasks } = usePomodoroContext();
  
  // Calculate completion rate
  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(task => task.status === 'done').length / tasks.length) * 100)
    : 0;
  
  // Format time (convert minutes to hours and minutes)
  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 mt-8">
      <h2 className="text-lg font-semibold mb-3">Productivity Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted p-3 rounded-md">
          <div className="text-muted-foreground text-sm mb-1 flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Tasks Completed
          </div>
          <div className="text-xl font-semibold">
            {tasks.filter(task => task.status === 'done').length}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md">
          <div className="text-muted-foreground text-sm mb-1 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Total Focus Time
          </div>
          <div className="text-xl font-semibold">
            {formatTime(stats.totalFocusTime)}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md">
          <div className="text-muted-foreground text-sm mb-1">
            Completion Rate
          </div>
          <div className="text-xl font-semibold">
            {completionRate}%
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md">
          <div className="text-muted-foreground text-sm mb-1">
            Today's Focus Time
          </div>
          <div className="text-xl font-semibold">
            {formatTime(stats.todayFocusTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;