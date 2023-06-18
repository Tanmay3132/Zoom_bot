const express = require("express");
const axios = require("axios");

const joinZoomMeetingService = async (meetingId, email, password) => {
  try {
    
    // Generate the JWT token
    const token = generateToken(); // Implement the token generation logic yourself

    // Make a POST request to join the meeting
    const response = await axios.post(`https://api.zoom.us/v2/meetings/${meetingId}/registrants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email,
        password,
      },
    });

    // Handle the response
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = joinZoomMeetingService;
