import express from 'express';
import { createGroupController, updateGroupController, deleteGroupController } from './group.controller.js';

const router = express.Router();

// 그룹 등록 엔드포인트
router.post('/', createGroupController);
router.put('/:groupId', updateGroupController);
router.delete('/:groupId', deleteGroupController);

export default router;
