// TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have
// Note that, if we want to be able to save entries without a certain field, e.g. comment, we could set the type of the field as optional by adding ? to the type declaration
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

// let's type the Gender values using a enum type of the allowed strings, since we know what type of data should be accepted for the gender fields
// we use enums so that it is helpful in type validation when taking data from external sources when adding new patientEntry
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// When looking at the type, we can see that there are actually three kinds of entries:
// OccupationalHealthcare, Hospital and HealthCheck. This indicates we need three separate types.
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: String;
  sickLeave?: {
    startDate: String;
    endDate: String;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: String;
    criteria: String;
  };
}

// since we need three kinds of entries: OccupationalHealthcareEntry, HospitalEntry and HealthCheckEntry types so we can combine them in a union
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<PatientsEntry, "ssn" | "entries">;

// In this case, we want to exclude only one field(ssn), so it would be even better to use the Omit utility type, which we can use to declare which fields to exclude:
export type NonSensitivePatientsEntry = Omit<PatientsEntry, "ssn">;

// create a new type, newPatientEntry, for an entry that hasn't been saved yet
export type NewPatientEntry = Omit<PatientsEntry, "id">;
