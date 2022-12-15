import "./Profile.css";
// import "../Card/CardStyles/Card.css";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
//Bootstrap
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
//React Icons
import { AiOutlineEdit } from "react-icons/ai";
//npm
import Cookies from "js-cookie";
import moment from "moment";

const ProfileBox = () => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState({ avatar: null });
  const [preview, setPreview] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [hand, setHand] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleImage = (e) => {
    console.dir(e.target);
    const file = e.target.files[0];
    setProfile({ ...profile, avatar: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFavoriteTeam = (e) => {
    setFavoriteTeam(e.target.value);
  };
  const handleHand = (e) => {
    setHand(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", profile.avatar);
    formData.append("favorite_team", favoriteTeam);
    formData.append("right_handed", hand);
    formData.append("profile_id", user.profile_id);
    formData.append("date_joined", user.date_joined);
    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/user/profile/${user.profile_id}/`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      refreshUser(data);
      handleClose();
    }
  };

  const initialSignUpDate = user.date_joined;
  const dateJoined = moment(initialSignUpDate).format("MMM YYYY");

  return (
    <>
      <div className={`landscape${user.favorite_team} landscape`}>
        <div className="teamimgbox">
          <img
            src={require(`../../media/${user.favorite_team}.png`)}
            style={{ width: "100%" }}
            alt=""
          ></img>
        </div>
      </div>
      {preview ? (
        <div className="avatarsection">
          <div className="avatarbox">
            <img
              src={preview}
              alt=""
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="avatarsection">
          <div className="avatarbox">
            <img
              src={user.avatar}
              alt=""
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
      <div className="usernameedit">
        <h4 className="username">{user.username}</h4>
        <button className="editbtn" onClick={handleShow}>
          <AiOutlineEdit />
        </button>
      </div>
      <span className="datejoined">User since {dateJoined}</span>
      <div className="formsbox">
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="initialprofileform" onSubmit={handleSubmit}>
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleImage}
                className="avatarinput"
              />
              <div className="mobiledisclaimer">*Required</div>
              <Form.Select
                size="sm"
                aria-label="Default select example"
                onChange={handleFavoriteTeam}
                className="favteaminput"
                required
              >
                <option>Favorite NBA Team</option>
                <option value="ATL">Atlanta Hawks</option>
                <option value="BKN">Brooklyn Nets</option>
                <option value="BOS">Boston Celtics</option>
                <option value="CHA">Charlotte Hornets</option>
                <option value="CHI">Chicago Bulls</option>
                <option value="CLE">Cleveland Cavaliers</option>
                <option value="DAL">Dallas Mavericks</option>
                <option value="DEN">Denver Nuggets</option>
                <option value="DET">Detroit Pistons</option>
                <option value="GSW">Golden State Warriors</option>
                <option value="HOU">Houston Rockets</option>
                <option value="IND">Indiana Pacers</option>
                <option value="LAC">Los Angeles Clippers</option>
                <option value="LAL">Los Angeles Lakers</option>
                <option value="MEM">Memphis Grizzlies</option>
                <option value="MIA">Miami Heat</option>
                <option value="MIL">Milwaukee Bucks</option>
                <option value="MIN">Minnesota Timberwolves</option>
                <option value="NOP">New Orleans Pelicans</option>
                <option value="NYK">New York Knicks</option>
                <option value="OKC">Oklahoma City Thunder</option>
                <option value="ORL">Orlanda Magic</option>
                <option value="PHI">Philadelphia 76ers</option>
                <option value="PHX">Phoenix Suns</option>
                <option value="POR">Portland Trailblazers</option>
                <option value="SAC">Sacramento Kings</option>
                <option value="SAS">San Antonio Spurs</option>
                <option value="TOR">Toronto Raptors</option>
                <option value="UTA">Utah Jazz</option>
                <option value="WAS">Washington Wizards</option>
              </Form.Select>
              <div className="mobiledisclaimer">*Required</div>
              <Form.Select
                size="sm"
                aria-label="Default select example"
                onChange={handleHand}
                className="handinput"
                required
              >
                <option>Are you...</option>
                <option value="true">Right Handed</option>
                <option value="false">Left Handed</option>
              </Form.Select>
              <div className="mobiledisclaimer" style={{ marginBottom: "0px" }}>
                *This allows us to optimize your mobile experience
              </div>
              <div className="mobiledisclaimer">*Required</div>
              <div className="editsubmitbtns">
                <button className="sb2" type="button" onClick={handleClose}>
                  Close
                </button>
                <button className="sb2" type="submit">
                  Save
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default ProfileBox;
