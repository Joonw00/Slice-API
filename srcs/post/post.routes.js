import express from 'express';
import { createPostController, updatePostController, deletePostController } from './post.controller.js';
import { getPostListController, getPostDetailController } from './postSearch.controller.js';

const router = express.Router();

router.post('/:groupId', createPostController);
router.put('/:postId', updatePostController);
router.delete('/:postId', deletePostController);


router.get('/group/:groupId', getPostListController);
router.get('/:postId', getPostDetailController);

export default router;
