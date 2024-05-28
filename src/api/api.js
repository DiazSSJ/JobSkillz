import axios from "axios";

export const api = axios.create({
  baseURL: "https://job-skillz.juanbailon.xyz/",
});

export const getQuestion = (message) => {
  return api.post("interview/question/", {
    old_questions: [message],
  });
};

export const getFeedback = (question, answer) => {
  return api.post("interview/answer/feedback/", {
    question: question,
    answer: answer,
  });
};

export const generateAudio = async (message) => {
  const response = await api.post("generate-audio/", {
    message: message,
  }, { responseType: 'blob' }); 

  if (response.status !== 200) {
    throw new Error('Failed to generate audio');
  }

  return response.data;
};