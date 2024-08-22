import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./Router/user.router.js";
import instructorRouter from "./Router/instructor.router.js";

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MongoUrl)
  .then(() => {
    console.log("Database connected successfully");
    app.use("/user", userRouter);
    app.use("/instructor", instructorRouter);

    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });