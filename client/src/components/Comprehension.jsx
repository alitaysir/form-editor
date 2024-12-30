import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Comprehension = () => {
  const { comprehensionVal, setComprehensionVal } = useContext(AppContext);
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), questionText: "", options: [{ text: "", correct: false }], correctIndex: null },
    ]);
  };

  const updateQuestion = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, questionText: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { text: "", correct: false }],
            }
          : q
      )
    );
  };

  const updateOption = (questionId, index, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? { ...opt, text: value } : opt
              ),
            }
          : q
      )
    );
  };

  const markCorrectOption = (questionId, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) => ({
                ...opt,
                correct: i === index,
              })),
              correctIndex: index,
            }
          : q
      )
    );
  };

  const saveData = () => {
    const data = {
      passage,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((opt) => opt.text),
        correctIndex: q.correctIndex,
      })),
    };
    setComprehensionVal(data);
    //console.log(comprehensionVal)
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="text-2xl font-semibold">Comprehension Component</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Passage:</label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          rows="5"
          style={{ width: "100%", marginTop: "5px", backgroundColor: "#f9f9f9", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
      </div>
      <h3>Questions</h3>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={q.questionText}
            onChange={(e) => updateQuestion(q.id, e.target.value)}
            placeholder="Enter question"
            style={{ width: "100%", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            className="bg-blue-100"
          />
          {q.options.map((opt, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => updateOption(q.id, index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                style={{ flexGrow: 1, marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                className="bg-green-50"
              />
              <input
                type="radio"
                name={`correct-${q.id}`}
                checked={opt.correct}
                onChange={() => markCorrectOption(q.id, index)}
              />
            </div>
          ))}
          <button onClick={() => addOption(q.id)} style={{ marginTop: "10px",  backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            className="px-2 py-1 text-white">
            + Option
          </button>
        </div>
      ))}
      <button onClick={addQuestion} style={{ display: "block", marginTop: "20px",  backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        className="px-2 py-1 text-white">
        + Question
      </button>
      <button onClick={saveData} style={{ display: "block", marginTop: "20px",  backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        className="px-2 py-1 text-white">
        Save
      </button>
    </div>
  );
};

export default Comprehension;
