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

  return (
    <>
      <main className="mainleaderboard col-md-8 offset-md-2 col-12">
        <header className="leaderboardtitles">
          <h2 className="leaderboardh2">Leaderboard</h2>
          <h3 className="leaderboardh3">*Stats as of {yesterday}</h3>
          <h4 className="leaderboardh4">
            Badges given for total correct picks
          </h4>
          <div className="badgedisplay">
            <span className="badgeRookie">Rookie</span>
            <span className="badgewins">15+</span>
            <span className="badgePro">Pro</span>
            <span className="badgewins">50+</span>
            <span className="badgeLegend">Legend</span>
            <span className="badgewins">100+</span>
            <span className="badgeHOFer">Hall of Famer</span>
            <span className="badgewins">200+</span>
          </div>
        </header>
        <table className="table">
          <thead className="table-th">
            <tr className="align">
              <th className="a b rank">Rank</th>
              <th className="a b">User</th>
              <th className="a b">Correct Picks</th>
              <th className="a b">Total Games</th>
              <th className="a b">Percentage</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {userStats.map((stat, index) => (
              <tr className="tr align">
                <td className="a rank">{index + 1}</td>
                <td className="a">
                  {stat.username === user.username ? (
                    <div className="userplusbadge">
                      <Link
                        className="linktoprofile"
                        to={`/home/${user.username}`}
                      >
                        {stat.username}{" "}
                      </Link>
                      <span className={`badge${stat.badge}`}>{stat.badge}</span>
                    </div>
                  ) : (
                    <div className="userplusbadge">
                      <Link
                        className="linktoprofile"
                        to={`/home/${stat.username}`}
                      >
                        {stat.username}
                      </Link>
                      <span className={`badge${stat.badge}`}>{stat.badge}</span>
                    </div>
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
    </>
  );
}
export default Leaderboard;
