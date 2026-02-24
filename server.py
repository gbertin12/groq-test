from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

PORT = int(os.environ.get('PORT', 3000))
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

# Configurer OpenAI pour Groq
openai.api_key = GROQ_API_KEY
openai.api_base = "https://api.groq.com/openai/v1"

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        conversation_history = data.get('conversationHistory', [])

        if not message:
            return jsonify({'error': 'Le message est requis'}), 400

        if not GROQ_API_KEY:
            return jsonify({'error': 'Clé API Groq non configurée'}), 500

        # Préparer l'historique de conversation
        messages = conversation_history + [
            {
                'role': 'user',
                'content': message
            }
        ]

        # Appeler l'API Groq via OpenAI client
        response = openai.ChatCompletion.create(
            messages=messages,
            model="llama-3.1-8b-instant",
            temperature=0.7,
            max_tokens=1024,
        )

        assistant_message = response['choices'][0]['message']['content']

        return jsonify({
            'success': True,
            'reply': assistant_message
        })

    except Exception as error:
        print(f'Erreur API Groq: {str(error)}')
        error_message = str(error)
        return jsonify({
            'error': f'Erreur lors de la communication avec Groq: {error_message}'
        }), 500

if __name__ == '__main__':
    print(f'Serveur démarré sur http://localhost:{PORT}')
    app.run(debug=False, host='0.0.0.0', port=PORT)
