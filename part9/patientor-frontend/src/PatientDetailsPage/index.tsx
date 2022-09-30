import { setPatientList } from "../state";

const PatientDetailsPage = () => {
  const [{ confidentialPatientInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [error, setError] = React.useState<string | undefined>();

  // use useeffect with axios to fetch the data from /api/patients/:id endpoint defined in routes patient-backend
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
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    };

    // if id has a valid input other than null or undefined then only use it to index into cofidentialPatientInfo array
    if (id) {
      if (confidentialPatientInfo[id]) {
        setPatient(confidentialPatientInfo[id]);
      } else {
        void getPatient();
      }
    }
  }, [id, dispatch, confidentialPatientInfo]);

  // Based on the gender type attach a material UI gender icon after the name
  let iconName;

  if (patient) {
    switch (patient.gender) {
      case 'male':
        iconName = <MaleIcon />;
        break;
      case 'female':
        iconName = <FemaleIcon />;
        break;
      default:
        iconName = <TransgenderIcon />;
    }
  }

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      {error && (
        <div style={{ padding: '10px', border: '2px solid red' }}>{error}</div>
      )}
      <h2>
        {patient.name} {iconName}
      </h2>
      <>
        ssh: {patient.ssn}
        <br></br>
        occupation: {patient.occupation}
      </>
    </div>
  );
};

export default PatientDetailsPage;
