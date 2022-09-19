import patients from "../../data/patients";
import { NonSensitivePatientsEntry } from "../types";

// We can improve the code's readability by using the alternative array syntax: Array<elemType> or elemType[] i.e here Array<NonSensitiveEntries> or NonSensitiveEntries[]
const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensitiveEntries };
