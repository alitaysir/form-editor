// /src/pages/AnswerTest.jsx
import React from 'react';
import DisplayTests from '../components/DisplayTests'; // The component that displays the list of tests

const AnswerTest = () => {
  return (
    <div>
      <h1>Answer Test</h1>
      {/* DisplayTests component will be shown here */}
      <DisplayTests />
    </div>
  );
};

export default AnswerTest;
