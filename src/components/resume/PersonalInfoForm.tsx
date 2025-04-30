import React from 'react';
import { useResumeContext } from '../../contexts/ResumeContext';

const PersonalInfoForm: React.FC = () => {
  const { resume, updatePersonalInfo } = useResumeContext();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block mb-1 text-sm font-medium">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            className="input"
            value={resume.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 text-sm font-medium">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            className="input"
            value={resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block mb-1 text-sm font-medium">
            Location *
          </label>
          <input
            id="location"
            type="text"
            className="input"
            value={resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="City, State/Province, Country"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="website" className="block mb-1 text-sm font-medium">
            Website/LinkedIn
          </label>
          <input
            id="website"
            type="url"
            className="input"
            value={resume.personalInfo.website || ''}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="summary" className="block mb-1 text-sm font-medium">
          Professional Summary *
        </label>
        <textarea
          id="summary"
          className="textarea h-32"
          value={resume.personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="Write a compelling summary of your professional background, skills, and career goals..."
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          Characters: {resume.personalInfo.summary.length} (Recommended: 100-200)
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;