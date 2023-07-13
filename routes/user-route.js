import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/userControllerGit.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload',upload.single('image'),uploadFile);
   

export default router;