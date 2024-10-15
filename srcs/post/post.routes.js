import express from 'express';
import { createPostController } from './post.controller.js';

const router = express.Router();

// 게시글 생성 라우트
router.post('/:groupId', createPostController);

export default router;
