import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from utils import obtain_new_interview_question, obtain_question_answer_feedback, text_to_speech, image_analysis
from exceptions import OpenAIException
from io import BytesIO

from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_AI_KEY")
AZURE_SPEECH_KEY = os.getenv("AZURE_SPEECH_KEY")
AZURE_SPEECH_REGION = os.getenv("AZURE_SPEECH_REGION")
AZURE_AI_VISION_KEY = os.getenv("AZURE_AI_VISION_KEY")

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

class TextMessage(BaseModel):
    message: str



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/interview/question/")
async def get_new_interview_question(old_questions: OldQuestions):

    try:    
        question = await obtain_new_interview_question(api_key= GEMINI_API_KEY,
                                                       old_questions= old_questions.old_questions
                                                       )
        return {'question': question}

    except OpenAIException as e:
        raise HTTPException(status_code= e.status_code,  detail= e.__str__())


@app.post("/interview/answer/feedback/")
async def get_answer_feedback(answer_evaluation: AnswerEvaluation):

    try:    
        feedback = await obtain_question_answer_feedback(api_key= GEMINI_API_KEY,
                                                         question= answer_evaluation.question,
                                                         answer= answer_evaluation.answer
                                                         )
        
        return {'feedback': feedback}

    except OpenAIException as e:
        raise HTTPException(status_code= e.status_code,  detail= e.__str__())
    

@app.post("/generate-audio/")
async def text_to_speech_endpoint(message: TextMessage):
    try:
        audio_bytes = await text_to_speech(message = message.message, azure_key= AZURE_SPEECH_KEY, region= AZURE_SPEECH_REGION)
        return StreamingResponse(content= BytesIO(audio_bytes), media_type="audio/mpeg")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/analysis/candidate-image/")
async def create_upload_file(image: UploadFile = None):
    if not image:
        return {"message": "No upload image sent"}
    else:
        output = await image_analysis(azure_vision_key= AZURE_AI_VISION_KEY, image= image.file)

        return output