import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Import the compat/app module
import 'firebase/compat/database'; // Import the compat/database module
import './ModuleInputComponent.css'; // Import the CSS file for styling

const ModuleInputComponent = () => {
    const [selectedModule, setSelectedModule] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };

    const handleInputSubmit = () => {
        // Submit the data to Firebase
        const db = firebase.database();
        const moduleRef = db.ref(`modules/module${selectedModule}`);
        moduleRef.set({
            input1: parseInt(input1),
            input2: parseInt(input2),
            input3: parseInt(input3),
        });
        // Store the submitted data for display
        const submittedData = {
            module: selectedModule,
            input1,
            input2,
            input3
        };
        setSubmittedData(submittedData);
        // Clear input fields
        setInput1('');
        setInput2('');
        setInput3('');
    };

    const totalModules = 170;

    // Generate module options dynamically using a loop
    const moduleOptions = Array.from({ length: totalModules }, (_, index) => ({
        id: index + 1,
        name: `Module ${index + 1}`
    }));

    return (
        <div className="module-input-container">
            {/* <h2>Module Input Form</h2> */}
            <div></div>
            <div className="input-group">
                <select value={selectedModule} onChange={handleModuleChange}>
                <option value="">Select Module</option>
                    {moduleOptions.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Input 1"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Input 2"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Input 3"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                />
                <button className="submit-button" onClick={handleInputSubmit}>
                    Submit
                </button>
            </div>
            {/* Display submitted data */}
      {/* Submitted data section */}
    {submittedData && (
      <div className="submitted-data">
        <h2>Submitted Data</h2>
        <p>Module: {submittedData.module}</p>
        <p>Input 1: <p>{submittedData.input1}</p></p>
        <p>Input 2: <p>{submittedData.input2}</p></p>
        <p>Input 3: <p>{submittedData.input3}</p></p>
      </div>
    )}
        </div>

    );
};

export default ModuleInputComponent;

