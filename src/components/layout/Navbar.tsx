import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, CheckCircle2, FileText, Instagram } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Pomodoro', path: '/pomodoro', icon: <CheckCircle2 className="h-5 w-5" /> },
    { name: 'Resume', path: '/resume', icon: <FileText className="h-5 w-5" /> },
    { name: 'Instagram Bio', path: '/instagram-bio', icon: <Instagram className="h-5 w-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-card shadow-sm border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-primary font-bold text-xl">Productivity Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-card hover:text-primary/80'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card pt-2 pb-3 border-b border-border">
          <div className="container mx-auto px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted hover:text-primary/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;