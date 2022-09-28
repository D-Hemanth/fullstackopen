import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

// get route to get all the patient entries without the sensitive info like ssn
router.get('/', (_request, response) => {
  response.send(patientsService.getNonSensitiveEntries());
});

// post route to add new patient entries
router.post('/', (request, response) => {
  try {
    // Use function toNewPatientEntry that receives the request body as a parameter and returns a properly-typed NewPatientEntry object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(request.body);

    const addedPatientEntry = patientsService.addPatient(newPatientEntry);
    response.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    response.status(400).send(errorMessage);
  }
});

router.get('/:id', (request, response) => {
  // use findById method of express to find patient details using a specific id parameter
  const patient = patientsService.findById(request.params.id);

  if (patient) {
    response.send(patient);
  } else {
    response.sendStatus(404);
  }
});

export default router;
