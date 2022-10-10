import React, { createContext, useContext, useReducer } from 'react';
import { Diagnosis, Patient } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  confidentialPatientInfo: { [id: string]: Patient };
  diagnosisList: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  confidentialPatientInfo: {},
  diagnosisList: {},
};

// createContext creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

// the useReducer hook used to create the state and the dispatch function, and pass them on to the context provider
export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// the components that need to access the state or dispatcher use useStateValue function
export const useStateValue = () => useContext(StateContext);
