import React from 'react';

// Component to render individual form fields based on type (text, dropdown, etc.)
const FormField = ({ field, value, handleInputChange, error }) => {
  const { name, type, label, required, options } = field;

  switch (type) {
    case 'text':
    case 'number':
    case 'password':
    case 'date':
      return (
        <div>
          <label>{label}{required && '*'}</label>
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
          />
          {error && <span className="error">{error}</span>}
        </div>
      );
    case 'dropdown':
      return (
        <div>
          <label>{label}{required && '*'}</label>
          <select name={name} value={value || ''} onChange={handleInputChange}>
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {error && <span className="error">{error}</span>}
        </div>
      );
    default:
      return null;
  }
};

export default FormField;

