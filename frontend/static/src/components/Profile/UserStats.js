import { useState, useEffect } from "react";

function UserStats() {
  const [userPicks, setUserPicks] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getUserPicks();
  }, []);

  const getUserPicks = async () => {
    const response = await fetch("/api_v1/picks/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setUserPicks(data);
    }
  };

  const winLossHTML = userPicks.map((pick) => pick.gameid);
  console.log({ winLossHTML });

  console.log({ userPicks });

  return (
    <div>
      <h2 className="mystatsheader">My Stats</h2>
      {winLossHTML}
    </div>
  );
}
export default UserStats;
