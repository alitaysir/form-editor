import express from 'express';
import { saveTestData, getAllTests, deleteAllTests} from '../controllers/testController.js';

const router = express.Router();

// Define the POST route to save test data
router.post('/create', saveTestData);
router.get('', getAllTests);
router.delete('',deleteAllTests)
export default router;
