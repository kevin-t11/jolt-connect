import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user';
import { zapRouter } from './routes/zap';

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use('api/v1/user', userRouter);
app.use('api/v1/zap', zapRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});