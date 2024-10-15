import express from 'express';
import { createPostController, updatePostController, deletePostController } from './post.controller.js';

const router = express.Router();

// 게시글 생성 라우트
router.post('/:groupId', createPostController);
router.put('/:postId', updatePostController);
router.delete('/:postId', deletePostController);

export default router;
