import requests
from requests import Response

async def chat_gpt_request(api_key: str, prompt: str, max_tokens: int = 50) -> Response:

    try:
            response = requests.post('https://api.openai.com/v1/chat/completions',
                                    headers={
                                        'Content-Type': 'application/json',
                                        'Authorization': f'Bearer {api_key}'
                                    },
                                    json={
                                        'model': 'gpt-3.5-turbo-16k',
                                        'messages': [{'role': 'user', 'content': f'{prompt}'}],
                                        'max_tokens': max_tokens
                                    })            

            return response

    except Exception as e:
        raise Exception(f"OpenAI API Request Failed: {e}")
    


async def obtain_new_interview_question(api_key: str, old_questions: list[str]) -> str:

    temp = ""

    for question in old_questions:
          temp += question + '\n'

    
    prompt_format = """eres un experto entrevistador, vas a entrevistar a un nuevo candidato,
        dame una sola pregunta para hacerle al candidato,
        NO preguntas tecnicas, tu respuesta solo bebe contener la pregunta nada mas.
        {old_questions_statement}
        {old_questions_str}
        """
    

    prompt: str
    if len(old_questions) > 0:
        prompt = prompt_format.format(old_questions_statement= "Las siguientes preguntas ya fueron realizadas, No las repitas y NO hagas pregentas similares a estas.",
                                     old_questions_str = temp
                                     )
    else:
        prompt = prompt_format.format(old_questions_statement= "",
                                     old_questions_str = ""
                                     )
        

    response = chat_gpt_request(api_key= api_key, prompt= prompt)

    if not response.ok:
            raise Exception(f"OpenAI API Error: {response.status_code} - {response.reason}")
    

    data = response.json()

    return data.get('choices')[0].get('message').get('content')



async def obtain_question_answer_feedback(api_key: str, question: str, answer: str) -> str:
     
    prompt = f"""eres un experto entrevistador, estas ayudando a una persona a prepararse para una entrevista laboral,
        ahora debes de dar feedback a la persona sobre una de sus respuestas, el feedback debe ser corto y conciso(menos de 50 palabras),
        NOO! hagas ninguna otra pregunta en el feedback,omite todo tipo de saludos en le feedback.
        Tu respuesta debe de ser tono profesional y de tal manera que parezca una conversacion con la persona.
        Le hiciste esta pregunta:
        {question}
        Y esta fue la respuesta de la persona:
        {answer}
        """

    response = chat_gpt_request(api_key= api_key, prompt= prompt, max_tokens= 80)

    if not response.ok:
            raise Exception(f"OpenAI API Error: {response.status_code} - {response.reason}")
    

    data = response.json()

    return data.get('choices')[0].get('message').get('content')
     



if __name__=="__main__":
    import os
    import asyncio
    from dotenv import load_dotenv
    load_dotenv()

    API_KEY = os.getenv("API_KEY")

    old_questions = [
         "¿Puedes describir alguna situación en la que hayas tenido que tomar una decisión difícil y cómo la abordaste?",
         "¿Cómo te consideras un miembro valioso y colaborativo en un equipo de trabajo?",
         "¿Cuál es la habilidad o experiencia que consideras más relevante y cómo has aplicado o aplicarías esta habilidad en el ámbito laboral?"
    ]

    question = get_new_interview_question(api_key= API_KEY, old_questions=[])

    print(question)

    answer = input('answer: ')

    feedback = get_question_answer_feedback(api_key= API_KEY, question= question, answer= answer)

    print(feedback)