from flask import Flask, request, jsonify
import spacy
from unidecode import unidecode

app = Flask(__name__)
nlp = spacy.load("es_core_news_sm")

def normalize_text(text):
    return unidecode(text)

def extract_first_verb(spanish_sentence):
    doc = nlp(normalize_text(spanish_sentence))
    for token in doc:
        if token.pos_ == "VERB":
            return token.text
    return None

def translate_to_spanish(sentence):
    # Replace this with your actual translation logic
    return f"Traducción para '{sentence}' no disponible"

@app.route('/translate', methods=['POST'])
def translate_and_fill_blank():
    data = request.json
    english_sentence = data.get('sentence')
    spanish_translation = translate_to_spanish(english_sentence)
    omitted_verb = extract_first_verb(spanish_translation)

    if omitted_verb:
        blank_sentence = spanish_translation.replace(omitted_verb, "_____")
        return jsonify({
            "translated_text": blank_sentence,
            "omitted_verb": omitted_verb
        })
    return jsonify({"translated_text": spanish_translation, "omitted_verb": None})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)
