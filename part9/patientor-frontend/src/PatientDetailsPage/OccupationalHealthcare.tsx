import { OccupationalHealthcareEntry, Diagnosis } from "../types";
import WorkIcon from "@mui/icons-material/Work";
import SickIcon from "@mui/icons-material/Sick";

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  const employerIcon = <WorkIcon />;
  const sickLeaveIcon = <SickIcon />;

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
      {entry.date} {employerIcon} {entry.employerName}
      <br></br>
      {!entry.sickLeave ? null : (
        <>
          sick leave {sickLeaveIcon} - start date: {entry.sickLeave?.startDate}{" "}
          end date: {entry.sickLeave?.endDate}
          <br></br>
        </>
      )}
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
      <>diagnose by {entry.specialist}</>
    </div>
  );
};

export default OccupationalHealthcare;
