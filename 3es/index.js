import "dotenv/config"
import express from "express";
import {globalError} from "./src/middleware/globalError.js";
import { dbConnection } from "./dbConnection/connection.js";
import { AppError } from "./src/utils/AppError.js";
import { allRoutes } from "./src/modules/routes.js";
import cors from "cors";


const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "http://localhost:3001", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"], // Adjust as needed
}));
allRoutes(app)


dbConnection();

app.use("*", (req, res, next) => {
  next(new AppError("url not Found", 404));
});
app.use(globalError);
app.listen(port, () => console.log(`example app listening on port ${port}!`));
