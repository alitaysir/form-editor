import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import CreateTest from "./pages/CreateTest";
import AnswerTest from "./pages/AnswerTest";
import ViewAnswers from "./pages/ViewAnswers";
import AnswerTestPage from "./pages/AnswerTestPage";
import DeleteTest from "./pages/DeleteTest"


const App = () => {
  return (
    <div>
       <ToastContainer position="bottom-right"/>
        <Navbar />
        <Sidebar />
        <div className="ml-48 mt-16 p-4">
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/create-test" element={<CreateTest/>} />
          <Route path="/answer-test" element={<AnswerTest/>} />
          <Route path="/answer-test/:testId" element={<AnswerTestPage/>} />
          <Route path="/delete-test" element={<DeleteTest/>} />
          <Route path="/view-answers" element={<ViewAnswers/>} />

      </Routes>
      </div>
    </div>
  )
}

export default App