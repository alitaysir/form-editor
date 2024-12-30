import express from 'express';
import { saveAnswers, getAllAnswers,deleteAllAnswers } from '../controllers/answerController.js';

const router = express.Router();

// Route to save answers
router.post('/submit-answers', saveAnswers);

// Route to get all answers
router.get('/all-answers', getAllAnswers);

router.delete('/delete-all-answers', deleteAllAnswers);

export default router;
