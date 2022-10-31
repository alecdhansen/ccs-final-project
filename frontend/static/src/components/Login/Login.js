import { useEffect } from "react";

function Login() {
  //   const redirectURI = "http://localhost:3000/card/";

  function randomStringGenerator(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
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
    const data = await fetch(
      "https://api.twitter.com/2/oauth2/token",
      options
    ).then((response) => response.json());
    console.log(data);
  };

  return (
    <div>
      Login
      <a href={twitterSignIn}>Login with Twitter</a>
    </div>
  );
}
export default Login;
