import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useResumeContext, Skill } from '../../contexts/ResumeContext';

const SkillsForm: React.FC = () => {
  const { resume, addSkill, removeSkill } = useResumeContext();
  const [newSkill, setNewSkill] = useState('');
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill('');
    }
  };
  
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      
      <form onSubmit={handleAddSkill} className="flex space-x-2">
        <input
          type="text"
          className="input flex-1"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g., JavaScript, Project Management, Photoshop)"
        />
        <button
          type="submit"
          className="btn btn-primary flex items-center"
          disabled={!newSkill.trim()}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </form>
      
      {resume.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-4">
          {resume.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center bg-muted px-3 py-1.5 rounded-full"
            >
              <span className="mr-1">{skill.name}</span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="ml-1 p-0.5 rounded-full hover:bg-muted-foreground/20"
                aria-label={`Remove ${skill.name} skill`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No skills added yet. Add some skills to showcase your expertise.
        </p>
      )}
    </div>
  );
};

export default SkillsForm;