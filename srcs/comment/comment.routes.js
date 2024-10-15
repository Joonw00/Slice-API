import express from 'express';
import { addCommentController, deleteCommentController, getCommentListController } from './comment.controller.js';

const router = express.Router();

router.post('/:postId', addCommentController);
router.delete('/:commentId', deleteCommentController);
router.get('/:postId', getCommentListController);

export default router;
