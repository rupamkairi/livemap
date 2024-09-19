import OfficeFenceInfo from "../components/OfficeFenceInfo";
import OfficeInfo from "../components/OfficeInfo";
import UpdateOfficeFenceInfo from "../components/UpdateOfficeFenceInfo";

export default function OfficeFences() {
  return (
    <div>
      <h1 className="text-2xl font-black">Office Fences</h1>
      <br />

      <OfficeInfo />
      <br />

      <OfficeFenceInfo />
      <br />

      <UpdateOfficeFenceInfo />
      <br />
    </div>
  );
}
