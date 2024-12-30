import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';  // Ensure the database is connected properly
import testRoutes from "./routes/testRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

const PORT = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
await connectDB();

// API Routes
app.use('/api/test', testRoutes);
app.use('/api/answer', answerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send("API Working let's go!");
});

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
