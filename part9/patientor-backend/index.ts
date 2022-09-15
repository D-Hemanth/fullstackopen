import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_request, response) => {
  console.log("someone pinged here");
  response.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
