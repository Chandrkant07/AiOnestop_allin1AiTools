import React, { useState } from 'react';
import { Play, Clock, Trash2, CheckCircle, Circle, XCircle } from 'lucide-react';
import { usePomodoroContext, Task, TaskStatus } from '../../contexts/PomodoroContext';

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask, startTimer, timer } = usePomodoroContext();
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
  
  // Sort tasks by priority (high to low) and then by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Filter tasks based on status
  const filteredTasks = filter === 'all' 
    ? sortedTasks 
    : sortedTasks.filter(task => task.status === filter);

  // Update task status
  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    updateTask({ ...task, status: newStatus });
  };
  
  // Start timer with selected task
  const handleStartTimer = (taskId: string) => {
    // Update task status to 'inProgress' if it's not already
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== 'inProgress') {
      updateTask({ ...task, status: 'inProgress' });
    }
    
    startTimer(taskId);
  };
  
  // Get priority badge color
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/20 text-error border-error/30';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'low':
        return 'bg-success/20 text-success border-success/30';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      case 'inProgress':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'done':
        return <CheckCircle className="h-5 w-5 text-success" />;
    }
  };
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        
        <div className="flex space-x-1 text-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md ${
              filter === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('todo')}
            className={`px-3 py-1 rounded-md ${
              filter === 'todo' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => setFilter('inProgress')}
            className={`px-3 py-1 rounded-md ${
              filter === 'inProgress' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1 rounded-md ${
              filter === 'done' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            }`}
          >
            Done
          </button>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg border ${
                task.id === timer.currentTaskId && timer.isRunning
                  ? 'border-primary bg-primary/5 animate-pulse'
                  : 'border-border bg-card hover:border-primary/20'
              } transition-all`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <button 
                    onClick={() => {
                      const newStatus = task.status === 'todo' ? 'inProgress' : 
                                       task.status === 'inProgress' ? 'done' : 'todo';
                      handleStatusChange(task, newStatus);
                    }}
                    className="mt-1"
                    aria-label={`Mark task as ${
                      task.status === 'todo' ? 'in progress' : 
                      task.status === 'inProgress' ? 'done' : 'to do'
                    }`}
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center mt-2 gap-2">
                      <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      
                      <span className="text-xs flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.estimatedMinutes} min
                      </span>
                      
                      {task.timeSpent > 0 && (
                        <span className="text-xs text-muted-foreground">
                          Spent: {task.timeSpent} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {task.status !== 'done' && (
                    <button
                      onClick={() => handleStartTimer(task.id)}
                      className={`p-1.5 rounded-md hover:bg-primary/10 ${
                        task.id === timer.currentTaskId ? 'text-primary' : ''
                      }`}
                      aria-label="Focus on this task"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-md hover:bg-error/10 text-error/80"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;