import { useNavigate, Routes, Route } from "react-router-dom";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import Login from "../Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="card" element={<Card />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
