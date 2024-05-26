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

export const generateAudio = (message) => {
  return api.post("generate-audio/", {
    message: message,
  });
};
