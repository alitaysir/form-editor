import TestData from '../models/TestData.js';

// Controller to handle saving test data
export const saveTestData = async (req, res) => {
  try {
    const { categorize, cloze, comprehension } = req.body;

    // Create a new TestData instance
    const newTestData = new TestData({
      categorize,
      cloze,
      comprehension,
    });

    // Save the data to the database
    await newTestData.save();

    // Respond with success message and saved data
    res.status(201).json({ message: 'Data saved successfully', data: newTestData });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await TestData.find();  // Fetch all test data
    res.status(200).json(tests);  // Send back the fetched data as a response
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Failed to retrieve tests' });
  }
};

export const deleteAllTests = async (req, res) => {
  try {
    await TestData.deleteMany({});  // This will delete all documents in the collection
    res.status(200).json({ message: 'All tests have been deleted' });
  } catch (error) {
    console.error('Error deleting tests:', error);
    res.status(500).json({ message: 'Failed to delete tests' });
  }
};