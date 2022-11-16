import "./CardStyles/CardFooter.css";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
//Npm
import Cookies from "js-cookie";
//Bootstrap
import Modal from "react-bootstrap/Modal";
//React Icons
import { BsCheckLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

function CardFooter({
  todaysGames,
  todaysPicks,
  picksCompletedPercentage,
  getTodaysPicks,
  timeUntilEstGameInMS,
}) {
  const { user, refreshUserPicks } = useAuth();
  const [show, setShow] = useState(false);
  const [editedPick, setEditedPick] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (pick) => {
    setShow(true);
    setEditedPick(pick);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_pick", editedPick.opponent);
    formData.append("opponent", editedPick.user_pick);
    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/picks/current/${user.id}/${editedPick.id}/`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      // const data = await response.json();
      getTodaysPicks();
      handleClose();
    }
  };

  return (
    <>
      {todaysPicks.length >= 1 ? (
        <footer className="gamesfooter row">
          <h2 className="col-2 offset-1 footerh2">
            Your Picks
            <div className="backbar">
              {todaysPicks.length <= 3 ? (
                <>
                  <div
                    style={{ width: `${picksCompletedPercentage}%` }}
                    className="frontbar"
                  ></div>
                  {timeUntilEstGameInMS > 0 ? (
                    <div className="clicktext">
                      Tap team to change pick
                      <IoIosArrowForward style={{ fontSize: "12px" }} />
                    </div>
                  ) : (
                    <AiFillLock />
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{ width: `${picksCompletedPercentage}%` }}
                    className="frontbar"
                  >
                    {todaysPicks.length}/{todaysGames.length}
                  </div>
                  {timeUntilEstGameInMS > 0 ? (
                    <div className="clicktext">
                      Tap team to change pick
                      <IoIosArrowForward style={{ fontSize: "12px" }} />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </h2>

          <div
            className="col-md-8 offset-md-0 col-8 offset-1 pickedteams"
            style={{ color: "white", display: "flex" }}
          >
            {todaysPicks.length > 0 &&
              todaysPicks.map((pick) => (
                <>
                  <button
                    disabled={timeUntilEstGameInMS > 0 ? false : true}
                    className={
                      timeUntilEstGameInMS > 0 ? "pickbox" : "pickboxlocked"
                    }
                    onClick={() => handleShow(pick)}
                  >
                    <div className="footerimgdivtowin mobilefooterimgwin">
                      <img
                        style={{ width: "100%" }}
                        src={require(`../../media/${pick.user_pick}.png`)}
                        alt=""
                      />
                    </div>

                    <div className="footerimgdivtolose mobilefooterimglose">
                      {timeUntilEstGameInMS > 0 ? (
                        <img
                          style={{ width: "100%" }}
                          src={require(`../../media/${pick.opponent}.png`)}
                          alt=""
                        />
                      ) : null}
                    </div>
                    <div
                      className={timeUntilEstGameInMS > 0 ? "nolock" : "lock"}
                    >
                      <AiFillLock />
                    </div>
                  </button>
                  <Modal
                    centered
                    show={show}
                    onHide={handleClose}
                    className="edit-pick-modal"
                    backdropClassName="edit-pick-backdrop"
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="modal-body">
                      <div className="change-pick">Change pick?</div>
                      <span className="scrappick">
                        <IoMdClose
                          style={{ marginRight: "3px", fontSize: "30px" }}
                        />
                        {editedPick.user_pick}
                      </span>
                      <span className="newpick">
                        <BsCheckLg style={{ marginRight: "5px" }} />
                        {editedPick.opponent}
                      </span>
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="pickeditbtnhouse">
                        {/* <button className="pickeditbtn" onClick={handleClose}>
                          Back
                        </button> */}
                        <button
                          className="pickeditbtn"
                          onClick={handleSubmit}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          Confirm
                        </button>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </>
              ))}
          </div>
        </footer>
      ) : null}
    </>
  );
}
export default CardFooter;
