/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://todoapp:todoapp@cluster0.1xvop.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to DB!!");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to the port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("UnhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected.. Server shutting down.", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("UncaughtException", (err) => {
  console.log("Uncaught Exception Detected.. Server shutting down.", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log("Sigterm signal received.. Server shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SigINT signal received.. Server shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise"));

// uncaught Exception error
// throw new Error("I forgot to handle this local deployment error");

// signal termination sigterm

// Three types of error handling :
// 1. unhandled rejection error
// 2. uncaught Exception error
// 3. signal termination sigterm
