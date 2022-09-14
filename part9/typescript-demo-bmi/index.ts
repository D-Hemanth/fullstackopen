import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import {
  calculateExercises,
  parseExerciseArguments,
} from './exerciseCalculator';
const app = express();

// In order to access the POST data easily, we need the help of the express json-parser that is taken to use with following command
app.use(express.json());

//  to get rid of an unused variable error, you can prefix it with an underscore to inform the compiler you have thought about it, Let's rename the req variable to _req
app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

// add a bmi query route to get the bmi of person by going to the link - http://localhost:3002/bmi?height=180&weight=72
app.get('/bmi', (request, response) => {
  // get the height & weight from the query string of the url address
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if (!height || !weight) {
    response.status(400);
    response.send({ error: 'malformatted parameters' });
  } else {
    try {
      const { heightInCm, weightInKg } = parseBmiArguments(height, weight);

      const bmi = calculateBmi(heightInCm, weightInKg);
      response.send({
        weight: weightInKg,
        height: heightInCm,
        bmi: bmi,
      });
    } catch (error) {
      response.status(400);
      response.send({ error: error.message });
    }
  }
});

// add exercise calculator route using post method to get the exercise details of person, you can test this using restclient
app.post('/exercises', (request, response) => {
  const dailyExercises = request.body.daily_exercises;
  const dailyTarget = request.body.target;

  if (!dailyExercises || !dailyTarget) {
    response.status(400);
    response.send({ error: 'daily_exercises or target Parameters Missing' });
  }

  try {
    const { target, dailyTrainingHours } = parseExerciseArguments(
      dailyTarget,
      dailyExercises
    );

    const exercisesCalculatorResponse = calculateExercises(
      target,
      dailyTrainingHours
    );
    response.send(exercisesCalculatorResponse);
  } catch (error) {
    response.status(400);
    response.send({ error: error.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
