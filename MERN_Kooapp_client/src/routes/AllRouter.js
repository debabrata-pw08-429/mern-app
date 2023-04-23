// Import Modules_
import { Routes, Route } from "react-router-dom";

// Import Components_
import Admin from "../components/Admin";

// Export Router Component_
function AllRouter() {
  return (
    <Routes>
      <Route path="/" element={<Admin />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
}

export default AllRouter;
