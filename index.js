import express from "express";
import cors from "cors";
import corsMiddleware from "./src/middleware/cors.js";
import notFoundMiddleware from "./src/middleware/not_found.js";
import connectDB from "./src/config/connect.js";
import authRoute from "./src/route/auth.js";

const app = express();

app.use(cors(corsMiddleware));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Fuel Management System Api"));

app.use(authRoute);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://renova213:admin123@cluster0.6iz8n7u.mongodb.net/?retryWrites=true&w=majority"
    )
      .then(() => console.log("Connected"))
      .catch((err) => {
        console.log(err);
        process.exit();
      });
    app.listen(4000, () => console.log(`Server is listening port 4000...`));
  } catch (error) {
    console.log(error);
  }
};

start();
