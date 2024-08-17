import express from 'express';
import { userRouter } from './routes/user';
import { zapRouter } from './routes/zap';
import { triggerRouter } from './routes/trigger';
import { actionRouter } from './routes/action';

const app = express();

app.use(express.json()); 

app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);

app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
