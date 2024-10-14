import express from 'express';

const app = express();

app.get('/hello', (req, res) => {});

app.listen(3000, () => console.log('Server run'));