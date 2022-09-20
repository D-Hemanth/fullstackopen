import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const app = express();
import cors from 'cors';

// In order to parse the incoming data we must have the json middleware
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

// We'll route all diagnoses requests to prefix /api/diagnoses to that specific router, here diagnosesRouter
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
