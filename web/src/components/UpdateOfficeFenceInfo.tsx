import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL, example } from "../constants";
import MapPolygonEditor from "./GoogleMapComponents/MapPolygonEditor";
import { useQuery } from "@tanstack/react-query";
import { getOfficeFence } from "./OfficeFenceInfo";

export async function patchOfficeFence({ polygon }: any) {
  try {
    const officeId = example.officeId;
    const officeFenceId = example.officeFenceId;
    const body = {
      polygon,
    };
    console.log(polygon);
    const res = await axios.patch(
      `${apiURL}/fencing/offices/${officeId}/officeFences/${officeFenceId}`,
      body
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default function UpdateOfficeFenceInfo() {
  const [polygon, setPolygon] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["officeFenceInfo"],
    queryFn: getOfficeFence,
  });

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;

    setPolygon(data.polygon);
  }, [data]);

  return (
    <div>
      <h2 className="text-xl">Update Office Fence Info</h2>
      <MapPolygonEditor
        polygon={polygon}
        onConfirmPolygon={(value: any) => {
          console.log("Confirmed");
          setPolygon(value);
        }}
      />

      <button
        className="btn btn-primary"
        onClick={() => {
          patchOfficeFence({ polygon });
        }}
      >
        Update
      </button>
    </div>
  );
}
