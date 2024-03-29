import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'FETCHED_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'FETCHED_PATIENT':
      return {
        ...state,
        confidentialPatientInfo: {
          ...state.confidentialPatientInfo,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ [diagnosis.code]: diagnosis, ...memo }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patient: Patient): Action => {
  return {
    type: 'FETCHED_PATIENT',
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosisCodes: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisCodes };
};
