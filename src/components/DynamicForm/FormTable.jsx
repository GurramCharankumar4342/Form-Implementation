import React from 'react';
import FormActions from './FormActions'; // Assuming you have this component for edit and delete actions

const FormTable = ({ submittedData, fields, onDelete, onEdit }) => {
  // Handle the delete action
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    console.log("Updated data after delete:", updatedData);

    // Call onDelete (which is passed as a prop from the parent)
    if (onDelete && typeof onDelete === 'function') {
      onDelete(updatedData); // Pass updated data back to parent
    } else {
      console.error("onDelete function is not passed or is not a function");
    }
  };

  return (
    <div className="submitted-data">
      <h2>Submitted Data</h2>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th> // Key should be unique
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={data.id || index}> {/* Prefer using a unique identifier if possible */}
              {fields.map((field) => (
                <td key={field.name}>{data[field.name]}</td>
              ))}
              <FormActions 
                // Pass delete and edit handlers to each row
                onDelete={() => handleDelete(index)} 
                onEdit={() => onEdit(index)} 
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;

