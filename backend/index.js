import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();


//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS ploicy
// Option 1: Allow All Origins wuth Default of cors(*)
app.use(cors());
//option 2:  Allow custom Origins
// app.use(
//     cors({
//         origin: 'https://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Website connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to the port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
