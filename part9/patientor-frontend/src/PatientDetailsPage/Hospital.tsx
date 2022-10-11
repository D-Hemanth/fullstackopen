import { HospitalEntry, Diagnosis } from "../types";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  const dischargeIcon = <DirectionsRunIcon />;
  return (
    <div
      key={entry.id}
      style={{
        padding: "10px",
        border: "2px solid black",
        borderRadius: "5px",
        margin: "5px",
      }}
    >
      {entry.date}
      <br></br>
      <em>{entry.description}</em>
      <br></br>
      {!entry.diagnosisCodes ? null : (
        <ul>
          {entry.diagnosisCodes?.map((code: string) => (
            <li key={code}>
              {code}{" "}
              {diagnoses?.map((diagnose) =>
                diagnose.code === code ? diagnose.name : null
              )}
            </li>
          ))}
        </ul>
      )}
      <div>
        discharge {dischargeIcon} - date: {entry.discharge.date} criteria:{" "}
        {entry.discharge.criteria}
      </div>
      <>diagnose by {entry.specialist}</>
    </div>
  );
};

export default Hospital;
