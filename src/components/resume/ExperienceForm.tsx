import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useResumeContext, Experience } from '../../contexts/ResumeContext';

const ExperienceForm: React.FC = () => {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeContext();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    bullets: [''],
  });
  
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty bullet points
    const filteredBullets = formData.bullets.filter(bullet => bullet.trim() !== '');
    addExperience({
      ...formData,
      bullets: filteredBullets.length > 0 ? filteredBullets : [''],
    });
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      bullets: [''],
    });
    setIsEditing(null);
  };
  
  const handleEditExperience = (experience: Experience) => {
    setIsEditing(experience.id);
    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate,
      location: experience.location || '',
      description: experience.description,
      bullets: experience.bullets.length > 0 ? experience.bullets : [''],
    });
  };
  
  const handleUpdateExperience = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    // Filter out empty bullet points
    const filteredBullets = formData.bullets.filter(bullet => bullet.trim() !== '');
    updateExperience({ 
      id, 
      ...formData,
      bullets: filteredBullets.length > 0 ? filteredBullets : [''],
    });
    setIsEditing(null);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      bullets: [''],
    });
  };
  
  const handleAddBullet = () => {
    setFormData({ ...formData, bullets: [...formData.bullets, ''] });
  };
  
  const handleUpdateBullet = (index: number, value: string) => {
    const updatedBullets = [...formData.bullets];
    updatedBullets[index] = value;
    setFormData({ ...formData, bullets: updatedBullets });
  };
  
  const handleRemoveBullet = (index: number) => {
    const updatedBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: updatedBullets.length > 0 ? updatedBullets : [''] });
  };
  
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      
      {resume.experience.length > 0 && (
        <div className="space-y-4">
          {resume.experience.map((experience) => (
            <div 
              key={experience.id}
              className="p-4 bg-card border border-border rounded-lg"
            >
              {isEditing === experience.id ? (
                <form onSubmit={(e) => handleUpdateExperience(e, experience.id)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Company/Organization *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Position/Title *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Start Date *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        placeholder="MM/YYYY"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        End Date *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-sm font-medium">
                        Location
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, State/Province, Country"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        className="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of your role..."
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-3">
                      <label className="block mb-1 text-sm font-medium">
                        Key Achievements/Responsibilities *
                      </label>
                      
                      {formData.bullets.map((bullet, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="text-muted-foreground mr-2">•</span>
                              <input
                                type="text"
                                className="input"
                                value={bullet}
                                onChange={(e) => handleUpdateBullet(index, e.target.value)}
                                placeholder="Describe an achievement or responsibility..."
                              />
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(index)}
                            className="p-1.5 rounded-md hover:bg-error/10 text-error/80"
                            aria-label="Remove bullet point"
                            disabled={formData.bullets.length <= 1}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={handleAddBullet}
                        className="btn btn-ghost text-sm"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Bullet Point
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-ghost flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{experience.position}</h3>
                      <p className="font-medium">{experience.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {experience.startDate} - {experience.endDate}
                        {experience.location && ` | ${experience.location}`}
                      </p>
                      
                      {experience.description && (
                        <p className="mt-2">{experience.description}</p>
                      )}
                      
                      {experience.bullets.length > 0 && experience.bullets[0] !== '' && (
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {experience.bullets.map((bullet, index) => (
                            <li key={index}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditExperience(experience)}
                        className="p-1.5 rounded-md hover:bg-muted"
                        aria-label="Edit experience"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeExperience(experience.id)}
                        className="p-1.5 rounded-md hover:bg-error/10 text-error/80"
                        aria-label="Remove experience"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {isEditing === 'new' ? (
        <div className="p-4 bg-card border border-border rounded-lg animate-fade-in">
          <form onSubmit={handleAddExperience}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Company/Organization *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Position/Title *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Start Date *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="MM/YYYY"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  End Date *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="MM/YYYY or Present"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State/Province, Country"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of your role..."
                />
              </div>
              
              <div className="md:col-span-2 space-y-3">
                <label className="block mb-1 text-sm font-medium">
                  Key Achievements/Responsibilities *
                </label>
                
                {formData.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">•</span>
                        <input
                          type="text"
                          className="input"
                          value={bullet}
                          onChange={(e) => handleUpdateBullet(index, e.target.value)}
                          placeholder="Describe an achievement or responsibility..."
                        />
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(index)}
                      className="p-1.5 rounded-md hover:bg-error/10 text-error/80"
                      aria-label="Remove bullet point"
                      disabled={formData.bullets.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="btn btn-ghost text-sm"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Bullet Point
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-ghost flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing('new')}
          className="btn btn-ghost border border-dashed border-muted-foreground/50 w-full py-3 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceForm;