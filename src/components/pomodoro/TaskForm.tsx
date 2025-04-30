import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { usePomodoroContext, TaskPriority } from '../../contexts/PomodoroContext';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose }) => {
  const { addTask } = usePomodoroContext();
  
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState(25);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask({
      title: title.trim(),
      priority,
      estimatedMinutes,
      status: 'todo',
    });
    
    // Reset form
    setTitle('');
    setPriority('medium');
    setEstimatedMinutes(25);
    
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-slide-up bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              autoFocus
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="estimatedTime" className="block mb-2 text-sm font-medium">
              Estimated Time (minutes)
            </label>
            <input
              id="estimatedTime"
              type="number"
              className="input"
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(Math.max(5, parseInt(e.target.value) || 5))}
              min="5"
              step="5"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Priority</label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium flex-1 ${
                  priority === 'low'
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-card hover:bg-muted border border-border'
                }`}
                onClick={() => setPriority('low')}
              >
                Low
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium flex-1 ${
                  priority === 'medium'
                    ? 'bg-warning/20 text-warning border border-warning/30'
                    : 'bg-card hover:bg-muted border border-border'
                }`}
                onClick={() => setPriority('medium')}
              >
                Medium
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium flex-1 ${
                  priority === 'high'
                    ? 'bg-error/20 text-error border border-error/30'
                    : 'bg-card hover:bg-muted border border-border'
                }`}
                onClick={() => setPriority('high')}
              >
                High
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={!title.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;