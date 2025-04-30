import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Timer from '../components/pomodoro/Timer';
import TaskList from '../components/pomodoro/TaskList';
import TaskForm from '../components/pomodoro/TaskForm';
import SettingsModal from '../components/pomodoro/SettingsModal';
import Stats from '../components/pomodoro/Stats';

const PomodoroPage: React.FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Ad Banner */}
      <div className="w-full max-w-[468px] mx-auto mb-8 overflow-hidden">
        <script type="text/javascript">
          {`
            atOptions = {
              'key' : '504ab14716efc79e51f878038aca1d11',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          `}
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/504ab14716efc79e51f878038aca1d11/invoke.js"></script>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
        <button
          onClick={() => setIsTaskFormOpen(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Task
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="md:sticky md:top-24">
            <Timer onOpenSettings={() => setIsSettingsOpen(true)} />
            <Stats />
          </div>
        </div>
        
        <div className="md:col-span-2 order-1 md:order-2">
          <TaskList />
        </div>
      </div>
      
      <TaskForm isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default PomodoroPage;