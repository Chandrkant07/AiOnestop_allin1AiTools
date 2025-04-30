import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types for resume data structure
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  bullets: string[];
}

interface Skill {
  id: string;
  name: string;
  level?: string; // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
}

export interface Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  targetRole?: string;
  jobDescription?: string;
}

interface AiSuggestion {
  id: string;
  section: string;
  originalText: string;
  suggestedText: string;
  reason: string;
  applied: boolean;
}

// Context state and functions
interface ResumeContextType {
  resume: Resume;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  setTargetRole: (role: string) => void;
  setJobDescription: (description: string) => void;
  suggestions: AiSuggestion[];
  addSuggestion: (suggestion: Omit<AiSuggestion, 'id' | 'applied'>) => void;
  applySuggestion: (id: string) => void;
  dismissSuggestion: (id: string) => void;
  clearAllSuggestions: () => void;
  activeTemplate: string;
  setActiveTemplate: (template: string) => void;
  visibleSections: {
    summary: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
  };
  toggleSection: (section: keyof typeof visibleSections) => void;
}

// Default resume data
const defaultResume: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  targetRole: '',
  jobDescription: '',
};

const defaultVisibleSections = {
  summary: true,
  education: true,
  experience: true,
  skills: true,
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for resume data
  const [resume, setResume] = useState<Resume>(() => {
    const savedResume = localStorage.getItem('resume-data');
    return savedResume ? JSON.parse(savedResume) : defaultResume;
  });
  
  // State for AI suggestions
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>(() => {
    const savedSuggestions = localStorage.getItem('resume-suggestions');
    return savedSuggestions ? JSON.parse(savedSuggestions) : [];
  });
  
  // State for active template
  const [activeTemplate, setActiveTemplate] = useState<string>(() => {
    return localStorage.getItem('resume-template') || 'modern';
  });
  
  // State for visible sections
  const [visibleSections, setVisibleSections] = useState(() => {
    const savedVisibleSections = localStorage.getItem('resume-visible-sections');
    return savedVisibleSections ? JSON.parse(savedVisibleSections) : defaultVisibleSections;
  });
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(resume));
  }, [resume]);
  
  useEffect(() => {
    localStorage.setItem('resume-suggestions', JSON.stringify(suggestions));
  }, [suggestions]);
  
  useEffect(() => {
    localStorage.setItem('resume-template', activeTemplate);
  }, [activeTemplate]);
  
  useEffect(() => {
    localStorage.setItem('resume-visible-sections', JSON.stringify(visibleSections));
  }, [visibleSections]);
  
  // Resume update functions
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };
  
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: uuidv4() };
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };
  
  const updateEducation = (education: Education) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item) => 
        item.id === education.id ? education : item
      ),
    }));
  };
  
  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };
  
  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: uuidv4() };
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };
  
  const updateExperience = (experience: Experience) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => 
        item.id === experience.id ? experience : item
      ),
    }));
  };
  
  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };
  
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: uuidv4() };
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };
  
  const updateSkill = (skill: Skill) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => 
        item.id === skill.id ? skill : item
      ),
    }));
  };
  
  const removeSkill = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };
  
  const setTargetRole = (role: string) => {
    setResume((prev) => ({
      ...prev,
      targetRole: role,
    }));
  };
  
  const setJobDescription = (description: string) => {
    setResume((prev) => ({
      ...prev,
      jobDescription: description,
    }));
  };
  
  // AI suggestion functions
  const addSuggestion = (suggestion: Omit<AiSuggestion, 'id' | 'applied'>) => {
    const newSuggestion = { ...suggestion, id: uuidv4(), applied: false };
    setSuggestions((prev) => [...prev, newSuggestion]);
  };
  
  const applySuggestion = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (!suggestion || suggestion.applied) return;
    
    // Apply the suggestion to the resume
    if (suggestion.section.startsWith('personalInfo.')) {
      const field = suggestion.section.split('.')[1] as keyof PersonalInfo;
      updatePersonalInfo({ [field]: suggestion.suggestedText });
    } else if (suggestion.section.startsWith('education.')) {
      const [_, idPart, field] = suggestion.section.split('.');
      const education = resume.education.find((e) => e.id === idPart);
      if (education) {
        updateEducation({ 
          ...education, 
          [field]: suggestion.suggestedText 
        });
      }
    } else if (suggestion.section.startsWith('experience.')) {
      const [_, idPart, field] = suggestion.section.split('.');
      const experience = resume.experience.find((e) => e.id === idPart);
      if (experience) {
        if (field === 'bullets') {
          // Handle bullet point suggestions differently
          const bulletIndex = parseInt(suggestion.section.split('.')[3]);
          const newBullets = [...experience.bullets];
          newBullets[bulletIndex] = suggestion.suggestedText;
          updateExperience({
            ...experience,
            bullets: newBullets,
          });
        } else {
          updateExperience({ 
            ...experience, 
            [field]: suggestion.suggestedText 
          });
        }
      }
    }
    
    // Mark as applied
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );
  };
  
  const dismissSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };
  
  const clearAllSuggestions = () => {
    setSuggestions([]);
  };
  
  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  return (
    <ResumeContext.Provider
      value={{
        resume,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
        setTargetRole,
        setJobDescription,
        suggestions,
        addSuggestion,
        applySuggestion,
        dismissSuggestion,
        clearAllSuggestions,
        activeTemplate,
        setActiveTemplate,
        visibleSections,
        toggleSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};