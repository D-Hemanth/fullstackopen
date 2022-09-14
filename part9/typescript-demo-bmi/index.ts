import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
const app = express();

//  to get rid of an unused variable error, you can prefix it with an underscore to inform the compiler you have thought about it, Let's rename the req variable to _req
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// add a bmi query route to get the bmi of person by going to the link - http://localhost:3002/bmi?height=180&weight=72
app.get('/bmi', (req, res) => {
  // get the height & weight from the query string of the url address
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
  } else {
    try {
      const { heightInCm, weightInKg } = parseBmiArguments(height, weight);

      const bmi = calculateBmi(heightInCm, weightInKg);
      res.send({
        weight: weightInKg,
        height: heightInCm,
        bmi: bmi,
      });
    } catch (error) {
      res.status(400);
      res.send({ error: error.message });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
