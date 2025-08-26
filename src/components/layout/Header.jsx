import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component for site navigation
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
const Header = ({ className = '', ...props }) => {
  return (
    <header className={`header ${className}`} {...props}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
              <span className="text-primary-white font-bold text-sm">AP</span>
            </div>
            <span className="text-xl font-bold text-gray-800">AnchorPoint</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-blue transition-colors duration-200 body-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary-blue transition-colors duration-200 body-medium"
            >
              About
            </Link>
            <Link 
              to="/resources" 
              className="text-gray-600 hover:text-primary-blue transition-colors duration-200 body-medium"
            >
              Resources
            </Link>
            <Link 
              to="/community" 
              className="text-gray-600 hover:text-primary-blue transition-colors duration-200 body-medium"
            >
              Community
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
