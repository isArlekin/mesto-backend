import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import auth from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';

const port = process.env.PORT || '3000';
const mongoURI = process.env.MONGO_CONNECTION_URI || '';
const app = express();

mongoose.connect(mongoURI).catch(() => {
  console.error('Could not connect to MongoDB');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mesto app listening on port ${port}`);
});
