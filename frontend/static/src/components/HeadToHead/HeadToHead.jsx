import "./HeadToHead.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
//npm
import moment from "moment";

function HeadToHead() {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenges, setSelectedChallenges] = useState([challenges]);
  const { user } = useAuth();

  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  const currentDay = yyyy + "-" + mm + "-" + dd;

  const previousDay = new Date(Date.now() - 86400000);
  const yesterday = moment(previousDay).format("YYYY-MM-DD");

  console.log({ yesterday });

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const getChallenges = async () => {
    const response = await fetch(`/api_v1/challenges/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setChallenges(data);
      setSelectedChallenges(data);
    }
  };

  const yesterdaysChallenges = challenges.filter(
    (challenge) => challenge.date === yesterday
  );
  const todaysChallenges = challenges.filter(
    (challenge) => challenge.date === currentDay
  );

  console.log({ yesterdaysChallenges });
  console.log({ todaysChallenges });
  console.log({ challenges });

  return (
    <>
      <header className="titles col-md-8 offset-md-2 col-10 offset-1">
        <h2>Let's Go Head To Head!</h2>
        <h3 style={{ textDecoration: "underline" }}>The Rules</h3>
        <p>Challenge another user</p>
      </header>
      {challenges.length === 0 ? (
        <section className="findanopponentsection">
          <h4 className="nochallenges">No challenges yet!</h4>
          <Link to="/home/leaderboard">
            <button className="findopponentbtn">Find an opponent</button>
          </Link>
        </section>
      ) : (
        <section className="col-md-8 offset-md-2 col-10 offset-1 challenges">
          <h3 className="mychallengestitle">My Challenges</h3>
          <div className="filters">
            <button
              className="filterbtns yesterdaych"
              onClick={() => setSelectedChallenges(yesterdaysChallenges)}
            >
              Yesterday
            </button>
            <button
              className="filterbtns todaych"
              onClick={() => setSelectedChallenges(todaysChallenges)}
            >
              Today
            </button>
            <button
              className="filterbtns allch"
              onClick={() => setSelectedChallenges(challenges)}
              autoFocus
            >
              All
            </button>
          </div>
          <div className="challengesbox">
            {selectedChallenges.map((challenge) => (
              <section className="challengecard">
                <time className="challengedate col-4">
                  {moment(challenge.date).format("MMM DD, YYYY")}
                </time>
                <div className="challengeinfo col-8">
                  {user?.username === challenge.challenger_username ? (
                    <div>
                      <span className="matchup">Opponent:</span>
                      {/* {challenge.challenger_username} vs{" "} */}
                      {challenge.opponent_username}
                      <span className="result">Result:</span>
                      {challenge.winner === null ? (
                        <span className="winner">Challenge in progress...</span>
                      ) : (
                        <span className="winner">{challenge.winner}</span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="matchup">Opponent:</span>
                      {/* {challenge.opponent_username} vs{" "} */}
                      {challenge.challenger_username}
                      <span className="result">Result:</span>
                      {challenge.winner === null ? (
                        <span className="winner">Challenge in progress...</span>
                      ) : (
                        <span className="winner">{challenge.winner}</span>
                      )}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export default HeadToHead;
