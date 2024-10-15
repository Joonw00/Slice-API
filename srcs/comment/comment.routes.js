import express from 'express';
import { addCommentController, deleteCommentController } from './comment.controller.js';

const router = express.Router();

router.post('/:postId', addCommentController);
router.delete('/:commentId', deleteCommentController);

export default router;
