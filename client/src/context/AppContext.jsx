// /src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [categorizeVal, setCategorizeVal] = useState(null);
  const [clozeVal, setclozeVal] = useState(null);
  const [comprehensionVal, setComprehensionVal] = useState(null);
  const [tests, setTests] = useState([]); // Store the list of tests
  const [answers, setAnswers] = useState({}); // Store the answers of the user

  // Fetch all tests from the backend when AppContext is loaded
  useEffect(() => {
    axios.get("https://form-editor-ssql.onrender.com/api/test")
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tests:", error);
      });
  }, []);

  const value = {
    categorizeVal,
    setCategorizeVal,
    clozeVal,
    setclozeVal,
    comprehensionVal,
    setComprehensionVal,
    tests,
    setTests,
    answers,
    setAnswers, // Allow modifying answers in any component
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
