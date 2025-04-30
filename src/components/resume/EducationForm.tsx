import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useResumeContext, Education } from '../../contexts/ResumeContext';

const EducationForm: React.FC = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeContext();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  });
  
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    addEducation(formData);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    });
    setIsEditing(null);
  };
  
  const handleEditEducation = (education: Education) => {
    setIsEditing(education.id);
    setFormData({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy || '',
      startDate: education.startDate,
      endDate: education.endDate,
      location: education.location || '',
      description: education.description || '',
    });
  };
  
  const handleUpdateEducation = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    updateEducation({ id, ...formData });
    setIsEditing(null);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    });
  };
  
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      
      {resume.education.length > 0 && (
        <div className="space-y-4">
          {resume.education.map((education) => (
            <div 
              key={education.id}
              className="p-4 bg-card border border-border rounded-lg"
            >
              {isEditing === education.id ? (
                <form onSubmit={(e) => handleUpdateEducation(e, education.id)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Institution *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Degree *
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.fieldOfStudy}
                        onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Location
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                        Description
                      </label>
                      <textarea
                        className="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Additional information about your education..."
                      />
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
                      <h3 className="font-semibold text-lg">{education.institution}</h3>
                      <p>
                        {education.degree}
                        {education.fieldOfStudy && `, ${education.fieldOfStudy}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {education.startDate} - {education.endDate}
                        {education.location && ` | ${education.location}`}
                      </p>
                      {education.description && (
                        <p className="mt-2">{education.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditEducation(education)}
                        className="p-1.5 rounded-md hover:bg-muted"
                        aria-label="Edit education"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeEducation(education.id)}
                        className="p-1.5 rounded-md hover:bg-error/10 text-error/80"
                        aria-label="Remove education"
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
          <form onSubmit={handleAddEducation}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Institution *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Degree *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Field of Study
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  Description
                </label>
                <textarea
                  className="textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional information about your education..."
                />
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
          Add Education
        </button>
      )}
    </div>
  );
};

export default EducationForm;