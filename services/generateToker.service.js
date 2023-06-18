const express = require("express");
const jwt = require("jsonwebtoken");

const generateToken = async (apiKey, apiSecret) => {
  try {
    const payload = {
      iss: apiKey,
      exp: Math.floor(Date.now() / 1000) + 120, // Token expires in 60 seconds
    };

    const token = await jwt.sign(payload, apiSecret);

    return token;
  } catch (error) {
    console.log({ error });
  }
};
