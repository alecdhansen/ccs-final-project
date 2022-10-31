import { useNavigate, Routes, Route } from "react-router-dom";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Card />} />
      </Routes>
    </>
  );
}

export default App;
