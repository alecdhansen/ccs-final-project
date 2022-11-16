import "./HeadToHead.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
//npm
import moment from "moment";
//React Icons
import { HiUsers } from "react-icons/hi";

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

  return (
    <>
      <header className="titles col-md-8 offset-md-2 col-10 offset-1">
        <h2
          style={{ marginTop: "15px", fontSize: "30px" }}
          className="subtitles"
        >
          Let's Go Head To Head!
        </h2>
        <h3
          style={{
            textDecoration: "underline",
          }}
          className="subtitles"
        >
          The Rules
        </h3>
        <p className="subtitles subtext">
          Make your picks for today, challenge another user, and come back
          tomorrow to see how you stacked up against your opponent!
        </p>
      </header>
      <section className="findanopponentsection">
        <h2 className="mychallengestitle findanopponent">Find An Opponent</h2>
        <Link to="/home/leaderboard" style={{ textDecoration: "none" }}>
          <button className="findopponentbtn userlistbtn">
            User List <HiUsers style={{ marginLeft: "5px" }} />
          </button>
        </Link>
      </section>
      {challenges.length === 0 ? (
        <section className="findanopponentsection">
          <h4 className="nochallenges">No challenges yet!</h4>
          <Link to="/home/leaderboard">
            <button className="findopponentbtn">Find an opponent</button>
          </Link>
        </section>
      ) : (
        <section className="col-md-10 offset-md-1  col-12 challenges">
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
                <div className="challengedate col-3">
                  <span>{moment(challenge.date).format("MMM DD, YYYY")}</span>
                  {challenge.games >= 1 ? (
                    <div className="logoplusgames" style={{ display: "flex" }}>
                      <div style={{ maxWidth: "25px" }}>
                        <img
                          src={require("../../media/NBA.png")}
                          style={{ width: "100%" }}
                          alt=""
                        />
                      </div>
                      {challenge.games} Games
                    </div>
                  ) : null}
                </div>

                {user?.username === challenge.challenger_username ? (
                  <div className="side3 col-9">
                    <div className="row">
                      <div className="h2hdetails col-4">
                        <div className="matchup"> Correct Picks</div>
                        {challenge.challenger_picks_correct}
                      </div>
                      <div className="h2hdetails col-4">
                        <span className="matchup">Opponent</span>
                        <div className="userplusavatarplusscore">
                          <div className="avatarboxh2h">
                            <img
                              style={{ width: "100%", verticalAlign: "top" }}
                              src={challenge.opponent_avatar}
                              alt=""
                            />
                          </div>
                          {challenge.opponent_username}
                          {/* {challenge.opponent_picks_correct} */}
                        </div>
                      </div>
                      <div className="h2hdetails result2 col-4">
                        <span className="result">Challenge Winner</span>
                        {(challenge.winner === "Tie") &
                        (challenge.date === currentDay) ? (
                          <div>
                            <span className="winner cip">In progress</span>
                          </div>
                        ) : (
                          <div>
                            {(!challenge.date === currentDay) &
                            (challenge.winner === "Tie") ? (
                              <span className="winner">You Tied!</span>
                            ) : (
                              <span className="winner">{challenge.winner}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="side3 col-9">
                    <div className="row row1">
                      <div className="h2hdetails col-4">
                        <div className="matchup">Correct Picks</div>
                        {challenge.opponent_picks_correct}
                      </div>
                      <div className="h2hdetails col-4">
                        <span className="matchup">Opponent</span>
                        <div className="userplusavatarplusscore">
                          <div className="avatarboxh2h">
                            <img
                              style={{ width: "100%", verticalAlign: "top" }}
                              src={challenge.challenger_avatar}
                              alt=""
                            />
                          </div>
                          {challenge.challenger_username}
                          {/* ({challenge.challenger_picks_correct}) */}
                        </div>
                      </div>
                      <div className="h2hdetails result2 col-4">
                        <span className="result">Challenge Winner</span>
                        {(challenge.winner === "Tie") &
                        (challenge.date === currentDay) ? (
                          <div>
                            <span className="winner">In progress</span>
                          </div>
                        ) : (
                          <div>
                            {(!challenge.date === currentDay) &
                            (challenge.winner === "Tie") ? (
                              <span className="winner">You Tied!</span>
                            ) : (
                              <span className="winner">{challenge.winner}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export default HeadToHead;
