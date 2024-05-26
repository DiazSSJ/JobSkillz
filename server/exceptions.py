class OpenAIException(Exception):
    def __init__(self, status_code: int, reason: str, message:str = "") -> None:
        self.status_code = status_code
        self.reason = reason

        if message == "":
            self.message = f"OpenAI API Error: {status_code} - {reason}"
        else:
            self.message = message

    def __str__(self) -> str:
        return self.message