// TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have
// Note that, if we want to be able to save entries without a certain field, e.g. comment, we could set the type of the field as optional by adding ? to the type declaration
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// In this case, we want to exclude only one field(ssn), so it would be even better to use the Omit utility type, which we can use to declare which fields to exclude:
export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

// create a new type, newPatientEntry, for an entry that hasn't been saved yet
export type NewPatientEntry = Omit<PatientsEntry, 'id'>;
