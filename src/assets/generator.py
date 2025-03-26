import os, json
from openai import OpenAI
from dotenv import load_dotenv

# Carica le variabili d'ambiente dal file .env
load_dotenv()

# Ottieni la chiave API da .env
api_key = os.getenv("OPENAI_SECRET_KEY")
if not api_key:
    raise ValueError("OPENAI_SECRET_KEY non trovata nel file .env")

os.environ["OPENAI_API_KEY"] = api_key

client = OpenAI(
    api_key=api_key
)

from openai import OpenAI
client = OpenAI()

query = """
Devi generare favole rilassanti per bambini.
La storia dovrebbe avere un tono dolce e calmante, con un tema positivo e rassicurante. 
Usa personaggi amichevoli, come animali o creature fantastiche, e ambientazioni naturali o fiabesche. 
La trama dovrebbe essere semplice, senza conflitti stressanti, e terminare con un messaggio di serenità e calma. 
Usa descrizioni dettagliate e incoraggia l'immaginazione dei bambini. Mantieni il linguaggio semplice e adatto all'età.
nei tag puoi mettere i personaggi e i valori della storia.
è importante che le storie abbiano una lunghezza di 220-300 parole (assolutamente piu di 220) e siano ben separate in paragrafi.
"""

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": query
          }
        ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "genera 3 storie, l'attributo di nome id parte da 16, l'attributo di nome date deve essere 2025-03-26, l'attributo di nome premium ha sempre valore false"
        }
      ]
    },
  ],
  response_format = {
      "type": "json_schema",
      "json_schema": {
          "name": "Favole",
          "schema": {
              "type": "object",  # Oggetto principale che contiene un array
              "properties": {
                  "stories": {  # La chiave che conterrà l'array di storie
                      "type": "array",
                      "items": {
                          "type": "object",
                          "properties": {
                              "id": {"type": "string"},
                              "title": {"type": "string"},
                              "content": {"type": "string"},
                              "date": {"type": "string"},
                              "premium": {"type": "boolean"},
                              "tags": {"type": "array", "items": {"type": "string"}}
                          },
                          "required": ["id", "title", "content", "date", "premium", "tags"]
                      }
                  }
              },
              "required": ["stories"]  # La chiave principale sarà "stories"
          }
      }
  },
  temperature=1,
  max_completion_tokens=2048,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)
# Supponiamo che la tua risposta sia una variabile 'response'
response_data = response.choices[0].message.content  # Se la risposta è già un oggetto JSON

response_json = json.loads(response_data)

# Ora scriviamo la risposta formattata in un file
with open("C:/Users/vigan/Desktop/storie-notte/src/assets/output.json", "w", encoding="utf-8") as file:
  json.dump(response_json, file, ensure_ascii=False, indent=4)