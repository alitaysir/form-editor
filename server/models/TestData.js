import mongoose from 'mongoose';

// Define Mongoose schema for the test data
const testSchema = new mongoose.Schema({
  categorize: {
    desc: String,
    cat: [String],
    itm: [String],
  },
  cloze: {
    sentence: String,
    options: [String],
  },
  comprehension: {
    passage: String,
    questions: [
      {
        questionText: String,
        options: [String],
        correctIndex: Number,
      },
    ],
  },
});

// Export the Mongoose model
const TestData = mongoose.model('TestData', testSchema);
export default TestData;
