import { Diagnosis, HealthCheckEntry } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const HealthCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  let color;

  switch (entry.healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      null;
  }

  const healthIconName = <FavoriteIcon style={{ color: color }} />;
  const hospitalIcon = <MedicalInformationIcon />;
  // console.log("diagnoses value in HealthCheck component", diagnoses);

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
      {entry.date} {hospitalIcon}
      <br></br>
      <em>{entry.description}</em>
      <br></br>
      {healthIconName}
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
      <br></br>
      <>diagnose by {entry.specialist}</>
    </div>
  );
};

export default HealthCheck;
