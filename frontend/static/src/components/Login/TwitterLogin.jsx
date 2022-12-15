import { useEffect } from "react";
//React Icons
import { BsTwitter } from "react-icons/bs";
function TwitterLogin() {
  //   const redirectURI = "http://localhost:3000/card/";

  const randomStringGenerator = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const randomChallengeString = randomStringGenerator(64);
  const randomStateString = randomStringGenerator(20);
  const base64Encode = (str) => {
    return btoa(str).replace(/=+$/, "");
  };
  const codeChallenge = base64Encode(randomChallengeString);
  console.log("challenge code is", codeChallenge);
  const twitterSignIn = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=tweet.read%20users.read%20tweet.write%20offline.access&state=${randomStateString}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  const returnURL = window.location.href;
  const breakURL = (str) => {
    var data = str.split("code=");
    var authCode = data[1];
    return authCode;
  };
  const authCode = breakURL(returnURL);
  console.log("returned auth code is", authCode);

  useEffect(() => {
    if (window.location.href.includes("&code=")) {
      getAccessToken();
    }
  }, []);

  const getAccessToken = async () => {
    const encodedString = btoa(
      `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
    );
    console.log("btoa authorization code is", encodedString);

    const formData = new FormData();
    formData.append("code", authCode);
    formData.append("grant_type", encodedString);
    formData.append("client_id", process.env.REACT_APP_CLIENT_ID);
    formData.append("redirect_uri", process.env.REACT_APP_REDIRECT_URI);
    formData.append("code_verifier", codeChallenge);
    const options = {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedString}`,
      },
      body: formData,
    };
    const response = await fetch(
      "https://api.twitter.com/2/oauth2/token",
      options
    );
    const data = await response.json();
    console.log(data);
  };

  // check out allauth docs! ---> https://django-allauth.readthedocs.io/en/latest/providers.html

  return (
    <a style={{ textDecoration: "none" }} href={twitterSignIn}>
      <button className="twitterloginbox" style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BsTwitter
            style={{ left: "20", position: "absolute", fontSize: "20px" }}
          />
          Login with Twitter{" "}
        </div>
      </button>
    </a>
  );
}
export default TwitterLogin;
