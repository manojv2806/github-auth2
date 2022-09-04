const express = require("express");
const axios = require("axios");
var cors = require("cors");

const CLIENT_ID = "2fa77633abce712de244";
const CLIENT_SECRET = "b4ae89aff43b54ea0920e300cf9eb63e8e3f2474";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  console.log("inside reduirec");
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  }).catch((e)=>{
    console.log(e)
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});