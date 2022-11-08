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
      console.log(data);
    }
  };

  return (
    <main className="row">
      <div className="col-md-8 offset-md-2 col-12">hello</div>
    </main>
  );
}
export default Leaderboard;
