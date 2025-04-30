import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PomodoroPage from './pages/PomodoroPage';
import ResumePage from './pages/ResumePage';
import InstagramBioPage from './pages/InstagramBioPage';
import { PomodoroProvider } from './contexts/PomodoroContext';
import { ResumeProvider } from './contexts/ResumeContext';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/pomodoro" 
            element={
              <PomodoroProvider>
                <PomodoroPage />
              </PomodoroProvider>
            } 
          />
          <Route 
            path="/resume" 
            element={
              <ResumeProvider>
                <ResumePage />
              </ResumeProvider>
            } 
          />
          <Route path="/instagram-bio" element={<InstagramBioPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;