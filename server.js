const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://mern-notes-app-qi1n.onrender.com'
}));
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db; listening');
        });
    })
    .catch((error) => {
        console.log(error);
    })