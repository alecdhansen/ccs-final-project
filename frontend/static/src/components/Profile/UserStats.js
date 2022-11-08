import { useState, useEffect } from "react";
import moment from "moment";

function UserStats() {
  const [yesterdaysPicks, setYesterdaysPicks] = useState([]);
  const [lifetimePicks, setLifetimePicks] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getYesterdaysPicks();
    // getLifetimePicks();
  }, []);

  const getYesterdaysPicks = async () => {
    const response = await fetch("/api_v1/picks/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setYesterdaysPicks(data);
      console.log(data);
    }
  };
  console.log({ yesterdaysPicks });

  // const getLifetimePicks = async () => {
  //   const response = await fetch("/api_v1/picks/lifetime/").catch(handleError);
  //   if (!response.ok) {
  //     throw new Error("Network response not OK");
  //   } else {
  //     const data = await response.json();
  //     setLifetimePicks(data);
  //     console.log(data);
  //   }
  // };

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);
  const yesterdaysDate = moment(yesterday).format("MMMM Do YYYY");

  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };

  // Yesterday's Win/Loss
  const yesterdayWinLoss = yesterdaysPicks.map((pick) => pick.is_correct);
  console.log({ yesterdayWinLoss });
  const correctGuesses = getOccurrence(yesterdayWinLoss, true);
  const incorrectGuesses = getOccurrence(yesterdayWinLoss, false);
  const totalGuesses = correctGuesses + incorrectGuesses;
  const guessPercentage = ((correctGuesses / totalGuesses) * 100).toFixed(0);
  const correctGuessString = correctGuesses.toString();
  const incorrectGuessString = incorrectGuesses.toString();
  const totalGuessesString = totalGuesses.toString();
  const guessPercentageString = guessPercentage.toString();

  // Lifetime Win/Loss

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
