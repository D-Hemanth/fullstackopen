import { setPatientList } from "../state";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailsPage = () => {
  const [{ confidentialPatientInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | undefined>();
  const [error, setError] = React.useState<string | undefined>();

  // use useeffect with axios to fetch the data from /api/patients/:id & /api/diagnoses endpoints defined in routes patient-backend
  React.useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        // console.log("patient data", patient);

        // use action creator setPatientList defined in reducer to dispatch the action
        dispatch(setPatientList(patient));
        setPatient(patient);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(
            String(e?.response?.data?.error) || "Unrecognized axios error"
          );
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    const getDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        // console.log('diagnoses data', diagnoses);

        // use action creator setDiagnosisList defined in reducer to dispatch the action
        dispatch(setDiagnosisList(diagnoses));
        setDiagnoses(diagnoses);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(
            String(e?.response?.data?.error) || "Unrecognized axios error"
          );
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    // if id has a valid input other than null or undefined then only use it to index into cofidentialPatientInfo array
    if (id) {
      if (confidentialPatientInfo[id]) {
        setPatient(confidentialPatientInfo[id]);
        void getDiagnoses();
      } else {
        void getPatient();
      }
    }
  }, [id, dispatch, confidentialPatientInfo]);

  // Based on the gender type attach a material UI gender icon after the name
  let iconName;

  if (patient) {
    switch (patient.gender) {
      case "male":
        iconName = <MaleIcon />;
        break;
      case "female":
        iconName = <FemaleIcon />;
        break;
      default:
        iconName = <TransgenderIcon />;
    }
  }

  if (!patient) return <div>Loading...</div>;
  // console.log('patient data from api', patient);
  // console.log('diagnoses data from api', diagnoses);

  return (
    <div>
      {error && (
        <div style={{ padding: "10px", border: "2px solid red" }}>{error}</div>
      )}
      <h2>
        {patient.name} {iconName}
      </h2>
      <>
        ssh: {patient.ssn}
        <br></br>
        occupation: {patient.occupation}
        <div>
          <h3>Entries</h3>
          {patient.entries.map((entry, i) => (
            <div key={i}>
              {patient.entries.length === 0 ? null : (
                <EntryDetails entry={entry} diagnoses={diagnoses} />
              )}
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default PatientDetailsPage;
