import "./Leaderboard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//npm
import moment from "moment";

function Leaderboard() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState([]);

  const previousDay = new Date(Date.now() - 86400000);
  const yesterday = moment(previousDay).format("MMM Do, YYYY");

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

  console.log(userStats);
  return (
    <main className="mainleaderboard col-md-8 offset-md-2 col-12">
      <header className="leaderboardtitles">
        <h2 className="leaderboardh2">Leaderboard</h2>
        <h3 className="leaderboardh3">*Stats as of {yesterday}</h3>
      </header>
      <table className="table">
        <thead className="table-th">
          <tr className="align">
            <th className="a">Rank</th>
            <th className="a">User</th>
            <th className="a">Correct Picks</th>
            <th className="a">Total Games</th>
            <th className="a">Percentage</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {userStats.map((stat, index) => (
            <tr className="tr align">
              <td className="a">{index + 1}</td>
              <td className="a">
                {stat.username === user.username ? (
                  <Link className="linktoprofile" to={`/home/${user.username}`}>
                    {stat.username}
                  </Link>
                ) : (
                  <Link className="linktoprofile" to={`/home/${stat.username}`}>
                    {stat.username}
                  </Link>
                )}
              </td>
              <td className="a">{stat.total_correct_picks}</td>
              <td className="a">{stat.total_picks}</td>
              <td className="a">{stat.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Leaderboard;
