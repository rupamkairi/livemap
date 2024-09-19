import { Link, Outlet, Route, Routes } from "react-router-dom";
import OfficeFences from "./pages/OfficeFences";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<EmptyPage />} />
          <Route path="office-fences" element={<EmptyLayout />}>
            <Route index element={<OfficeFences />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function EmptyLayout() {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}

function EmptyPage() {
  return (
    <div>
      <p>Links</p>
      <br />
      <Link to="/office-fences">Office Fences</Link>
    </div>
  );
}
