/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (request, response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;
  const newPatientEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  response.json(newPatientEntry);
});

export default router;
