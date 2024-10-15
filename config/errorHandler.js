export const errorHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let message = '서버 에러가 발생했습니다.';

  // 에러 유형에 따른 상태 코드와 메시지 설정
  if (err.message === 'BAD_REQUEST') {
    statusCode = 400;
    message = '잘못된 요청입니다';
  } else if (err.message === 'FORBIDDEN') {
    statusCode = 403;
    message = '비밀번호가 틀렸습니다';
  } else if (err.message === 'NOT_FOUND') {
    statusCode = 404;
    message = '존재하지 않습니다';
  }
  console.log(message);
  // 에러 응답 전송
  res.status(statusCode).json({ message });
};
