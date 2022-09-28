import { NewPatientEntry, Gender } from './types';

// due to the fact that the unknown type does not allow any operations in toNewPatientEntry, so accessing the fields is not possible for unknown object We can fix this by destructuring the fields to variables of the type unknown as follows
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

// unknown is the ideal type for our kind of situation of input validation but since unknown doesn't allow access to fields we use type Fields with destructuring
const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newEntry;
};

// The string validation function is a type guard That means it is a function which returns a boolean and which has a type predicate(i.e. parameterName is Type) as the return type
// There are two different ways to create string objects in JavaScript which both work a bit differently with respect to the typeof and instanceof operators: const a = "I'm a string primitive"; const b = new String("I'm a String Object");
// typeof a; --> returns 'string' -- typeof b; --> returns 'object' -- a instanceof String; --> returns false -- b instanceof String; --> returns true
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// To validate the name field, we need to check that it exists, and to ensure that it is of the type string.
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

// Parsing and validating the date object which is a string since we check with isString first hence we don't use type guard
const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

// To validate the ssn field, we need to check that it exists, and to ensure that it is of the type string.
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

// Parsing and validating the gender object using Gender enums type object
// Notice that we use param as 'any' instead of string if we use string, includes check would not compile,
// By allowing any as a parameter, the function can be used with confidence knowing that whatever we might feed to it, the function always tells us whether the variable is a valid gender or not.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// To validate the occupation field, we need to check that it exists, and to ensure that it is of the type string.
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export default toNewPatientEntry;
