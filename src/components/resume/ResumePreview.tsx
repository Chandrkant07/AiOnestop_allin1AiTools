import React from 'react';
import { useResumeContext } from '../../contexts/ResumeContext';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';

const ResumePreview: React.FC = () => {
  const { resume, activeTemplate, visibleSections } = useResumeContext();
  
  const downloadPDF = () => {
    const element = document.getElementById('resume-content');
    const opt = {
      margin: 10,
      filename: `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    
    html2pdf().set(opt).from(element).save();
  };
  
  // Render the appropriate template
  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };
  
  // Modern template
  const renderModernTemplate = () => {
    return (
      <div className="bg-white text-black p-8 w-full max-w-[800px] mx-auto shadow-lg">
        {/* Header */}
        <div className="border-b-2 border-primary pb-4 mb-6">
          <h1 className="text-3xl font-bold mb-1">{resume.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {resume.personalInfo.email && (
              <span>{resume.personalInfo.email}</span>
            )}
            {resume.personalInfo.phone && (
              <span>{resume.personalInfo.phone}</span>
            )}
            {resume.personalInfo.location && (
              <span>{resume.personalInfo.location}</span>
            )}
            {resume.personalInfo.website && (
              <span>{resume.personalInfo.website}</span>
            )}
          </div>
        </div>
        
        {/* Summary */}
        {visibleSections.summary && resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">Summary</h2>
            <p>{resume.personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {visibleSections.experience && resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-sm">{exp.location}</span>}
                  </div>
                  {exp.description && <p className="mb-2 text-sm">{exp.description}</p>}
                  {exp.bullets.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {visibleSections.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Education</h2>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>
                      {edu.degree}
                      {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                    </span>
                    {edu.location && <span className="text-sm">{edu.location}</span>}
                  </div>
                  {edu.description && <p className="text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {visibleSections.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="bg-muted text-foreground px-2 py-1 rounded-md text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Classic template
  const renderClassicTemplate = () => {
    return (
      <div className="bg-white text-black p-8 w-full max-w-[800px] mx-auto shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase mb-1">{resume.personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
            {resume.personalInfo.email && (
              <span>{resume.personalInfo.email}</span>
            )}
            {resume.personalInfo.phone && (
              <span>{resume.personalInfo.phone}</span>
            )}
            {resume.personalInfo.location && (
              <span>{resume.personalInfo.location}</span>
            )}
            {resume.personalInfo.website && (
              <span>{resume.personalInfo.website}</span>
            )}
          </div>
        </div>
        
        {/* Summary */}
        {visibleSections.summary && resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg uppercase font-bold border-b border-gray-300 mb-3">Professional Summary</h2>
            <p>{resume.personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {visibleSections.experience && resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg uppercase font-bold border-b border-gray-300 mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-1">
                    <h3 className="font-bold">{exp.position}</h3>
                    <div className="flex justify-between">
                      <span className="font-semibold">{exp.company}{exp.location && `, ${exp.location}`}</span>
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                  </div>
                  {exp.description && <p className="mb-2 text-sm">{exp.description}</p>}
                  {exp.bullets.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {visibleSections.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg uppercase font-bold border-b border-gray-300 mb-3">Education</h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</h3>
                    <span>{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div>
                    <span className="font-semibold">{edu.institution}</span>
                    {edu.location && <span>, {edu.location}</span>}
                  </div>
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {visibleSections.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-lg uppercase font-bold border-b border-gray-300 mb-3">Skills</h2>
            <p className="text-sm">
              {resume.skills.map((skill) => skill.name).join(' • ')}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  // Minimal template
  const renderMinimalTemplate = () => {
    return (
      <div className="bg-white text-black p-8 w-full max-w-[800px] mx-auto shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light mb-2">{resume.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600">
            {resume.personalInfo.email && (
              <span>{resume.personalInfo.email}</span>
            )}
            {resume.personalInfo.phone && (
              <span>{resume.personalInfo.phone}</span>
            )}
            {resume.personalInfo.location && (
              <span>{resume.personalInfo.location}</span>
            )}
            {resume.personalInfo.website && (
              <span>{resume.personalInfo.website}</span>
            )}
          </div>
        </div>
        
        {/* Summary */}
        {visibleSections.summary && resume.personalInfo.summary && (
          <div className="mb-6">
            <p className="text-sm">{resume.personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {visibleSections.experience && resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold mb-3 uppercase tracking-wider">Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <h3 className="font-medium">{exp.position} | {exp.company}</h3>
                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  {exp.location && <p className="text-sm text-gray-600 mb-1">{exp.location}</p>}
                  {exp.description && <p className="mb-2 text-sm">{exp.description}</p>}
                  {exp.bullets.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {visibleSections.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold mb-3 uppercase tracking-wider">Education</h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <div>
                      <span className="font-medium">{edu.institution}</span>
                      {edu.location && <span className="text-sm text-gray-600"> | {edu.location}</span>}
                    </div>
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p>
                    {edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  </p>
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {visibleSections.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-md font-semibold mb-3 uppercase tracking-wider">Skills</h2>
            <p className="text-sm">
              {resume.skills.map((skill) => skill.name).join(' • ')}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={downloadPDF}
          className="btn btn-primary flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>
      
      <div className="overflow-auto bg-white rounded-lg shadow">
        {/* This is the content that will be converted to PDF */}
        <div id="resume-content" className="min-h-[1000px]">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;