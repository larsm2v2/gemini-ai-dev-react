const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
require("dotenv").config();
const { GenerativeModel } = require("@google/generative-ai");
const model = new GenerativeModel({
  projectId: process.env.PROJECT_ID,
  location: process.env.LOCATION,
  modelId: process.env.MODEL_ID,
});

app.post("/gemini", async (req, res) => {
  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = req.body.message;
  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
