import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { useResumeContext } from '../contexts/ResumeContext';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import SkillsForm from '../components/resume/SkillsForm';
import JobTargetingForm from '../components/resume/JobTargetingForm';
import ResumePreview from '../components/resume/ResumePreview';
import AiSuggestions from '../components/resume/AiSuggestions';
import { Eye, EyeOff, LayoutTemplate } from 'lucide-react';

const ResumePage: React.FC = () => {
  const { activeTemplate, setActiveTemplate, visibleSections, toggleSection } = useResumeContext();
  const [activeTab, setActiveTab] = useState('edit');
  
  return (
    <div className="max-w-6xl mx-auto">
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

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume with AI-powered suggestions</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2 bg-card border border-border rounded-md p-2">
            <span className="text-sm font-medium">Template:</span>
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="select"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          
          <div className="dropdown">
            <button className="btn btn-ghost border border-border flex items-center">
              <LayoutTemplate className="h-4 w-4 mr-2" />
              <span>Sections</span>
            </button>
            <div className="dropdown-content">
              <div className="bg-card border border-border rounded-md p-2 w-48 shadow-md">
                <h3 className="text-sm font-medium mb-2">Show/Hide Sections</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleSections.summary}
                      onChange={() => toggleSection('summary')}
                      className="checkbox"
                    />
                    <span className="text-sm">Summary</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleSections.education}
                      onChange={() => toggleSection('education')}
                      className="checkbox"
                    />
                    <span className="text-sm">Education</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleSections.experience}
                      onChange={() => toggleSection('experience')}
                      className="checkbox"
                    />
                    <span className="text-sm">Experience</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleSections.skills}
                      onChange={() => toggleSection('skills')}
                      className="checkbox"
                    />
                    <span className="text-sm">Skills</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-start mb-6 bg-card border border-border p-1 rounded-md">
            <TabsTrigger 
              value="edit" 
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Edit Resume
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Preview & Export
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              AI Suggestions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-0">
            <div className="space-y-8">
              <div className="card p-6">
                <PersonalInfoForm />
              </div>
              
              <div className="card p-6">
                <ExperienceForm />
              </div>
              
              <div className="card p-6">
                <EducationForm />
              </div>
              
              <div className="card p-6">
                <SkillsForm />
              </div>
              
              <div className="card p-6">
                <JobTargetingForm />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <div className="card p-6">
              <ResumePreview />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0">
            <div className="card p-6">
              <AiSuggestions />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumePage;