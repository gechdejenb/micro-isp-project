# backend/app/services/openai_service.py
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_network_logs(logs: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Analyze this network log and predict peak usage times."},
            {"role": "user", "content": logs}
        ],
        temperature=0.7,
        max_tokens=256
    )
    return response.choices[0].message.content
