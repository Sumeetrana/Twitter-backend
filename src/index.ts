import express from 'express';

import userRoutes from './routes/userRoute';
import tweetRoutes from './routes/tweetRoute';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world. Updated");
})

// User CRUD
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);


app.listen(3001, () => {
  console.log("Server ready");
})