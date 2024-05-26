import requests
from requests import Response
from exceptions import OpenAIException

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
        NO preguntas tecnicas, tu respuesta solo debe contener la pregunta nada mas.
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
        

    response = await chat_gpt_request(api_key= api_key, prompt= prompt)

    if not response.ok:
            raise OpenAIException(status_code= response.status_code,
                                  reason= response.reason
                                  )
    

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

    response = await chat_gpt_request(api_key= api_key, prompt= prompt, max_tokens= 80)

    if not response.ok:
            raise OpenAIException(status_code= response.status_code,
                                  reason= response.reason
                                  )
    

    data = response.json()

    return data.get('choices')[0].get('message').get('content')
     


async def text_to_speech(message: str, azure_key: str, region: str, voice: str = 'es-CO-SalomeNeural') -> bytes:
    try:
        xml_message = f'''<?xml version="1.0"?>
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES">
          <voice xml:lang="es-ES" name="{voice}">
            {message}
          </voice>
        </speak>
        '''

        headers = {
            'Content-Type': 'application/ssml+xml',
            'Ocp-Apim-Subscription-Key': azure_key,
            'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        }

        response = requests.post(f'https://westus.tts.speech.microsoft.com/cognitiveservices/v1', headers=headers, data=xml_message)
        
        if not response.ok:
            raise OpenAIException(status_code= response.status_code,
                                  reason= response.reason
                                )
        
        return response.content

    except Exception as error:
        raise Exception(f'Text-to-Speech Request Failed: {str(error)}')



if __name__=="__main__":
    import os
    import asyncio
    from dotenv import load_dotenv
    load_dotenv()

    API_KEY = os.getenv("API_KEY")
    AZURE_SPEECH_KEY = os.getenv("AZURE_SPEECH_KEY")
    AZURE_SPEECH_REGION = os.getenv("AZURE_SPEECH_REGION")

    old_questions = [
         "¿Puedes describir alguna situación en la que hayas tenido que tomar una decisión difícil y cómo la abordaste?",
         "¿Cómo te consideras un miembro valioso y colaborativo en un equipo de trabajo?",
         "¿Cuál es la habilidad o experiencia que consideras más relevante y cómo has aplicado o aplicarías esta habilidad en el ámbito laboral?"
    ]

    async def main():
        question = await obtain_new_interview_question(api_key= API_KEY, old_questions=[])

        print(question)

        answer = input('answer: ')

        feedback = await obtain_question_answer_feedback(api_key= API_KEY, question= question, answer= answer)

        print(feedback)

        # s= await text_to_speech(message='hola como estas?',
        #                azure_key= AZURE_SPEECH_KEY,
        #                region= AZURE_SPEECH_REGION
        #                )
        
        # output_file = 'audio.mp3'

        # with open(output_file, 'wb') as audio_file:
        #     audio_file.write(s)
        
        # print(f"Audio saved to {output_file}")


    asyncio.run(main())

    