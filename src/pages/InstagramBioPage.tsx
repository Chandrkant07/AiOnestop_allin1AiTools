import React, { useState } from 'react';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';

const InstagramBioPage: React.FC = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [interests, setInterests] = useState('');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bioSuggestions, setBioSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const tones = [
    { id: 'professional', label: 'Professional' },
    { id: 'cool', label: 'Cool' },
    { id: 'funny', label: 'Funny' },
    { id: 'aesthetic', label: 'Aesthetic' },
  ];
  
  const generateBios = async () => {
    if (!name && !profession && !interests) {
      setError('Please fill in at least one field (Name, Profession, or Interests)');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    setBioSuggestions([]);
    
    try {
      // In a real app, this would make an API call to an AI service
      // For this demo, we'll simulate AI suggestions
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockEmojis = {
        professional: ['👨‍💼', '👩‍💼', '📊', '💼', '📈', '🌐', '✅'],
        cool: ['😎', '🔥', '✌️', '🚀', '💯', '⚡', '🤙'],
        funny: ['😂', '🤣', '🙃', '🤪', '🥳', '🎭', '🎯'],
        aesthetic: ['✨', '🌙', '🌿', '🌸', '🌊', '🍂', '🌷'],
      };
      
      const getRandomEmojis = (count: number) => {
        const toneEmojis = mockEmojis[selectedTone as keyof typeof mockEmojis];
        const result = [];
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * toneEmojis.length);
          result.push(toneEmojis[randomIndex]);
        }
        return result.join(' ');
      };
      
      // Generate 3 mock bios
      const generateMockBio = (index: number) => {
        const emojis = includeEmojis ? getRandomEmojis(Math.floor(Math.random() * 2) + 1) + ' ' : '';
        const nameText = name ? name : '';
        const professionText = profession ? profession : '';
        const interestsList = interests.split(',').map(i => i.trim()).filter(i => i);
        
        switch (selectedTone) {
          case 'professional':
            if (index === 0) {
              return `${emojis}${nameText}${nameText ? ' | ' : ''}${professionText}${professionText ? ' | ' : ''}${interestsList.join(' | ')}${interestsList.length ? ' | ' : ''}Helping brands succeed.`;
            } else if (index === 1) {
              return `${emojis}${nameText}${nameText && professionText ? ' - ' : ''}${professionText}. Passionate about ${interestsList.join(', ') || 'innovation and growth'}. Let's connect!`;
            } else {
              return `${emojis}${professionText}${professionText ? ' professional' : 'Professional'} with a passion for ${interestsList.join(' & ') || 'excellence'}. ${nameText ? `${nameText} -` : ''} Building the future.`;
            }
          
          case 'cool':
            if (index === 0) {
              return `${emojis}just ${nameText || 'me'} doing ${professionText || 'my thing'} | ${interestsList.join(' × ') || 'vibes only'} | no bad days`;
            } else if (index === 1) {
              return `${emojis}${nameText || 'living life'} | creating ${interestsList.join(' & ') || 'moments'} | ${professionText || 'chasing dreams'} | catch me if you can`;
            } else {
              return `${emojis}${professionText ? `${professionText} by day` : 'dreamer by day'} | ${interestsList.join(' enthusiast | ') || 'adventure seeker'} | ${nameText || 'good vibes only'}`;
            }
            
          case 'funny':
            if (index === 0) {
              return `${emojis}${nameText || 'Professional overthinker'} | ${professionText || 'Full-time awesome person'} | ${interestsList.join(' & ') || 'Talks to plants & pets'} | Will work for tacos`;
            } else if (index === 1) {
              return `${emojis}${professionText ? `${professionText} (sometimes)` : 'Professional napper'} | ${nameText || 'Certified overthinker'} | ${interestsList.join(' > ') || 'Coffee > People'} | Send memes`;
            } else {
              return `${emojis}${nameText || 'Your future ex-follower'} | ${professionText || 'Procrastination expert'} | ${interestsList.join(' when not sleeping | ') || 'Taco enthusiast'} | I'm hilarious (source: my mom)`;
            }
            
          case 'aesthetic':
            if (index === 0) {
              return `${emojis}${nameText || '𝓈𝑜𝓊𝓁'} | ${professionText || '𝒹𝓇𝑒𝒶𝓂𝑒𝓇'} | ${interestsList.join(' • ') || 'creating • exploring • becoming'}`;
            } else if (index === 1) {
              return `${emojis}${nameText ? `${nameText} •` : ''}${interestsList.join(' | ') || 'sunsets | poetry | moments'} | ${professionText || 'creating beauty in chaos'}`;
            } else {
              return `${emojis}${nameText || 'wanderer'} • ${professionText || 'dreamer'} • ${interestsList.join(' • ') || 'seeker of beauty'}`;
            }
        }
      };
      
      const mockBios = [
        generateMockBio(0),
        generateMockBio(1),
        generateMockBio(2),
      ];
      
      setBioSuggestions(mockBios);
    } catch (error) {
      console.error('Error generating bios:', error);
      setError('Failed to generate bio suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy bio:', err);
        alert('Failed to copy bio to clipboard.');
      });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
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

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Instagram Bio Generator</h1>
        <p className="text-muted-foreground">Create the perfect bio for your Instagram profile</p>
      </div>
      
      <div className="card p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="profession" className="block mb-2 text-sm font-medium">
              Profession
            </label>
            <input
              id="profession"
              type="text"
              className="input"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="What do you do?"
            />
          </div>
          
          <div>
            <label htmlFor="interests" className="block mb-2 text-sm font-medium">
              Interests (comma-separated)
            </label>
            <input
              id="interests"
              type="text"
              className="input"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="photography, travel, fitness..."
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTone === tone.id
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border hover:bg-muted'
                  }`}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              id="includeEmojis"
              type="checkbox"
              className="checkbox"
              checked={includeEmojis}
              onChange={(e) => setIncludeEmojis(e.target.checked)}
            />
            <label htmlFor="includeEmojis" className="text-sm font-medium">
              Include Emojis
            </label>
          </div>
          
          <button
            onClick={generateBios}
            disabled={isGenerating}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Bios
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Your Bio Suggestions</h2>
        
        {error && (
          <div className="p-4 bg-error/10 text-error rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {bioSuggestions.length > 0 ? (
          <div className="space-y-4">
            {bioSuggestions.map((bio, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg relative pr-16"
              >
                <p>{bio}</p>
                <button
                  onClick={() => copyToClipboard(bio, index)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-md ${
                    copiedIndex === index 
                      ? 'bg-success text-white' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                  aria-label="Copy bio"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              {isGenerating ? 'Generating suggestions...' : 'Click "Generate Bios" to see suggestions'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramBioPage;