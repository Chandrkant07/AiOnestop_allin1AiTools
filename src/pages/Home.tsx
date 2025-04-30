import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, Instagram } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Pomodoro Timer',
      description: 'Boost your productivity with a time-blocking system and a customizable Pomodoro timer',
      icon: <Clock className="h-8 w-8 text-primary" />,
      link: '/pomodoro'
    },
    {
      title: 'Resume Builder',
      description: 'Create professional resumes with AI-powered suggestions based on job descriptions',
      icon: <FileText className="h-8 w-8 text-secondary" />,
      link: '/resume'
    },
    {
      title: 'Instagram Bio Generator',
      description: 'Generate creative and engaging Instagram bios to enhance your social media presence',
      icon: <Instagram className="h-8 w-8 text-accent" />,
      link: '/instagram-bio'
    }
  ];

  return (
    <div className="flex flex-col items-center">
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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to Productivity Hub
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Your all-in-one toolkit for maximizing productivity and creativity
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-2 h-full">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                      Get Started
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;