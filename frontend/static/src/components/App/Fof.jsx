import { Link } from "react-router-dom";

function Fof() {
  return (
    <main>
      <div className="main404">
        <div class="ball1">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball2">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball3">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball4">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball5">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball6">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball7">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball8">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball9">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
        <div class="ball10">
          <img
            src={require("../../media/basketball.png")}
            style={{ width: "100%", borderRadius: "50%" }}
            alt=""
          ></img>
        </div>
      </div>
      <div className="lower404">
        <h2 className="title404">404</h2>
        <p className="ohnotext">Oh no! It's raining 404s over here!</p>
        <Link to="card">
          <button
            className="btn404"
            onClick={() => {
              window.history.back();
            }}
          >
            Take me back
          </button>
        </Link>
      </div>
    </main>
  );
}
export default Fof;
