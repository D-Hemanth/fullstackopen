import express from 'express';
const app = express();

//  to get rid of an unused variable error, you can prefix it with an underscore to inform the compiler you have thought about it, Let's rename the req variable to _req
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})