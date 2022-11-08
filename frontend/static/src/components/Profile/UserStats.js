import { useState, useEffect } from "react";
import moment from "moment";

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
      console.log(data);
    }
  };
  console.log({ userPicks });

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);
  const yesterdaysDate = moment(yesterday).format("MMMM Do YYYY");

  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };
  const winLoss = userPicks.map((pick) => pick.is_correct);
  // console.log({ winLoss });
  const correctGuesses = getOccurrence(winLoss, true);
  const incorrectGuesses = getOccurrence(winLoss, false);
  const totalGuesses = correctGuesses + incorrectGuesses;
  const guessPercentage = (correctGuesses / totalGuesses) * 100;
  // console.log({ correctGuesses });
  // console.log({ incorrectGuesses });
  const correctGuessString = correctGuesses.toString();
  const incorrectGuessString = incorrectGuesses.toString();
  const totalGuessesString = totalGuesses.toString();
  const guessPercentageString = guessPercentage.toString();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="mainstats">
        <h2 className="mystatsheader">Yesterday, {yesterdaysDate}</h2>
        <div className="yesterday">
          <div className="guesstitles">
            <span className="spanlabels">Correct Guesses</span>
            <span className="spanlabels">Total Guesses</span>
            <span className="spanlabels">Percentage Correct</span>
          </div>
          <div className="guessnumbers">
            <span>{correctGuessString}</span>
            <span>{totalGuessesString}</span>
            <span>{guessPercentage}%</span>
          </div>
        </div>
        <h2 className="mystatsheader">Lifetime Stats</h2>
        <div className="lifetime">
          <div className="guesstitles">
            <span className="spanlabels">Correct Guesses</span>
            <span className="spanlabels">Total Guesses</span>
            <span className="spanlabels">Percentage Correct</span>
          </div>
          <div className="guessnumbers">
            <span>{correctGuessString}</span>
            <span>{totalGuessesString}</span>
            <span>{guessPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserStats;
