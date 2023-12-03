import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Login from './Login';
import Navbar from './Navbar';
// import ModuleInputComponent_1 from './ModuleInputComponent_1';
import ModuleInputComponent from './ModuleInputComponent';
import ModuleTableComponent from './ModuleTableComponent';

// Your Firebase configuration
const firebaseConfig = {
  authDomain: 'AIzaSyBPL3uqwP5E0Sj3OypodakN-0MYdA8Zt_I',
  databaseURL: 'https://cement-price-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase and update moduleData state
    const db = firebase.database();
    const modulesRef = db.ref('modules');

    modulesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const modules = Object.keys(data).map((moduleId) => ({
          id: moduleId,
          ...data[moduleId]
        }));
        setModuleData(modules);
      }
    });

    return () => {
      // Clean up the listener when component unmounts
      modulesRef.off();
    };
  }, []);

  // --------------------------------
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Perform dummy authentication
    if (email === 'dummy@example.com' && password === 'password123') {
      setLoggedIn(true);
      return true;
    }
    return false;
  };
  //------------------------------------

  return (
    // <div className="App">
    //   <h1>Amrit Cement</h1>
    //   <ModuleInputComponent  />
    //   <ModuleTableComponent moduleData={moduleData} />
    // </div>
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/price-display"
          element={
            isLoggedIn ? (
              <>
                <ModuleInputComponent />
                <ModuleTableComponent moduleData={moduleData} />
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;