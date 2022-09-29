import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NewPatientEntry,
  NonSensitivePatientsEntry,
  PatientsEntry,
} from "../types";

// We can improve the code's readability by using the alternative array syntax: Array<elemType> or elemType[] i.e here Array<NonSensitiveEntries> or NonSensitiveEntries[]
// In getNonSensitiveEntries, we are returning the complete patient entries, and no error is given despite typing! because TypeScript only checks whether we have all of the required fields or not, but excess fields are not prohibited.
// If we were now to return all of the patientEntries from the getNonSensitiveEntries function to the frontend, we would actually be leaking the unwanted fields to the requesting browser even though our types(using omit) seem to imply otherwise!
// Because TypeScript doesn't modify the actual data but only its type, we need to exclude the fields ourselves
const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

// create a new type for entry NewPatientEntry which doesn't include id like in PatientsEntry
const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  // create unique ids of type string using the uuid library
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatientEntry = {
    id: id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

// add findById function to patientService
const findById = (id: string): PatientsEntry | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default { getNonSensitiveEntries, addPatient, findById };
