import express from "express";
import { connect } from "./services/mongo.js";
import exercises from "./routes/exercises.js";
import auth, { authenticateUser } from "./routes/auth.js";
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
connect("fitness");
app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);
app.use("/api/exercises", authenticateUser, exercises);
app.get("/hello", (_, res) => {
    res.send("Hello, world!");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
