import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from utils import obtain_new_interview_question, obtain_question_answer_feedback
from exceptions import OpenAIException

from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("API_KEY")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)



class OldQuestions(BaseModel):
    old_questions: list[str]


class AnswerEvaluation(BaseModel):
    question: str
    answer: str



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/interview/question")
async def get_new_interview_question(old_questions: OldQuestions):

    try:    
        question = await obtain_new_interview_question(api_key= API_KEY,
                                                       old_questions= old_questions.old_questions
                                                       )
        return {'question': question}

    except OpenAIException as e:
        raise HTTPException(status_code= e.status_code,  detail= e.__str__())


@app.post("/interview/answer/feedback")
async def get_answer_feedback(answer_evaluation: AnswerEvaluation):

    try:    
        feedback = await obtain_question_answer_feedback(api_key= API_KEY,
                                                         question= answer_evaluation.question,
                                                         answer= answer_evaluation.answer
                                                         )
        
        return {'feedback': feedback}

    except OpenAIException as e:
        raise HTTPException(status_code= e.status_code,  detail= e.__str__())