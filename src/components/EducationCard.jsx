import React from 'react';
import education from '../education.json';

const EducationCard = () => {
  return (
    <div className="education-container">
      {education.map((edu, index) => (
        <div key={index} className="education-card">
          <h2>{edu.institution}</h2>
          <h3>{edu.degree}</h3>
          <p className="timeline"><i>{edu.duration}</i></p>
          <p className="details">{edu.details}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationCard;
