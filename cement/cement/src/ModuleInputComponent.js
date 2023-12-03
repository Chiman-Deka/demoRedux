import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './ModuleInputComponent.css';

const ModuleInputComponent = () => {
    const [selectedModule, setSelectedModule] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };

    const handleInputSubmit = () => {
        // Validate that inputValue is a three-digit number
        const isValidInput = /^\d{3}$/.test(inputValue);

        if (isValidInput) {
            // Submit the data to Firebase
            const db = firebase.database();
            const moduleRef = db.ref(`modules/module${selectedModule}`);
            
            // Convert the 3-digit input to an array of three integers
            const [input1, input2, input3] = inputValue.split('').map(Number);

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
                input3,
            };
            setSubmittedData(submittedData);

            // Clear input field
            setInputValue('');
        } else {
            alert('Please enter a valid three-digit number.');
        }
    };

    const totalModules = 170;

    const moduleOptions = Array.from({ length: totalModules }, (_, index) => ({
        id: index + 1,
        name: `Module ${index + 1}`,
    }));

    return (
        <div>
            <div className="module-input-container">
            <h2>Set the Price</h2>
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
                    placeholder="Enter the Price"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="submit-button" onClick={handleInputSubmit}>
                    Submit
                </button>
            </div>
            {submittedData && (
                <div className="submitted-data">
                    <h2>Submitted Data</h2>
                    <p>Module: {submittedData.module}</p>
                    <p>Input Price (₹): {submittedData.input1} {submittedData.input2} {submittedData.input3}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default ModuleInputComponent;
