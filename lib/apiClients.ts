import axios from 'axios';
import OpenAI from 'openai';

const EXCHANGE_API_BASE_URL =
  process.env.EXCHANGE_API_BASE_URL ?? 'https://v6.exchangerate-api.com/v6';

export const exchangeApi = axios.create({
  baseURL: EXCHANGE_API_BASE_URL,
  timeout: 10000,
});

export const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key. Set OPENAI_API_KEY in your environment.');
  }

  return new OpenAI({ apiKey });
};

export const getExchangeApiKey = () => {
  const apiKey = process.env.EXCHANGE_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing Exchange Rate API key. Set EXCHANGE_API_KEY in your environment.',
    );
  }

  return apiKey;
};
