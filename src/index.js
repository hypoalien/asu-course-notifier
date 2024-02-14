// Import the Express framework module
import express from "express";

// Import the checkCourse function from the course controller module
import { checkCourse } from './controllers/course';

// Create an instance of the Express application
const app = express();

// Define a route for handling cron job requests to check course availability
// The '/cron' route is used to trigger the checkCourse function
app.use('/cron', checkCourse);
