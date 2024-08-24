import express from 'express';
import { userRouter } from './routes/user';
import { zapRouter } from './routes/zap';
import { triggerRouter } from './routes/trigger';
import { actionRouter } from './routes/action';
import { authRouter } from './utils/auth';
import cors from 'cors';

const app = express();
app.use(express.json()); 

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));
  
app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);

app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.use("/api/v1/auth", authRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
