import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiURL, example } from "../constants";

export async function getOffice() {
  try {
    const officeId = example.officeId;
    const res = await axios.get(`${apiURL}/fencing/offices/${officeId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default function OfficeInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["officeInfo"],
    queryFn: getOffice,
  });

  return (
    <div>
      <h2 className="text-xl">Office Info</h2>
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
