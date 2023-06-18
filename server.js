// const express = require("express");
// const userController = require("./controllers/user/userController");
// const zoomController = require("./controllers/zoom/zoomContoller");

// const app = express();
// const PORT = 4001;
// app.use("/user", userController);
// app.use("/zoom", zoomController);

// app.get("/test", (request, response) => {
//   console.log("Working");
//   return response.status(200).send({ status: "SUCCESS", message: "Working" });
// });

// app.listen(PORT || 4001, () => {
//   console.log(`listing to ${PORT || 4001}`);
// });

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Redirect URI for handling OAuth callback
const REDIRECT_URI = "http://localhost:3000/oauth/callback";

// Route for initiating the OAuth flow
app.get("/oauth", (req, res) => {
  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CLIENT_SECRET_KEY}`;

  res.redirect(authUrl);
});

// Route for handling the OAuth callback
app.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      },
    });

    const { access_token } = tokenResponse.data;

    const meetingId = "https://us05web.zoom.us/j/8109365073?pwd=VFR4andPWGxhQkJFcTl6YnA3RjRtQT09";

    // Make a request to join the meeting using the access token
    const joinResponse = await axios.post(`https://api.zoom.us/v2/meetings/${meetingId}/join`, null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        meetingId: meetingId,
      },
    });

    // Handle the response from joining the meeting
    console.log(joinResponse.data);

    res.send("Successfully joined the meeting.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to join the meeting.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(PORT);
});
