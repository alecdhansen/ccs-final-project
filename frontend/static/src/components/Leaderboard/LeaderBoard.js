import "./Leaderboard.css";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [userStats, setUserStats] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getUserStats();
  }, []);

  const getUserStats = async () => {
    const response = await fetch("/api_v1/picks/stats/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setUserStats(data);
    }
  };
  console.log({ userStats });

  const statList = userStats.map((stat) => (
    <div className="main">
      <div>{stat.username}</div>/<div>{stat.total_correct_picks}</div>total
      guesses/
      <div>{stat.total_picks}</div>total games/<div>{stat.percentage}</div>%
    </div>
  ));

  return (
    <main className="row">
      <div className="col-md-8 offset-md-2 col-12 ">{statList}</div>
    </main>
  );
}
export default Leaderboard;
