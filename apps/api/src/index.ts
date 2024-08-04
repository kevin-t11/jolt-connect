import express from 'express';
import { userRouter } from './routes/user';
import { zapRouter } from './routes/zap';

const app = express();

app.use(express.json()); 

app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
