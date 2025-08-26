import React from 'react';

/**
 * Card component for content containers
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant: 'default', 'accent-red', or 'accent-blue'
 * @param {boolean} [props.hoverable=false] - Whether card has hover effect
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Card ID
 */
const Card = ({ 
  variant = 'default', 
  hoverable = false, 
  children, 
  className = '',
  id,
  ...props 
}) => {
  const baseClasses = 'card overflow-hidden';
  
  const variantClasses = {
    default: '',
    'accent-red': 'card-accent-red',
    'accent-blue': 'card-accent-blue',
  };
  
  const hoverClasses = hoverable ? 'hover:shadow-lg cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  return (
    <div 
      id={id}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader component for card headers
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} [props.className] - Additional CSS classes
 */
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardBody component for card body content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} [props.className] - Additional CSS classes
 */
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter component for card footers
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} [props.className] - Additional CSS classes
 */
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
