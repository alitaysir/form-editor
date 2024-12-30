import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAnswersPage = () => {
  const [answers, setAnswers] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchAnswersAndTests = async () => {
      try {
        const answerResponse = await axios.get('https://form-editor-ssql.onrender.com/api/answer/all-answers');
        setAnswers(answerResponse.data);

        const testResponse = await axios.get('https://form-editor-ssql.onrender.com/api/test');
        console.log("Fetched Test Data:", testResponse.data);
        setTests(testResponse.data); // Store tests to match with answers
      } catch (error) {
        console.error('Error fetching answers or test data:', error.message);
      }
    };

    fetchAnswersAndTests();
  }, []);

  const handleDeleteAllAnswers = async () => {
    try {
      const response = await axios.delete('https://form-editor-ssql.onrender.com/api/answer/delete-all-answers');
      if (response.status === 200) {
        setAnswers([]); // Clear the answers in the frontend
        alert('All answers have been deleted.');
      }
    } catch (error) {
      console.error('Error deleting answers:', error.message);
      alert('Error deleting answers');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">All Answers</h2>
      <div>
        {answers.length === 0 ? (
          <p>No answers found</p>
        ) : (
          answers.map((answer, idx) => {
            // Find the corresponding test using testId
            const test = tests.find(t => t._id === answer.testId);
            return (
              <div key={idx} className="mb-6 p-6 bg-green-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-medium mb-4">
                  Test: {test ? test.categorize.desc : "Test not found"}
                </h3>

                {/* Categorize and Cloze sections */}
                {test && (test.categorize || test.cloze) && (
                  <div>
                    {/* Categorize Section */}
                    {test.categorize && test.categorize.cat && (
                      <div>
                        <h4 className="text-lg font-semibold">Categorize</h4>
                        {test.categorize.cat.map((category, idx) => (
                          <div key={idx} className="mb-4">
                            <strong>{category}:</strong>
                            <div>{answer.userAnswers[`cat-${idx}`]}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cloze Section */}
                    {test.cloze && test.cloze.options && (
                      <div>
                        <h4 className="text-lg font-semibold">Cloze</h4>
                        {/* Display Cloze Statement */}
                        <p className="mb-4">{test.cloze.sentence}</p>
                        {test.cloze.options.map((option, idx) => (
                          <div key={idx} className="mb-4">
                            <strong>{option}:</strong>
                            <div>{answer.userAnswers[`cloze-${idx}`]}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Comprehension Section */}
                {test && test.comprehension && test.comprehension.questions && (
                  <div>
                    <h4 className="text-lg font-semibold">Comprehension</h4>
                    {test.comprehension.questions.map((question, idx) => {
                      return (
                        <div key={question._id} className="mb-4">
                          <strong>{question.questionText}:</strong>
                          <div>{answer.userAnswers[question._id]}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* <button
        onClick={handleDeleteAllAnswers}
        className="w-full py-3 mt-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
      >
        Delete All Answers
      </button> */}
    </div>
  );
};

export default ViewAnswersPage;
