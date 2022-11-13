import "./CardStyles/CardFooter.css";

function CardFooter({ todaysGames, todaysPicks, picksCompletedPercentage }) {
  return (
    <>
      {todaysPicks.length > 0 ? (
        <footer className="gamesfooter row">
          <h2 className="col-2 offset-1 footerh2">
            Your Picks
            <h3 className="pickprogress"></h3>
            <div className="backbar">
              {todaysPicks.length === 1 ? (
                <div
                  style={{ width: `${picksCompletedPercentage}%` }}
                  className="frontbar"
                ></div>
              ) : (
                <div
                  style={{ width: `${picksCompletedPercentage}%` }}
                  className="frontbar"
                >
                  {todaysPicks.length}/{todaysGames.length}
                </div>
              )}
            </div>
          </h2>

          <div
            className="col-md-8 offset-md-0 col-8 offset-1 pickedteams"
            style={{ color: "white", display: "flex" }}
          >
            {todaysPicks.map((pick) => (
              <div className="pickbox">
                <div className="footerimgdivtowin mobilefooterimgwin">
                  <img
                    style={{ width: "100%" }}
                    src={require(`../../media/${pick.user_pick}.png`)}
                  />
                </div>

                <div className="footerimgdivtolose mobilefooterimglose">
                  <img
                    style={{ width: "100%" }}
                    src={require(`../../media/${pick.opponent}.png`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </footer>
      ) : null}
    </>
  );
}
export default CardFooter;
