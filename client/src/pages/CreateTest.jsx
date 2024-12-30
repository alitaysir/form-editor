import React, { useContext } from 'react'
import Categorize from '../components/Categorize'
import Cloze from '../components/Cloze'
import Comprehension from '../components/Comprehension'
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import axios from 'axios';


const CreateTest = () => {
  const { categorizeVal, setCategorizeVal, clozeVal, setclozeVal, comprehensionVal, setComprehensionVal }=useContext(AppContext)
  

  const submittest= async ()=>{
    try {
      const data = {
        categorize: categorizeVal,
        cloze: clozeVal,
        comprehension: comprehensionVal,
      };
      const res= await axios.post(
        "http://localhost:5001/api/test/create", data);
        
      if (res.status === 201) {
          toast.success('Test created successfully!');
          console.log(res.data)
          // Clear the values in context after successful submission
          setCategorizeVal(null);
          setComprehensionVal(null);
          setclozeVal(null);
        }
      
    } catch (error) {
      console.error(error);
      toast.error("error creating test")
    }
  }
  return (
    <div>
        <Categorize/>
        <Cloze/>
        <Comprehension/> 
        <div className='flex items-center justify-center'>
          <button onClick={submittest} className='bg-green-600 px-4 py-2 rounded'>Submit Test</button>
        </div>
    </div>
  )
}

export default CreateTest