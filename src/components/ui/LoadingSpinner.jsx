import React from 'react';

/**
 * LoadingSpinner component for loading states
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Spinner size: 'small', 'medium', or 'large'
 * @param {string} [props.color='primary-blue'] - Spinner color
 * @param {boolean} [props.fullscreen=false] - Whether spinner takes full screen
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.text] - Loading text to display
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary-blue',
  fullscreen = false,
  className = '',
  text
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  const colorClasses = {
    'primary-blue': 'border-blue-600',
    'primary-red': 'border-red-600',
    'primary-white': 'border-white',
    'gray-400': 'border-gray-400',
  };
  
  const spinnerClasses = `loading-spinner ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  const containerClasses = fullscreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center';
  
  return (
    <div className={containerClasses}>
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {text && (
        <p className="ml-3 text-gray-600 body-small">
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * PageLoading component for full-page loading states
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Loading message
 * @param {string} [props.className] - Additional CSS classes
 */
const PageLoading = ({ message = 'Loading...', className = '', ...props }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`} {...props}>
      <div className="text-center">
        <LoadingSpinner size="large" className="mx-auto mb-4" />
        <p className="text-gray-600 body-medium">{message}</p>
      </div>
    </div>
  );
};

LoadingSpinner.Page = PageLoading;

export default LoadingSpinner;
