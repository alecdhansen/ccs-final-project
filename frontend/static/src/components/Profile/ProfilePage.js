import "./Profile.css";
import "../Card/Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserStats from "./UserStats";
import ProfileBox from "./ProfileBox";
//npm
import Cookies from "js-cookie";

function ProfilePage({ state }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profile, setProfile] = useState({ avatar: null });
  const [preview, setPreview] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [hand, setHand] = useState(true);
  const navigate = useNavigate();

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
    console.log(e);
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
    const options = {
      method: "PUT",
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
      handleClose();
      navigate("/home/games");
    }
  };

  return (
    <main className="row mainprofilepage">
      <section className="col-md-4 offset-md-1 col-10 offset-1 profilebox">
        <ProfileBox
          preview={preview}
          handleShow={handleShow}
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleFavoriteTeam={handleFavoriteTeam}
          handleHand={handleHand}
        />
      </section>
      <section className="col-md-5 offset-md-1 col-10 offset-1 statbox">
        <UserStats />
      </section>
    </main>
  );
}
export default ProfilePage;
