import axios from "axios";

export const api = axios.create({
  baseURL: "https://job-skillz.juanbailon.xyz/",
});

export const getQuestion = (oldQuestions) => {
  return api.post("interview/question/", {
    old_questions: oldQuestions,
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

// Nuevo endpoint para enviar imagen para análisis
export const analyzeCandidateImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post("analysis/candidate-image/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if (response.status !== 200) {
    throw new Error('Failed to analyze image');
  }

  return response.data;
};
