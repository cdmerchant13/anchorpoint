import React, { forwardRef } from 'react';

/**
 * Input component for form fields
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.value=''] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onKeyDown] - Key down handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {string} [props.id] - Input ID
 * @param {string} [props.name] - Input name
 * @param {string} [props.error] - Error message
 */
const Input = forwardRef(({ 
  type = 'text', 
  placeholder = '', 
  value = '', 
  onChange,
  onKeyDown,
  className = '',
  disabled = false,
  id,
  name,
  error,
  ...props 
}, ref) => {
  const inputClasses = `input w-full transition-colors duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`;
  
  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        id={id}
        name={name}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 body-small">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
