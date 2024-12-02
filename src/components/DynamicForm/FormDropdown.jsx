import React from 'react';

// Component to handle form type selection
const FormSelector = ({ onFormTypeChange }) => (
  <div className="form-selector">
    <label>Choose Form Type</label>
    <select onChange={(e) => onFormTypeChange(e.target.value)}>
      <option value="">Select Form</option>
      <option value="User Information">User Information</option>
      <option value="Address Information">Address Information</option>
      <option value="Payment Information">Payment Information</option>
    </select>
  </div>
);

export default FormSelector;
