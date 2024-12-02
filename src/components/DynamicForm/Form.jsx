import React, { useState } from 'react';
import './Form.css';
import FormSelector from './FormDropdown';
import FormField from '../FormField/FormField';
import FormActions from './FormActions';
import FormTable from './FormTable';
import ProgressBar from './ProgressBar';

const Form = () => {
  // State hooks to manage form data, errors, and submission data
  const [formType, setFormType] = useState('');
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false); //Track if we are editing
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the data being edited

  const handleFormTypeChange = (selectedType) => {
    setFormType(selectedType);
    const formResponses = {
      'User Information': {
        fields: [
          { name: 'firstName', type: 'text', label: 'First Name', required: true },
          { name: 'lastName', type: 'text', label: 'Last Name', required: true },
          { name: 'age', type: 'number', label: 'Age', required: false },
        ],
      },
      'Address Information': {
        fields: [
          { name: 'street', type: 'text', label: 'Street', required: true },
          { name: 'city', type: 'text', label: 'City', required: true },
          { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York', 'Telangana', 'Andhra Pradesh', 'Nalgonda', 'Karimnagar', 'Kammmam', 'Nizamabad'], required: true },
          { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
        ],
      },
      'Payment Information': {
        fields: [
          { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
          { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
          { name: 'cvv', type: 'password', label: 'CVV', required: true },
          { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
        ],
      },
    };

    setFields(formResponses[selectedType]?.fields || []);
    setFormData({});
    setErrors({});
    setIsEditing(false); // Resets editing state
    setEditingIndex(null); // Resets editing index
  };

  //handling the input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      calculateProgress(updatedData);
      return updatedData;
    });
  };
  //calculating the progress data by  filtering the fileds
  const calculateProgress = (data) => {
    const totalFields = fields.length;
    const filledFields = Object.keys(data).filter((key) => data[key]).length;
    setProgress(Math.floor((filledFields / totalFields) * 100));
  };

  //form validation
  const validateForm = () => {
    const validationErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handling form submission (either for adding or updating data)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        // Update existing data
        const updatedData = [...submittedData];
        updatedData[editingIndex] = formData;
        setSubmittedData(updatedData);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        // Adding new data
        setSubmittedData([...submittedData, formData]);
      }
      setFormData({});
      setProgress(0);
      alert(isEditing ? 'Data updated successfully!' : 'Form submitted successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  //handleEdit is used to edit the form data after clicking on the edit button
  const handleEdit = (index) => {
    const dataToEdit = submittedData[index];
    setFormData(dataToEdit);
    setIsEditing(true);
    setEditingIndex(index);
  };
  //handleDelete is used to delete the form data after clicking on the delete button
  const handleDelete = (updatedData) => {
    setSubmittedData(updatedData);
  };

  return (
    <div className="dynamic-form-container">
      <header>
        <h1>Form</h1>
      </header>
      <FormSelector onFormTypeChange={handleFormTypeChange} />
      {formType && (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              handleInputChange={handleInputChange}
              error={errors[field.name]}
            />
          ))}
          <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
      )}

      {progress > 0 && <ProgressBar progress={progress} />}

      <FormTable
        submittedData={submittedData}
        fields={fields}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <footer>
        <p>© 2024 Dynamic Forms. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Form;

