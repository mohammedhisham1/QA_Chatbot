import pandas as pd
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sklearn.metrics.pairwise import cosine_similarity
import torch
import numpy as np

MODEL_PATH = "./qa_model" 
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

CSV_PATH = r"C:\Users\Mohammed Hesham\Desktop\chat bot\dataset.csv"
data = pd.read_csv(CSV_PATH)

trained_questions = data["question"].tolist() 
trained_answers = data["answer"].tolist()

def get_embeddings(text_list):

    model.eval() 
    with torch.no_grad():
        encodings = tokenizer(text_list, padding=True, truncation=True, max_length=128, return_tensors="pt")
        outputs = model(**encodings)
        embeddings = outputs.logits
    return embeddings.numpy()

def find_most_similar(input_text):

    input_embedding = get_embeddings([input_text])
    questions_embeddings = get_embeddings(trained_questions)
    similarities = cosine_similarity(input_embedding, questions_embeddings)
    most_similar_idx = np.argmax(similarities)
    return trained_answers[most_similar_idx]


most_similar_answer = find_most_similar("user_message")

print(most_similar_answer)