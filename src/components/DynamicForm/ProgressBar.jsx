import React from 'react';

// Component to render the progress bar based on form completion
const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div style={{ width: `${progress}%` }}></div>
  </div>
);

export default ProgressBar;
