import React from 'react';
import { X } from 'lucide-react';
import { usePomodoroContext } from '../../contexts/PomodoroContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = usePomodoroContext();
  
  if (!isOpen) return null;
  
  const handleChange = (key: keyof typeof settings, value: number | boolean) => {
    updateSettings({ [key]: value });
  };
  
  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Timer Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Time (minutes)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="workTime" className="block text-sm text-muted-foreground mb-1">
                  Focus
                </label>
                <input
                  id="workTime"
                  type="number"
                  className="input"
                  min="1"
                  max="60"
                  value={settings.workTime}
                  onChange={(e) => handleChange('workTime', Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label htmlFor="shortBreakTime" className="block text-sm text-muted-foreground mb-1">
                  Short Break
                </label>
                <input
                  id="shortBreakTime"
                  type="number"
                  className="input"
                  min="1"
                  max="30"
                  value={settings.shortBreakTime}
                  onChange={(e) => handleChange('shortBreakTime', Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label htmlFor="longBreakTime" className="block text-sm text-muted-foreground mb-1">
                  Long Break
                </label>
                <input
                  id="longBreakTime"
                  type="number"
                  className="input"
                  min="1"
                  max="60"
                  value={settings.longBreakTime}
                  onChange={(e) => handleChange('longBreakTime', Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="roundsBeforeLongBreak" className="block font-medium mb-1">
              Rounds Before Long Break
            </label>
            <input
              id="roundsBeforeLongBreak"
              type="number"
              className="input"
              min="1"
              max="10"
              value={settings.roundsBeforeLongBreak}
              onChange={(e) => handleChange('roundsBeforeLongBreak', Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Auto Start</h3>
            
            <div className="flex items-center">
              <input
                id="autoStartBreaks"
                type="checkbox"
                className="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
              />
              <label htmlFor="autoStartBreaks" className="ml-2">
                Auto-start breaks
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="autoStartPomodoros"
                type="checkbox"
                className="checkbox"
                checked={settings.autoStartPomodoros}
                onChange={(e) => handleChange('autoStartPomodoros', e.target.checked)}
              />
              <label htmlFor="autoStartPomodoros" className="ml-2">
                Auto-start focus sessions
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="soundEnabled"
                type="checkbox"
                className="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => handleChange('soundEnabled', e.target.checked)}
              />
              <label htmlFor="soundEnabled" className="ml-2">
                Sound notifications
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;