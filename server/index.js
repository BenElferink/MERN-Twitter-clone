import mongoose from 'mongoose'; // MongoDB (database)
import express from 'express'; // Backend App (server)
import dotenv from 'dotenv'; // Secures variables
import cors from 'cors'; // HTTP headers (enable requests)
import cookieParser from 'cookie-parser'; // Cookie parser
import morgan from 'morgan'; // Logs incoming requests
import authRoutes from './api/routes/authRoutes.js';
import twitterRoutes from './api/routes/twitterRoutes.js';

// initialize app
const app = express();
const origin = [
  // 'http://localhost:3000'
  'https://twitter-clone-web.herokuapp.com',
]; // allow source of requests (* --> everywhere)

// middlewares
dotenv.config();
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: '1mb', extended: false })); // body parser
app.use(express.urlencoded({ limit: '1mb', extended: false })); // url parser
app.use(cookieParser()); // cookie parser
app.use(morgan('common'));

// configure db:
const CONNECTION_URL = process.env.MONGO_URI;
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.error('❌ MongoDB connection error', error)); // listen for errors on initial connection

const db = mongoose.connection;
db.on('connected', () => console.log('✅ MongoDB connected')); // connected
db.on('disconnected', () => console.error('❌ MongoDB disconnected')); // disconnected
db.on('error', (error) => console.error('❌ MongoDB connection error', error)); // listen for errors during the session

// routes
app.get('/', (request, response, next) => response.status(200).json('<h1>Hello World!</h1>'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/twitter', twitterRoutes);
app.use(express.static('./public'));

// server is listening for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
