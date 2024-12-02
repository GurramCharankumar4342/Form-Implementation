import React from 'react';

// Component for handling actions (Edit/Delete) on submitted data
const FormActions = ({ onEdit, onDelete }) => (
  <td>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </td>
);

export default FormActions;
