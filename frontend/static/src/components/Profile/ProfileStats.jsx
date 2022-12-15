import { useState, useEffect } from "react";
import moment from "moment";
import { handleError } from "../../utils";

const ProfileStats = () => {
  const [yesterdaysPicks, setYesterdaysPicks] = useState([]);
  const [lifetimePicks, setLifetimePicks] = useState([]);

  useEffect(() => {
    getYesterdaysPicks();
    getLifetimePicks();
  }, []);

  const getYesterdaysPicks = async () => {
    const response = await fetch("/api_v1/picks/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setYesterdaysPicks(data);
    }
  };

  const getLifetimePicks = async () => {
    const response = await fetch("/api_v1/picks/lifetime/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setLifetimePicks(data);
    }
  };

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);
  const yesterdaysDate = moment(yesterday).format("MMM Do, YYYY");

  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };

  // Yesterday's Win/Loss
  const yesterdayWinLoss = yesterdaysPicks.map((pick) => pick.is_correct);
  const correctGuesses = getOccurrence(yesterdayWinLoss, true);
  const incorrectGuesses = getOccurrence(yesterdayWinLoss, false);
  const totalGuesses = correctGuesses + incorrectGuesses;
  const guessPercentage = ((correctGuesses / totalGuesses) * 100).toFixed(0);

  // Lifetime Win/Loss
  const lifetimeWinLoss = lifetimePicks.map((pick) => pick.is_correct);
  const lifetimeCorrectGuesses = getOccurrence(lifetimeWinLoss, true);
  const lifetimeIncorrectGuesses = getOccurrence(lifetimeWinLoss, false);
  const lifetimeTotalGuesses =
    lifetimeCorrectGuesses + lifetimeIncorrectGuesses;
  const lifetimeGuessPercentage = (
    (lifetimeCorrectGuesses / lifetimeTotalGuesses) *
    100
  ).toFixed(0);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="mainstats row">
        <h2 className="mystatsheader">Yesterday - {yesterdaysDate}</h2>
        <div className="yesterday">
          <div className="guesstitles row">
            <span className="spanlabels correctlabel col-4">Correct Picks</span>
            <span className="spanlabels col-4">Games</span>
            <span className="spanlabels col-4">Percentage</span>
          </div>
          <div className="guessnumbers row">
            <span className="col-4">{correctGuesses}</span>
            <span className="col-4">{totalGuesses}</span>
            {guessPercentage === "NaN" ? (
              <span className="col-4">0</span>
            ) : (
              <span className="col-4">{guessPercentage}%</span>
            )}
          </div>
        </div>
        <h2 className="mystatsheader">Lifetime Stats</h2>
        <div className="lifetime">
          <div className="guesstitles row">
            <span className="spanlabels correctlabel col-4">Correct Picks</span>
            <span className="spanlabels col-4">Games</span>
            <span className="spanlabels col-4">Percentage</span>
          </div>
          <div className="guessnumbers row">
            <span className="col-4">{lifetimeCorrectGuesses}</span>
            <span className="col-4">{lifetimeTotalGuesses}</span>
            {lifetimeGuessPercentage === "NaN" ? (
              <span className="col-4">0</span>
            ) : (
              <span className="col-4">{lifetimeGuessPercentage}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileStats;
