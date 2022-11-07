import "./Card.css";
import "../Timer/timer.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import CountdownTimer from "../Timer/CountdownTimer";
import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

function Card() {
  const [todaysGames, setTodaysGames] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [userPick, setUserPick] = useState("");
  const [firstGameTime, setFirstGameTime] = useState("");
  const [loading, setLoading] = useState(false);

  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  const currentDay = dd + "-" + mm + "-" + yyyy;
  console.log("today's date is", currentDay);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getTodaysGames();
  }, []);

  const getTodaysGames = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
          "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
        },
      };
      const data = await fetch(
        `https://nba-schedule.p.rapidapi.com/schedule?date=${currentDay}`,
        options
      ).then((response) => response.json());
      setTodaysGames(data[0].games);
      setFirstGameTime(data[0].games[0].gameDateTimeEst);
      setGameDate(
        moment(data[0].games[0].gameDateTimeEst).format("YYYY-MM-DD")
      );
      // todaysGames.map((game) => {
      //   localStorage.getItem(game.id);
      // });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAwayTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  const handleHomeTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this", e.target);
    const formData = new FormData();
    formData.append("gameid", gameID);
    formData.append("date", gameDate);
    formData.append("user_pick", userPick);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/picks/current/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      localStorage.setItem(`00${gameID}`, userPick);
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Pick Submitted!",
    });
    e.target.children[3].children[0].disabled = true;
    window.scrollBy(0, 250);
    setUserPick("");
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const gameListHtml = todaysGames.map((game) => (
    <form
      className="formbox"
      data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      {console.log(game.gameId)}
      <h4 className="gamestatus">{game.gameStatusText}</h4>
      <div className="spanbar"></div>
      <div className="gamebtnhouse">
        <button
          type="button"
          id={game.gameId}
          name="awayTeam"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          className={`gamebtn${game.awayTeam.teamTricode} gamebtn`}
        >
          <div className="imghouse">
            {" "}
            <img
              src={require(`../../media/${game.awayTeam.teamTricode}.png`)}
              alt=""
              className="teamlogo"
            ></img>
          </div>
          <div className="gamedetails">
            <div className="cityteam">
              {game.awayTeam.teamCity} {game.awayTeam.teamName}
            </div>
            <div div className="winloss">
              {game.awayTeam.wins}-{game.awayTeam.losses}
            </div>
          </div>
        </button>
        <button
          type="button"
          id={game.gameId}
          name="homeTeam"
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          className={`gamebtn${game.homeTeam.teamTricode} gamebtn`}
        >
          <div className="imghouse">
            <img
              src={require(`../../media/${game.homeTeam.teamTricode}.png`)}
              alt=""
              className="teamlogo"
            ></img>
          </div>
          <div className="gamedetails">
            <div className="cityteam">
              {game.homeTeam.teamCity} {game.homeTeam.teamName}
            </div>
            <div className="winloss">
              {game.homeTeam.wins}-{game.homeTeam.losses}
            </div>
          </div>
        </button>
      </div>
      <div>
        {localStorage.getItem(game.gameId) ? (
          <div className="picksubmitted">Pick submitted!</div>
        ) : (
          <button type="submit" className="submitbtn">
            Submit Pick
          </button>
        )}
      </div>
    </form>
  ));
  const afterHoursGameListHtml = todaysGames.map((game) => (
    <form
      className="formbox"
      data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      <h4 className="gamestatus">{game.gameStatusText}</h4>
      <div className="spanbar"></div>
      <div className="gamebtnhouse">
        <button
          disabled
          type="button"
          id={game.gameId}
          name="awayTeam"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          className={`gamebtn${game.awayTeam.teamTricode} gamebtn`}
        >
          <div className="imghouse">
            {" "}
            <img
              src={require(`../../media/${game.awayTeam.teamTricode}.png`)}
              alt=""
              className="teamlogo"
            ></img>
          </div>
          <div className="gamedetails">
            <div className="cityteam">
              {game.awayTeam.teamCity} {game.awayTeam.teamName}
            </div>
            <div div className="winloss">
              {game.awayTeam.wins}-{game.awayTeam.losses}
            </div>
          </div>
        </button>
        <button
          disabled
          type="button"
          id={game.gameId}
          name="homeTeam"
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          className={`gamebtn${game.homeTeam.teamTricode} gamebtn`}
        >
          <div className="imghouse">
            <img
              src={require(`../../media/${game.homeTeam.teamTricode}.png`)}
              alt=""
              className="teamlogo"
            ></img>
          </div>
          <div className="gamedetails">
            <div className="cityteam">
              {game.homeTeam.teamCity} {game.homeTeam.teamName}
            </div>
            <div className="winloss">
              {game.homeTeam.wins}-{game.homeTeam.losses}
            </div>
          </div>
        </button>
      </div>
    </form>
  ));

  const firstGameStartingTime = new Date(firstGameTime);
  const firstGameStartingTimeInMS = firstGameStartingTime.getTime();
  const fourHoursInMS = 14400000; //use this line for production
  // const fourHoursInMS = 11114400000;
  const nowInMS = new Date().getTime();
  const timeUntilGameInMS = firstGameStartingTimeInMS - nowInMS;
  const gameTimeCountDownInMS = nowInMS + timeUntilGameInMS + fourHoursInMS;
  const timeUntilEstGameInMS = timeUntilGameInMS + fourHoursInMS;

  return (
    <>
      {!loading ? (
        <div>
          <div className="carddiv">
            <CountdownTimer targetDate={gameTimeCountDownInMS} />
          </div>
          {timeUntilEstGameInMS > 0 ? (
            <div className="cards col-md-8 offset-md-2 col-10 offset-1 divlist">
              {gameListHtml}
            </div>
          ) : (
            <div className="cards col-md-8 offset-md-2 col-10 offset-1 divlist">
              {afterHoursGameListHtml}
            </div>
          )}
          <div style={{ visibility: "hidden", height: "250px" }}></div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

export default Card;
