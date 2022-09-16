import diagnoses from "../../data/diagnose";

import { DiagnosesEntry } from "../types";

const getEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

export default { getEntries };
