import express from 'express';
import connectDB from './config/db.js';
import groupRoutes from './srcs/group/group.routes.js';
import postRoutes from './srcs/post/post.routes.js';
// import commentRoutes from './srcs/comment/comment.routes.js';
import cors from 'cors';
import { errorHandler } from './config/errorHandler.js';

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
app.use(errorHandler);

// DB 연결
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
