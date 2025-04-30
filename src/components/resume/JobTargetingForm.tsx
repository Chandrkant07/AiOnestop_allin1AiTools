import React from 'react';
import { useResumeContext } from '../../contexts/ResumeContext';

const JobTargetingForm: React.FC = () => {
  const { resume, setTargetRole, setJobDescription } = useResumeContext();
  
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Job Targeting</h2>
      <p className="text-muted-foreground mb-4">
        Provide details about the job you're applying for to get AI-powered suggestions to optimize your resume.
      </p>
      
      <div>
        <label htmlFor="targetRole" className="block mb-1 text-sm font-medium">
          Target Job Title
        </label>
        <input
          id="targetRole"
          type="text"
          className="input"
          value={resume.targetRole || ''}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g., Senior Software Engineer, Marketing Manager, etc."
        />
      </div>
      
      <div>
        <label htmlFor="jobDescription" className="block mb-1 text-sm font-medium">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="textarea h-48"
          value={resume.jobDescription || ''}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here to get AI-powered suggestions for optimizing your resume..."
        />
      </div>
    </div>
  );
};

export default JobTargetingForm;