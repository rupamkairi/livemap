import axios from "axios";
import { apiURL, example } from "../constants";
import { useQuery } from "@tanstack/react-query";

async function getOfficeFenceInfo() {
  try {
    const officeId = example.officeId;
    const officeFenceId = example.officeFenceId;
    const res = await axios.get(
      `${apiURL}/fencing/offices/${officeId}/officeFences/${officeFenceId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default function OfficeFenceInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["officeFenceInfo"],
    queryFn: getOfficeFenceInfo,
  });

  return (
    <div>
      <h2 className="text-xl">Office Fence Info</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-sm">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
