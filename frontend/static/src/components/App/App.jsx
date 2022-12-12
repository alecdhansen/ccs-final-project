import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";
import { useAuth } from "../../hooks/useAuth";
import Card from "../Card/Card";
import UnprotectedLayout from "./UnprotectedLayout";
import LoginHome from "../Login/LoginHome";
import Fof from "./Fof";
import Register from "../Login/Register";
import ProfilePage from "../Profile/ProfilePage";
import Leaderboard from "../Leaderboard/LeaderBoard";
import HeadToHead from "../HeadToHead/HeadToHead";
import UserInfo from "../Users/UserInfo";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route element={<UnprotectedLayout />}>
          <Route path="/" element={<LoginHome />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/home" element={<ProtectedLayout />}>
          <Route path="games" element={<Card />} />
          <Route path={user?.username} element={<ProfilePage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="headtohead" element={<HeadToHead />} />
          <Route path=":username" element={<UserInfo />} />
        </Route>
        <Route path="*" element={<Fof />} />
      </Routes>
    </>
  );
}

export default App;
