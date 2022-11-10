import "./HeadToHead.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

function HeadToHead() {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState("");
  const { user, refreshUser } = useAuth();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const getChallenges = async () => {
    const response = await fetch(`/api_v1/competitions/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setChallenges(data);
    }
  };

  const filterList = [
    ...new Set(challenges.map((challenge) => challenge.date)),
  ];
  console.log({ filterList });
  const filterListHTML = filterList.map((date, index) => (
    <button
      className="filterbtns previous"
      key={index}
      onClick={(e) => setFilter(date)}
    >
      {date} (previous)
    </button>
  ));

  console.log({ challenges });

  return (
    <>
      <header className="titles col-8 offset-2">
        <h2>Let's Go Head To Head!</h2>
        <h3 style={{ textDecoration: "underline" }}>The Rules</h3>
        <p>Challenge another user</p>
      </header>
      <section className="col-8 offset-2 challenges">
        <h3 className="mychallengestitle">My Challenges</h3>
        <div className="filters">
          {filterListHTML}
          <button className="filterbtns today" onClick={(e) => setFilter(null)}>
            Today
          </button>
        </div>
        {challenges
          .filter((challenge) =>
            filter ? challenge.date == filter : challenge
          )
          .map((challenge) => (
            <section className="challengecard">
              {user.username === challenge.challenger_username ? (
                <div>
                  {challenge.challenger_username} vs{" "}
                  {challenge.opponent_username}
                </div>
              ) : (
                <div>
                  {challenge.opponent_username} vs{" "}
                  {challenge.challenger_username}
                </div>
              )}
              <time>{challenge.date}</time>
            </section>
          ))}
      </section>
    </>
  );
}
export default HeadToHead;
