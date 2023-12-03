import React from 'react';
import './ModuleTableComponent.css'; // Import the CSS file for styling

const ModuleTableComponent = ({ moduleData }) => {
  return (
    <div className="mainTable">
      <h2>Module Table</h2>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Input Price (₹)</th>
            {/* <th>Input 2</th>
            <th>Input 3</th> */}
          </tr>
        </thead>
        <tbody>
          {moduleData.map((module) => (
            <tr key={module.id}>
              <td>{module.id}</td>
              <td>{module.input1} {module.input2} {module.input3}</td>
              {/* <td>{module.input2}</td>
              <td>{module.input3}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleTableComponent;
