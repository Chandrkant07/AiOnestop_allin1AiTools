import React, { useState } from 'react';
import { useResumeContext } from '../../contexts/ResumeContext';
import { Sparkles, Check, X, Loader2 } from 'lucide-react';

const AiSuggestions: React.FC = () => {
  const { 
    resume, 
    suggestions, 
    addSuggestion, 
    applySuggestion, 
    dismissSuggestion, 
    clearAllSuggestions 
  } = useResumeContext();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateSuggestions = async () => {
    if (!resume.targetRole || !resume.jobDescription) {
      setError('Please provide both a target role and job description to generate suggestions.');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    // In a real app, this would make an API call to an AI service
    // For this demo, we'll simulate AI suggestions
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // These are simulated AI suggestions - in a real app, these would come from an AI API
      const simulatedSuggestions = [
        {
          section: 'personalInfo.summary',
          originalText: resume.personalInfo.summary,
          suggestedText: resume.personalInfo.summary
            ? `${resume.personalInfo.summary} Specializing in ${resume.targetRole} with a track record of delivering results.`
            : `Experienced professional specializing in ${resume.targetRole} with a track record of delivering results.`,
          reason: `Added specific mention of the target role "${resume.targetRole}" to make your summary more relevant to the job description.`,
        },
      ];
      
      // Add suggestions for experience bullet points if they exist
      if (resume.experience.length > 0) {
        const exp = resume.experience[0];
        if (exp.bullets.length > 0) {
          simulatedSuggestions.push({
            section: `experience.${exp.id}.bullets.0`,
            originalText: exp.bullets[0],
            suggestedText: exp.bullets[0]
              ? `${exp.bullets[0]} resulting in improved performance metrics and stakeholder satisfaction.`
              : `Implemented innovative solutions for key business challenges resulting in improved performance metrics and stakeholder satisfaction.`,
            reason: 'Enhanced your achievement with specific results and outcomes, which are highly valued in job descriptions.',
          });
        }
      }
      
      // Add skills suggestion based on job description
      const jobDescLower = resume.jobDescription.toLowerCase();
      let skillSuggestion = null;
      
      if (jobDescLower.includes('javascript') || jobDescLower.includes('react') || jobDescLower.includes('web development')) {
        skillSuggestion = {
          name: 'React.js',
          reason: 'The job description mentions web development technologies. Adding React.js will make your resume more relevant.',
        };
      } else if (jobDescLower.includes('data') || jobDescLower.includes('analysis') || jobDescLower.includes('analytics')) {
        skillSuggestion = {
          name: 'Data Analysis',
          reason: 'The job description emphasizes data analysis. Adding this specific skill will align with the requirements.',
        };
      } else if (jobDescLower.includes('leadership') || jobDescLower.includes('manager') || jobDescLower.includes('team')) {
        skillSuggestion = {
          name: 'Team Leadership',
          reason: 'The job requires leadership skills. Adding this will highlight your management capabilities.',
        };
      }
      
      if (skillSuggestion) {
        simulatedSuggestions.push({
          section: 'skills.new',
          originalText: '',
          suggestedText: skillSuggestion.name,
          reason: skillSuggestion.reason,
        });
      }
      
      // Add the suggestions to the context
      simulatedSuggestions.forEach(suggestion => {
        addSuggestion(suggestion);
      });
      
    } catch (err) {
      setError('An error occurred while generating suggestions. Please try again.');
      console.error('Error generating suggestions:', err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">AI Suggestions</h2>
        {suggestions.length > 0 && (
          <button 
            onClick={clearAllSuggestions}
            className="btn btn-ghost text-sm"
          >
            Clear All
          </button>
        )}
      </div>
      
      {error && (
        <div className="p-4 bg-error/10 text-error rounded-lg">
          {error}
        </div>
      )}
      
      <button
        onClick={generateSuggestions}
        disabled={isGenerating || !resume.targetRole || !resume.jobDescription}
        className="btn btn-primary flex items-center justify-center w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating Suggestions...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Suggestions
          </>
        )}
      </button>
      
      {suggestions.length > 0 ? (
        <div className="space-y-4 mt-6">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className={`p-4 bg-card border rounded-lg ${suggestion.applied ? 'border-success bg-success/5' : 'border-border'}`}
            >
              <div className="mb-2">
                <span className="text-sm font-medium">Suggestion for: </span>
                <span className="text-sm">
                  {suggestion.section.startsWith('personalInfo') ? 'Personal Summary' :
                   suggestion.section.startsWith('experience') ? 'Experience' :
                   suggestion.section.startsWith('education') ? 'Education' :
                   suggestion.section.startsWith('skills') ? 'Skills' : 'Resume Content'}
                </span>
              </div>
              
              {suggestion.section !== 'skills.new' && (
                <div className="mb-3">
                  <h4 className="text-sm text-muted-foreground mb-1">Original:</h4>
                  <p className="text-sm bg-muted p-2 rounded">
                    {suggestion.originalText || <em>Empty</em>}
                  </p>
                </div>
              )}
              
              <div className="mb-3">
                <h4 className="text-sm text-muted-foreground mb-1">Suggestion:</h4>
                <p className="text-sm bg-primary/5 p-2 rounded border border-primary/10">
                  {suggestion.suggestedText}
                </p>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm text-muted-foreground mb-1">Reasoning:</h4>
                <p className="text-sm">{suggestion.reason}</p>
              </div>
              
              {!suggestion.applied && (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => dismissSuggestion(suggestion.id)}
                    className="btn btn-ghost text-sm flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Dismiss
                  </button>
                  <button
                    onClick={() => applySuggestion(suggestion.id)}
                    className="btn btn-primary text-sm flex items-center"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Apply
                  </button>
                </div>
              )}
              
              {suggestion.applied && (
                <div className="flex items-center text-success text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  Applied
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg border border-border">
          <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No suggestions yet. Fill in the Job Targeting section and click "Generate AI Suggestions".
          </p>
        </div>
      )}
    </div>
  );
};

export default AiSuggestions;