import os
from openai import OpenAI
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the OpenAI client
client = OpenAI(
    api_key="2b6a7a40be6e4e58a6e18d8a3db54b54",  # Replace with your actual API key
    base_url="https://api.aimlapi.com/v1"  # Custom API endpoint
)

def analyze_network_logs(logs: dict) -> str:
    """
    Analyze network logs using AI and provide optimization recommendations.
    
    Args:
        logs (dict): Dictionary containing network metrics:
            - bandwidth (int): Bandwidth in Mbps
            - latency (int): Latency in ms
            - packetLoss (float): Packet loss percentage
    
    Returns:
        str: AI-generated recommendations or error message
    """
    try:
        # Validate input logs
        if not all(key in logs for key in ["bandwidth", "latency", "packetLoss"]):
            raise ValueError("Invalid logs format. Required keys: bandwidth, latency, packetLoss")

        # Define the system prompt
        system_prompt = """
        You are a network optimization assistant for a Micro ISP. Analyze the provided network logs and provide specific, actionable recommendations to improve performance. Focus on:
        1. **Bandwidth**: Suggest adjustments based on usage patterns.
        2. **Latency**: Recommend ways to reduce latency.
        3. **Packet Loss**: Provide solutions to minimize packet loss.
        4. **Peak Usage**: Identify peak times and suggest strategies.
        Please limit your response to 100 words.
        """

        # Define the user prompt
        user_prompt = f"""
        Network Logs:
        - Bandwidth: {logs['bandwidth']} Mbps
        - Latency: {logs['latency']} ms
        - Packet Loss: {logs['packetLoss']}%
        """

        logger.info(f"Sending AI request with logs: {logs}")

        # Call the AI API
        response = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.2",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=100  # Limit the response to approximately 100 words
        )

        # Extract and return the AI response
        analysis = response.choices[0].message.content
        logger.info(f"Received AI analysis: {analysis}")
        return analysis

    except Exception as e:
        error_msg = f"AI analysis failed: {str(e)}"
        logger.error(error_msg)
        return error_msg