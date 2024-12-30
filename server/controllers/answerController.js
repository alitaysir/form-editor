import Answer from "../models/AnswerModel.js";
import TestData from "../models/TestData.js";

// Controller to save answers
export const saveAnswers = async (req, res) => {
  const { testId, userAnswers } = req.body;

  if (!testId || !userAnswers) {
    return res.status(400).json({ message: 'Test ID and answers are required' });
  }

  try {
    // Check if test exists
    const test = await TestData.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create new answer document
    const newAnswer = new Answer({
      testId,
      userAnswers,
    });

    // Save answer to the database
    await newAnswer.save();
    return res.status(200).json({ message: 'Answers saved successfully', data: newAnswer });
  } catch (error) {
    console.error('Error saving answers:', error.message); // Logging the error for debugging
    return res.status(500).json({ message: 'Error saving answers', error: error.message });
  }
};

// Controller to retrieve all answers
export const getAllAnswers = async (req, res) => {
  try {
    // Retrieve all answers from the database and populate testId with test data
    const answers = await Answer.find();
    return res.status(200).json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error.message);  // Logging the error
    return res.status(500).json({ message: 'Error fetching answers', error: error.message });
  }
};

export const deleteAllAnswers = async (req, res) => {
  try {
    // Delete all answer documents from the database
    await Answer.deleteMany({});
    return res.status(200).json({ message: 'All answers deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting answers' });
  }
};