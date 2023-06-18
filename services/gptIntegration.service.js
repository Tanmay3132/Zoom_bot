const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const gptIntegrationService = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-babbage-001",
    prompt,
    temperature: 0.21,
    max_tokens: 1028,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response) {
    return response;
  }
};

module.exports = gptIntegrationService;
