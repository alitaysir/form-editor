import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AnswerTestPage = () => {
  const { testId } = useParams(); // Get the testId from the URL
  const { tests, setAnswers } = useContext(AppContext); // Access tests and setAnswers from context
  const [test, setTest] = useState(null); // State to store the current test data
  const [userAnswers, setUserAnswers] = useState({}); // Store answers for this test
  const navigate = useNavigate(); // Navigate after submitting the answers

  // useEffect to load the test based on testId
  useEffect(() => {
    const selectedTest = tests.find(t => t._id === testId); // Find the selected test by its ID
    if (selectedTest) {
      setTest(selectedTest); // Set the test in the state
    }
  }, [testId, tests]);

  // Handle input changes for answers
  const handleInputChange = (questionId, answer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handle form submission of answers
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://form-editor-ssql.onrender.com/api/answer/submit-answers', // Backend API endpoint
        { 
          testId, // testId from URL
          userAnswers // user answers collected
        }
      );

      if (response.status === 200) {
        toast.success('Answers Submitted Successfully!');
        navigate('/view-answers'); // Navigate to the "view answers" page after submission
      }
    } catch (error) {
      toast.error('Error submitting answers');
      console.error('Error submitting answers:', error);
    }
  };

  return (
    test ? (
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">{test.categorize.desc}</h2>

        {/* Categorize Section */}
        {test.categorize && test.categorize.cat && (
          <div className="mb-6">
            <h3 className="text-2xl font-medium mb-4">Categorize</h3>
            <div className="mb-3">
              <h4 className="text-lg font-semibold">Options</h4>
              <div className="flex space-x-4">
                {test.categorize.itm.map((item, idx) => (
                  <div key={idx} className="bg-green-50 px-3 py-1.5 rounded mb-2 cursor-pointer w-32 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Categories</h4>
              {test.categorize.cat.map((category, idx) => (
                <div key={idx} className="mb-4">
                  <div className="bg-yellow-50 p-4 rounded mb-2">
                    <h5 className="text-md font-medium">{category}</h5>
                    <input
                      type="text"
                      value={userAnswers[`cat-${idx}`] || ''}
                      onChange={(e) => handleInputChange(`cat-${idx}`, e.target.value)}
                      className="w-full p-2 mt-2 border rounded bg-blue-50"
                      placeholder="Type your answer here"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cloze Section */}
        {test.cloze && test.cloze.sentence && (
          <div className="mb-6">
            <h3 className="text-2xl font-medium mb-4">Cloze</h3>
            <p className="text-lg mb-4">{test.cloze.sentence}</p>
            <div className="bg-green-50 p-4 mb-4 rounded">
              <h5 className="text-md font-medium mb-2">Options</h5>
              {test.cloze.options.map((option, idx) => (
                <div key={idx} className="bg-green-50 p-4 rounded mb-2">
                  <label className="block">{option}</label>
                  <input
                    type="text"
                    value={userAnswers[`cloze-${idx}`] || ''}
                    onChange={(e) => handleInputChange(`cloze-${idx}`, e.target.value)}
                    className="w-full p-2 mt-2 border rounded bg-blue-50"
                    placeholder="Your answer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comprehension Section */}
        {test.comprehension && test.comprehension.passage && (
          <div className="mb-6">
            <h3 className="text-2xl font-medium mb-4">Comprehension</h3>
            <p className="mb-4">{test.comprehension.passage}</p>
            {test.comprehension.questions.map((question, idx) => (
              <div key={question._id} className="mb-6 p-6 bg-green-50 rounded-lg shadow-lg">
                <h4 className="text-xl font-medium mb-2">{question.questionText}</h4>
                <div className="space-y-4">
                  {question.options && question.options.map((option, i) => (
                    <div key={i} className="flex items-center bg-blue-50">
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                        checked={userAnswers[question._id] === option}
                        onChange={(e) => handleInputChange(question._id, e.target.value)}
                        className="mr-2 bg-blue-50"
                      />
                      <label className="text-lg">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-[10%] py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </div>
    ) : (
      <p className="text-center text-xl">Loading test...</p>
    )
  );
};

export default AnswerTestPage;
